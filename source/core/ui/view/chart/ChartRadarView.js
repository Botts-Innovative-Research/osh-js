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
 * Chart.js view for radar charts. Renders overlapping polygons on a radial grid.
 * Supports multiple datasets (series) for comparison.
 *
 * @extends View
 * @example
 *
 * const view = new ChartRadarView({
 *     container: 'radar-div',
 *     chartTitle: 'Player Stats',
 *     layers: [radarLayer],
 * });
 */
class ChartRadarView extends View {

    /**
     * Create a ChartRadarView.
     * @param {Object} properties
     * @param {string} properties.container - DOM element id (required)
     * @param {string} [properties.chartTitle=''] - Chart title text
     * @param {boolean} [properties.isZoomable=false] - Enable zoom (requires chartjs-plugin-zoom on client)
     * @param {boolean} [properties.isPanable=false] - Enable pan (requires chartjs-plugin-zoom on client)
     * @param {Object} [properties.zoomOptions={}] - chartjs-plugin-zoom options override
     * @param {Object} [properties.options={}] - Chart.js options to merge with defaults
     * @param {Object} [properties.datasetOptions={}] - Chart.js dataset property overrides
     */
    constructor(properties) {
        super({
            supportedLayers: ['chartRadar'],
            ...properties,
        });

        Chart.register(...registerables);

        this.datasetOptions = properties.datasetOptions || {};

        // Internal state
        this.datasets = {};
        this.resetting = false;
        this.chart = null;

        this.chartReady = this.initChart(properties);
    }

    async initChart(properties) {
        const chartTitle = properties.chartTitle || '';

        this.chartOptions = {
            maintainAspectRatio: false,
            animation: false,
            scales: {
                r: {
                    type: 'radialLinear',
                },
            },
            plugins: {
                legend: {
                    display: true,
                },
                annotation: false,
            },
        };

        if (chartTitle) {
            this.chartOptions.plugins.title = {
                display: true,
                text: chartTitle,
            };
        }

        // Merge user overrides
        if (isDefined(properties) && properties.hasOwnProperty('options')) {
            merge(this.chartOptions, properties.options);
        }

        // Create canvas
        const domNode = document.getElementById(this.divId);
        this.canvasId = randomUUID();
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', this.canvasId);
        domNode.appendChild(this.canvas);

        this.chart = new Chart(this.canvas, {
            type: 'radar',
            data: {labels: [], datasets: []},
            options: this.chartOptions,
        });

        // Conditionally load zoom plugin
        if (properties.isZoomable || properties.isPanable) {
            await this.loadZoomPlugin(properties);
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
                '[OSH-JS: ChartRadarView] isZoomable/isPanable is true but "chartjs-plugin-zoom" could not be loaded. ' +
                'Install it with: npm install chartjs-plugin-zoom'
            );
        }
    }

    async setData(dataSourceId, data) {
        await this.chartReady;
        if (data.type !== 'chartRadar' || this.resetting) return;

        const values = data.values;
        if (!values || values.length === 0) return;

        for (const item of values) {
            const seriesId = item.seriesId;
            const labels = item.labels || [];
            const dataValues = item.dataValues || [];

            // Update shared labels (axes)
            if (labels.length > 0) {
                this.chart.data.labels = labels;
            }

            let dataset = this.datasets[seriesId];
            if (!dataset) {
                dataset = {
                    label: item.name || item.seriesId,
                    data: dataValues,
                    borderColor: this.resolveColor(item.lineColor),
                    backgroundColor: this.resolveColor(item.backgroundColor),
                    borderWidth: item.borderWidth || 2,
                    fill: isDefined(item.fill) ? item.fill : true,
                    ...this.datasetOptions,
                };
                this.datasets[seriesId] = dataset;
                this.chart.data.datasets.push(dataset);
            } else {
                dataset.data = dataValues;
                dataset.borderColor = this.resolveColor(item.lineColor);
                dataset.backgroundColor = this.resolveColor(item.backgroundColor);
            }
        }

        this.chart.update('none');
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
        if (this.chart) {
            this.chart.data.labels = [];
            this.chart.data.datasets = [];
            this.chart.update('none');
        }
        this.resetting = false;
    }
}

export default ChartRadarView;
