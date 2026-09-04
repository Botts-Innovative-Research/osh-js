/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import View from "../View.js";
import {hex2rgb, hex2rgba, isDefined, merge, randomUUID} from "../../../utils/Utils.js";
import {Chart, registerables} from 'chart.js';

/**
 * Unified Chart.js line view that handles both snapshot (spectrum-style) and
 * accumulation (time-series) modes. Pairs with {@link LineLayer}.
 *
 * @extends View
 * @example
 *
 * // Snapshot mode (spectrum)
 * const view = new ChartJsLineView({
 *     container: 'chart-div',
 *     chartType: 'linear',
 *     xAxisLabel: 'Frequency (MHz)',
 *     yAxisLabel: 'dBFS',
 *     seriesQty: 1,
 *     isZoomable: true,
 *     isPanable: true,
 *     layers: [myLineLayer],
 * });
 *
 * // Accumulation mode (time-series)
 * const view = new ChartJsLineView({
 *     container: 'chart-div',
 *     chartType: 'time',
 *     yAxisLabel: 'Temperature (C)',
 *     seriesQty: 2,
 *     maxValues: 200,
 *     refreshRate: 500,
 *     layers: [myLineLayer],
 * });
 */
class ChartJsLineView extends View {

    /**
     * Create a ChartJsLineView.
     * @param {Object} properties
     * @param {string} properties.container - DOM element id (required)
     * @param {string} [properties.chartType='linear'] - X-axis scale: 'linear' | 'time' | 'category'
     * @param {string} [properties.xAxisLabel=''] - X-axis title text
     * @param {string} [properties.yAxisLabel=''] - Y-axis title text
     * @param {string} [properties.chartTitle=''] - Chart title text
     * @param {boolean} [properties.isZoomable=false] - Enable wheel/pinch zoom (requires chartjs-plugin-zoom on client)
     * @param {boolean} [properties.isPanable=false] - Enable pan (requires chartjs-plugin-zoom on client)
     * @param {Object} [properties.zoomOptions={}] - chartjs-plugin-zoom options override
     * @param {number} [properties.seriesQty=1] - 1 = snapshot (replace each frame), >1 = accumulate in buffer
     * @param {number} [properties.maxValues] - Buffer cap for accumulation mode
     * @param {number} [properties.refreshRate=1000] - Throttle ms for accumulation mode
     * @param {Object} [properties.options={}] - Chart.js options to merge with defaults
     * @param {Object} [properties.datasetOptions={}] - Chart.js dataset property overrides
     */
    constructor(properties) {
        super({
            supportedLayers: ['line'],
            ...properties,
        });

        Chart.register(...registerables);

        // Store config
        this.chartType      = properties.chartType || 'linear';
        this.seriesQty      = isDefined(properties.seriesQty) ? properties.seriesQty : 1;
        this.maxValues      = properties.maxValues;
        this.refreshRate    = isDefined(properties.refreshRate) ? properties.refreshRate : 1000;
        this.datasetOptions = properties.datasetOptions || {};

        // Internal state
        this.datasets = {};
        this.buffer = {};
        this.lastTimestamp = -1;
        this.resetting = false;
        this.chart = null;

        // Chart creation must wait for async dependencies (time adapter, zoom plugin)
        this.chartReady = this.initChart(properties);
    }

    async initChart(properties) {
        // Load time adapter BEFORE creating the chart (Chart.js needs it at init)
        if (this.chartType === 'time') {
            await this.loadTimeAdapter();
        }

        // Build default Chart.js options
        this.chartOptions = this.buildDefaultOptions(properties);

        // Merge user overrides
        if (isDefined(properties) && properties.hasOwnProperty('options')) {
            merge(this.chartOptions, properties.options);
        }

        // Create canvas and Chart instance
        const domNode = document.getElementById(this.divId);
        this.canvasId = randomUUID();
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', this.canvasId);
        domNode.appendChild(this.canvas);

        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {datasets: []},
            options: this.chartOptions,
        });

        // Conditionally load zoom plugin (can happen after chart creation)
        if (properties.isZoomable || properties.isPanable) {
            await this.loadZoomPlugin(properties);
        }
    }

    buildDefaultOptions(properties) {
        const xAxisLabel = properties.xAxisLabel || '';
        const yAxisLabel = properties.yAxisLabel || '';
        const chartTitle = properties.chartTitle || '';

        const xScale = this.buildXScale(xAxisLabel);

        const opts = {
            maintainAspectRatio: false,
            animation: this.seriesQty === 1 ? false : undefined,
            normalized: true,
            spanGaps: true,
            scales: {
                x: xScale,
                y: {
                    type: 'linear',
                    title: {
                        display: !!yAxisLabel,
                        text: yAxisLabel,
                    },
                },
            },
            plugins: {
                legend: {
                    display: this.seriesQty > 1,
                },
            },
            datasets: {},
            interaction: {},
            layout: {},
            elements: {},
        };

        if (chartTitle) {
            opts.plugins.title = {
                display: true,
                text: chartTitle,
            };
        }

        return opts;
    }

    buildXScale(label) {
        switch (this.chartType) {
            case 'time':
                return {
                    type: 'time',
                    time: {unit: 'second'},
                    title: {display: !!label, text: label},
                };
            case 'category':
                return {
                    type: 'category',
                    title: {display: !!label, text: label},
                };
            case 'linear':
            default:
                return {
                    type: 'linear',
                    title: {display: !!label, text: label},
                };
        }
    }

    async loadTimeAdapter() {
        try {
            await import('chartjs-adapter-moment');
        } catch (e) {
            console.error(
                '[OSH-JS: ChartJsLineView] chartType is "time" but "chartjs-adapter-moment" could not be loaded. ' +
                'Install it with: npm install chartjs-adapter-moment moment'
            );
        }
    }

    async loadZoomPlugin(properties) {
        try {
            const zoomModule = await import('chartjs-plugin-zoom');
            const zoomPlugin = zoomModule.default || zoomModule;
            Chart.register(zoomPlugin);

            const defaultZoomOptions = {
                zoom: {
                    wheel: {enabled: !!properties.isZoomable},
                    pinch: {enabled: !!properties.isZoomable},
                    mode: 'xy',
                },
                pan: {
                    enabled: !!properties.isPanable,
                    mode: 'xy',
                },
            };

            if (isDefined(properties) && properties.hasOwnProperty('zoomOptions')) {
                merge(defaultZoomOptions, properties.zoomOptions);
            }

            this.chart.options.plugins.zoom = defaultZoomOptions;
            this.chart.update('none');
        } catch (e) {
            console.error(
                '[OSH-JS: ChartJsLineView] isZoomable/isPanable is true but "chartjs-plugin-zoom" could not be loaded. ' +
                'Install it with: npm install chartjs-plugin-zoom'
            );
        }
    }

    async setData(dataSourceId, data) {
        await this.chartReady;
        if (data.type !== 'line' || this.resetting) return;

        const values = data.values;
        if (!values || values.length === 0) return;

        if (this.seriesQty === 1) {
            this.updateSnapshot(values);
        } else {
            this.updateAccumulate(values);
        }
    }

    /**
     * Snapshot mode: replace entire dataset each frame.
     */
    updateSnapshot(values) {
        for (const item of values) {
            const seriesId = item.seriesId;
            const xArr = item.xAxisValues || [];
            const yArr = item.yAxisValues || [];
            const len = Math.min(xArr.length, yArr.length);

            const points = new Array(len);
            for (let i = 0; i < len; i++) {
                points[i] = {x: xArr[i], y: yArr[i]};
            }

            let dataset = this.datasets[seriesId];
            if (!dataset) {
                dataset = this.createDataset(item);
                this.datasets[seriesId] = dataset;
                this.chart.data.datasets.push(dataset);
            } else {
                dataset.borderColor = this.resolveColor(item.lineColor);
                dataset.backgroundColor = this.resolveColor(item.backgroundColor);
                dataset.borderWidth = item.stroke;
            }
            dataset.data = points;
        }
        this.chart.update('none');
    }

    /**
     * Accumulation mode: append to buffer per seriesId, throttle rendering.
     */
    updateAccumulate(values) {
        for (const item of values) {
            const seriesId = item.seriesId;
            const xArr = item.xAxisValues || [];
            const yArr = item.yAxisValues || [];
            const len = Math.min(xArr.length, yArr.length);

            const points = [];
            for (let i = 0; i < len; i++) {
                points.push({x: xArr[i], y: yArr[i]});
            }

            if (!this.datasets[seriesId]) {
                const dataset = this.createDataset(item);
                this.datasets[seriesId] = dataset;
                this.chart.data.datasets.push(dataset);
                this.buffer[seriesId] = [];
            } else {
                this.datasets[seriesId].borderColor = this.resolveColor(item.lineColor);
                this.datasets[seriesId].backgroundColor = this.resolveColor(item.backgroundColor);
            }

            this.buffer[seriesId] = this.buffer[seriesId].concat(points);
        }

        // Throttle updates via refreshRate
        if (this.lastTimestamp === -1 || Date.now() - this.lastTimestamp >= this.refreshRate) {
            for (const bufferKey in this.buffer) {
                const currentBuffer = this.buffer[bufferKey];
                if (this.maxValues && currentBuffer.length > this.maxValues) {
                    this.buffer[bufferKey] = currentBuffer.slice(currentBuffer.length - this.maxValues);
                }
                this.datasets[bufferKey].data = this.buffer[bufferKey];
            }
            this.lastTimestamp = Date.now();
            this.chart.update('none');
        }
    }

    createDataset(item) {
        return {
            label: item.name || item.seriesId,
            borderColor: this.resolveColor(item.lineColor),
            backgroundColor: this.resolveColor(item.backgroundColor),
            borderWidth: item.stroke || 1,
            pointRadius: 0,
            fill: item.fill || false,
            data: [],
            ...this.datasetOptions,
        };
    }

    resolveColor(value) {
        if (!value || typeof value !== 'string') return value;
        if (value.charAt(0) !== '#') return value;
        if (value.length === 9) {
            const rgba = hex2rgba(value);
            return 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
        }
        const rgb = hex2rgb(value);
        return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',1.0)';
    }

    reset() {
        this.resetting = true;
        super.reset();
        this.datasets = {};
        this.buffer = {};
        if (this.chart) {
            this.chart.data.datasets = [];
            this.chart.update('none');
        }
        this.lastTimestamp = -1;
        this.resetting = false;
    }
}

export default ChartJsLineView;
