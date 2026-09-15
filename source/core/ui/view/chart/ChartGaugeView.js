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

/**
 * Chart.js gauge view. Renders a half-doughnut where the filled arc represents
 * the current value. The arc color changes based on configurable threshold zones.
 * Uses chartjs-plugin-annotation for the value/label text display.
 *
 * @extends View
 * @example
 *
 * const view = new ChartGaugeView({
 *     container: 'gauge-div',
 *     label: 'Station Pressure',
 *     unit: 'mb',
 *     min: 950,
 *     max: 1050,
 *     zones: [
 *         { min: 950, max: 980, color: '#FF6384' },
 *         { min: 980, max: 1020, color: '#4BC0C0' },
 *         { min: 1020, max: 1050, color: '#FFCE56' },
 *     ],
 *     layers: [gaugeLayer],
 * });
 */
class ChartGaugeView extends View {

    /**
     * Create a ChartGaugeView.
     * @param {Object} properties
     * @param {string} properties.container - DOM element id (required)
     * @param {string} [properties.label=''] - Display name shown below the value
     * @param {string} [properties.unit=''] - Unit label shown after the value (e.g., 'mb', '%', '°C')
     * @param {number} [properties.min=0] - Minimum gauge value
     * @param {number} [properties.max=100] - Maximum gauge value
     * @param {Object[]} [properties.zones=[]] - Color zones: [{ min, max, color }]. The arc color changes based on which zone the current value falls in.
     * @param {string} [properties.emptyColor='rgb(234, 234, 234)'] - Color of the unfilled portion of the arc
     * @param {string} [properties.defaultColor='rgb(140, 214, 16)'] - Arc color when no zones are defined or value is below all zones
     * @param {number} [properties.valuePrecision=1] - Decimal places for the displayed value
     * @param {number} [properties.valueFontSize=50] - Font size for the value text
     * @param {number} [properties.labelFontSize=20] - Font size for the label text
     * @param {string} [properties.labelColor='grey'] - Color of the label text
     * @param {Object} [properties.options={}] - Chart.js options to merge with defaults
     */
    constructor(properties) {
        super({
            supportedLayers: ['chartGauge'],
            ...properties,
        });

        Chart.register(...registerables);

        // Gauge config
        this.min            = isDefined(properties.min) ? properties.min : 0;
        this.max            = isDefined(properties.max) ? properties.max : 100;
        this.label          = properties.label || '';
        this.unit           = properties.unit || '';
        this.zones          = properties.zones || [];
        this.emptyColor     = properties.emptyColor || 'rgb(234, 234, 234)';
        this.defaultColor   = properties.defaultColor || 'rgb(140, 214, 16)';
        this.valuePrecision = isDefined(properties.valuePrecision) ? properties.valuePrecision : 1;
        this.valueFontSize  = isDefined(properties.valueFontSize) ? properties.valueFontSize : 50;
        this.labelFontSize  = isDefined(properties.labelFontSize) ? properties.labelFontSize : 20;
        this.labelColor     = properties.labelColor || 'grey';

        // Sort zones by min for threshold lookup
        this.sortedZones = [...this.zones].sort((a, b) => a.min - b.min);

        // Internal state
        this.currentValue = this.min;
        this.resetting = false;
        this.chart = null;
        this.annotationLoaded = false;

        this.chartReady = this.initChart(properties);
    }

    /**
     * Determine the arc color based on the current value and zone thresholds.
     */
    getColorForValue(value) {
        for (let i = this.sortedZones.length - 1; i >= 0; i--) {
            if (value >= this.sortedZones[i].min) {
                return this.sortedZones[i].color;
            }
        }
        return this.defaultColor;
    }

    async initChart(properties) {
        // Try to load annotation plugin
        await this.loadAnnotationPlugin();

        const self = this;
        const range = this.max - this.min;
        const initialFill = 0;

        // Chart.js options
        this.chartOptions = {
            aspectRatio: 2,
            responsive: true,
            rotation: -90,
            circumference: 180,
            cutout: '75%',
            animation: false,
            plugins: {
                tooltip: {enabled: false},
                legend: {display: false},
            },
        };

        // Add annotation config if plugin loaded
        if (this.annotationLoaded) {
            this.chartOptions.plugins.annotation = {
                annotations: {
                    gaugeLabel: {
                        type: 'doughnutLabel',
                        content: function({chart}) {
                            const val = chart.data.datasets[0].data[0] + self.min;
                            const lines = [val.toFixed(self.valuePrecision) + (self.unit ? ' ' + self.unit : '')];
                            if (self.label) lines.push(self.label);
                            return lines;
                        },
                        drawTime: 'beforeDraw',
                        font: function() {
                            const fonts = [{size: self.valueFontSize, weight: 'bold'}];
                            if (self.label) fonts.push({size: self.labelFontSize});
                            return fonts;
                        },
                        color: function({chart}) {
                            const val = chart.data.datasets[0].data[0] + self.min;
                            const colors = [self.getColorForValue(val)];
                            if (self.label) colors.push(self.labelColor);
                            return colors;
                        },
                    },
                },
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

        // Build inline plugins array for fallback text (when annotation not available)
        const plugins = [];
        if (!this.annotationLoaded) {
            plugins.push(this.buildFallbackTextPlugin());
        }

        this.chart = new Chart(this.canvas, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [initialFill, range - initialFill],
                    backgroundColor: function(ctx) {
                        if (ctx.type !== 'data') return;
                        if (ctx.index === 1) return self.emptyColor;
                        const val = ctx.chart.data.datasets[0].data[0] + self.min;
                        return self.getColorForValue(val);
                    },
                    borderWidth: 0,
                }],
            },
            options: this.chartOptions,
            plugins: plugins,
        });
    }

    async loadAnnotationPlugin() {
        try {
            const annotationModule = await import('chartjs-plugin-annotation');
            const annotationPlugin = annotationModule.default || annotationModule;
            Chart.register(annotationPlugin);
            this.annotationLoaded = true;
        } catch (e) {
            console.warn(
                '[OSH-JS: ChartGaugeView] "chartjs-plugin-annotation" could not be loaded. ' +
                'Falling back to basic text rendering. Install it for better visuals: npm install chartjs-plugin-annotation'
            );
            this.annotationLoaded = false;
        }
    }

    /**
     * Fallback text plugin when chartjs-plugin-annotation is not available.
     */
    buildFallbackTextPlugin() {
        const self = this;
        return {
            id: 'gaugeFallbackText',
            afterDraw(chart) {
                const {ctx, chartArea} = chart;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = chartArea.bottom;

                const val = chart.data.datasets[0].data[0] + self.min;
                const valueText = val.toFixed(self.valuePrecision) + (self.unit ? ' ' + self.unit : '');

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                // Value
                ctx.font = 'bold ' + self.valueFontSize + 'px sans-serif';
                ctx.fillStyle = self.getColorForValue(val);
                ctx.fillText(valueText, centerX, centerY - (self.label ? 10 : 0));

                // Label
                if (self.label) {
                    ctx.font = self.labelFontSize + 'px sans-serif';
                    ctx.fillStyle = self.labelColor;
                    ctx.fillText(self.label, centerX, centerY + self.labelFontSize);
                }

                ctx.restore();
            },
        };
    }

    async setData(dataSourceId, data) {
        await this.chartReady;
        if (data.type !== 'chartGauge' || this.resetting) return;

        const values = data.values;
        if (!values || values.length === 0) return;

        // Use the last value received
        const item = values[values.length - 1];
        this.currentValue = item.value;

        // Clamp to min/max range
        const clamped = Math.max(this.min, Math.min(this.max, this.currentValue));
        const range = this.max - this.min;
        const fill = clamped - this.min;

        // Update doughnut segments: [filled portion, empty portion]
        this.chart.data.datasets[0].data = [fill, range - fill];
        this.chart.update('none');
    }

    reset() {
        this.resetting = true;
        super.reset();
        this.currentValue = this.min;
        if (this.chart) {
            const range = this.max - this.min;
            this.chart.data.datasets[0].data = [0, range];
            this.chart.update('none');
        }
        this.resetting = false;
    }
}

export default ChartGaugeView;
