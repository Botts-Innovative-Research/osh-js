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
 * Chart.js gauge view. Renders a half-doughnut with colored zones and a needle
 * indicator that points to the current value. Displays the numeric value and
 * unit label in the center.
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
     * @param {string} [properties.unit=''] - Unit label shown after the value
     * @param {number} [properties.min=0] - Minimum gauge value
     * @param {number} [properties.max=100] - Maximum gauge value
     * @param {Object[]} [properties.zones=[]] - Color zones: [{ min, max, color }]
     * @param {string} [properties.needleColor='#444444'] - Needle color
     * @param {number} [properties.needleWidth=3] - Needle width in pixels
     * @param {string} [properties.valueColor='#333333'] - Value text color
     * @param {string} [properties.labelColor='#666666'] - Label text color
     * @param {Object} [properties.options={}] - Chart.js options to merge with defaults
     */
    constructor(properties) {
        super({
            supportedLayers: ['chartGauge'],
            ...properties,
        });

        Chart.register(...registerables);

        // Gauge config
        this.min          = isDefined(properties.min) ? properties.min : 0;
        this.max          = isDefined(properties.max) ? properties.max : 100;
        this.label        = properties.label || '';
        this.unit         = properties.unit || '';
        this.zones        = properties.zones || [];
        this.needleColor  = properties.needleColor || '#444444';
        this.needleWidth  = isDefined(properties.needleWidth) ? properties.needleWidth : 3;
        this.valueColor   = properties.valueColor || '#333333';
        this.labelColor   = properties.labelColor || '#666666';

        // Internal state
        this.currentValue = this.min;
        this.resetting = false;
        this.chart = null;

        this.chartReady = this.initChart(properties);
    }

    async initChart(properties) {
        // Build zone data for the doughnut segments
        const {data, colors} = this.buildZoneData();

        // Create needle plugin
        const self = this;
        this.needlePlugin = {
            id: 'gaugeNeedle',
            afterDatasetDraw(chart) {
                const {ctx, chartArea} = chart;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = chartArea.bottom;
                const radius = (chartArea.right - chartArea.left) / 2;

                // Calculate needle angle from value
                const range = self.max - self.min;
                const ratio = range > 0 ? (self.currentValue - self.min) / range : 0;
                const clampedRatio = Math.max(0, Math.min(1, ratio));
                const angle = Math.PI + (clampedRatio * Math.PI); // PI (left) to 2PI (right)

                const needleLen = radius * 0.85;
                const needleX = centerX + needleLen * Math.cos(angle);
                const needleY = centerY + needleLen * Math.sin(angle);

                // Draw needle line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(needleX, needleY);
                ctx.strokeStyle = self.needleColor;
                ctx.lineWidth = self.needleWidth;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw center dot
                ctx.beginPath();
                ctx.arc(centerX, centerY, self.needleWidth + 2, 0, Math.PI * 2);
                ctx.fillStyle = self.needleColor;
                ctx.fill();
                ctx.restore();
            },
        };

        // Create value/label text plugin
        this.textPlugin = {
            id: 'gaugeText',
            afterDraw(chart) {
                const {ctx, chartArea} = chart;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = chartArea.bottom;

                // Draw value
                const valueText = self.currentValue.toFixed(1) + (self.unit ? ' ' + self.unit : '');
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.font = 'bold 20px sans-serif';
                ctx.fillStyle = self.valueColor;
                ctx.fillText(valueText, centerX, centerY - 15);

                // Draw label
                if (self.label) {
                    ctx.font = '14px sans-serif';
                    ctx.fillStyle = self.labelColor;
                    ctx.fillText(self.label, centerX, centerY - 0);
                }

                // Draw min/max labels
                ctx.font = '11px sans-serif';
                ctx.fillStyle = self.labelColor;
                ctx.textAlign = 'left';
                ctx.fillText(String(self.min), chartArea.left + 5, centerY + 15);
                ctx.textAlign = 'right';
                ctx.fillText(String(self.max), chartArea.right - 5, centerY + 15);

                ctx.restore();
            },
        };

        // Chart.js options
        this.chartOptions = {
            maintainAspectRatio: false,
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
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                }],
            },
            options: this.chartOptions,
            plugins: [this.needlePlugin, this.textPlugin],
        });
    }

    /**
     * Build the doughnut segment data from zone definitions.
     */
    buildZoneData() {
        if (this.zones.length === 0) {
            // No zones defined — single gray arc
            return {
                data: [this.max - this.min],
                colors: ['#E0E0E0'],
            };
        }

        const data = [];
        const colors = [];

        // Sort zones by min value
        const sorted = [...this.zones].sort((a, b) => a.min - b.min);

        for (const zone of sorted) {
            data.push(zone.max - zone.min);
            colors.push(zone.color);
        }

        return {data, colors};
    }

    async setData(dataSourceId, data) {
        await this.chartReady;
        if (data.type !== 'chartGauge' || this.resetting) return;

        const values = data.values;
        if (!values || values.length === 0) return;

        // Use the last value received
        const item = values[values.length - 1];
        this.currentValue = item.value;

        // Trigger chart redraw (needle + text plugins read currentValue)
        this.chart.update('none');
    }

    reset() {
        this.resetting = true;
        super.reset();
        this.currentValue = this.min;
        if (this.chart) {
            this.chart.update('none');
        }
        this.resetting = false;
    }
}

export default ChartGaugeView;
