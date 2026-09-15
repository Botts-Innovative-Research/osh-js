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
import {isDefined, merge, randomUUID} from "../../../utils/Utils.js";
import {Chart, registerables} from 'chart.js';

const LAYER_TO_CHARTJS_TYPE = {
    'chartPie':       'pie',
    'chartPolarArea': 'polarArea',
};

/**
 * Chart.js view for radial charts (pie, doughnut, polar area).
 * Uses labels[] + data[] instead of x/y axes.
 *
 * @extends View
 * @example
 *
 * const view = new ChartRadialView({
 *     container: 'pie-div',
 *     chartTitle: 'Distribution',
 *     layers: [myPieLayer],
 * });
 */
class ChartRadialView extends View {

    /**
     * Create a ChartRadialView.
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
            supportedLayers: ['chartPie', 'chartPolarArea'],
            ...properties,
        });

        Chart.register(...registerables);

        this.datasetOptions = properties.datasetOptions || {};

        // Internal state
        this.datasets = {};
        this.resetting = false;
        this.chart = null;
        this.resolvedChartType = null;

        this.chartReady = this.initChart(properties);
    }

    async initChart(properties) {
        const chartTitle = properties.chartTitle || '';

        this.chartOptions = {
            maintainAspectRatio: false,
            animation: false,
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

        // Determine chart type from first layer (resolved on first setData call)
        // Default to 'pie', will be updated when first data arrives
        this.chart = new Chart(this.canvas, {
            type: 'pie',
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
                '[OSH-JS: ChartRadialView] isZoomable/isPanable is true but "chartjs-plugin-zoom" could not be loaded. ' +
                'Install it with: npm install chartjs-plugin-zoom'
            );
        }
    }

    async setData(dataSourceId, data) {
        await this.chartReady;
        const chartJsType = LAYER_TO_CHARTJS_TYPE[data.type];
        if (!chartJsType || this.resetting) return;

        // Update chart type if this is the first data or type changed
        if (!this.resolvedChartType) {
            this.resolvedChartType = chartJsType;
            this.chart.config.type = chartJsType;
        }

        const values = data.values;
        if (!values || values.length === 0) return;

        for (const item of values) {
            const seriesId = item.seriesId;
            const labels = item.labels || [];
            const dataValues = item.dataValues || [];
            const bgColors = item.backgroundColors || [];
            const borderColors = item.borderColors || [];

            // Update shared labels
            if (labels.length > 0) {
                this.chart.data.labels = labels;
            }

            let dataset = this.datasets[seriesId];
            if (!dataset) {
                dataset = {
                    label: item.name || item.seriesId,
                    data: dataValues,
                    backgroundColor: bgColors.length > 0 ? bgColors : undefined,
                    borderColor: borderColors.length > 0 ? borderColors : undefined,
                    borderWidth: item.borderWidth || 1,
                    ...this.datasetOptions,
                };

                // Apply cutout for doughnut
                if (item.cutout && item.cutout !== '0%') {
                    this.chart.options.cutout = item.cutout;
                }

                this.datasets[seriesId] = dataset;
                this.chart.data.datasets.push(dataset);
            } else {
                dataset.data = dataValues;
                if (bgColors.length > 0) dataset.backgroundColor = bgColors;
                if (borderColors.length > 0) dataset.borderColor = borderColors;
            }
        }

        this.chart.update('none');
    }

    reset() {
        this.resetting = true;
        super.reset();
        this.datasets = {};
        this.resolvedChartType = null;
        if (this.chart) {
            this.chart.data.labels = [];
            this.chart.data.datasets = [];
            this.chart.update('none');
        }
        this.resetting = false;
    }
}

export default ChartRadialView;
