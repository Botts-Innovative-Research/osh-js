/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 ******************************* END LICENSE BLOCK ***************************/

import View from "../View.js";
import {hex2rgb, hex2rgba, isDefined, merge, randomUUID} from "../../../utils/Utils.js";
import { Chart, registerables } from 'chart.js';

/**
 * Chart.js view for displaying RF/signal spectrum data.
 * Pairs with {@link SpectrumLayer} to render frequency (x-axis) vs amplitude (y-axis).
 * Each incoming observation *replaces* the previous dataset rather than accumulating
 * points over time.
 *
 * @extends View
 */
class SpectrumChartJsView extends View {
    /**
     * Create a SpectrumChartJsView.
     * @param {Object} [properties={}]
     * @param {string} properties.container - The div element id to attach to
     * @param {Object[]} [properties.layers=[]] - SpectrumLayer instances to add
     * @param {string} [properties.type='line'] - Chart.js chart type ('line' or 'bar')
     * @param {Object} [properties.options={}] - Chart.js options to merge with defaults
     * @param {Object} [properties.datasetOptions={}] - Chart.js dataset property overrides
     * @param {number} [properties.refreshRate=1000] - Minimum ms between chart redraws
     */
    constructor(properties) {
        super({
            supportedLayers: ['spectrum'],
            ...properties
        });
        Chart.register(...registerables);

        this.datasetOptions = {};
        let type = 'line';

        this.options = {
            maintainAspectRatio: false,
            normalized: true,
            animation: false,
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
                    }
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Amplitude (dBFS)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            },
            datasets: {},
            interaction: {},
            layout: {},
            elements: {}
        };

        this.refreshRate = 1000;

        if (isDefined(properties)) {
            if (properties.hasOwnProperty('options')) {
                merge(properties.options, this.options);
            }
            if (properties.hasOwnProperty('type')) {
                type = properties.type;
            }
            if (properties.hasOwnProperty('datasetOptions')) {
                this.datasetOptions = properties.datasetOptions;
            }
            if (properties.hasOwnProperty('refreshRate')) {
                this.refreshRate = properties.refreshRate;
            }
        }

        this.type = type;
        let domNode = document.getElementById(this.divId);

        this.id = randomUUID();
        let ctx = document.createElement('canvas');
        ctx.setAttribute('id', this.id);
        domNode.appendChild(ctx);

        this.ctx = ctx;
        this.resetting = false;

        this.chart = new Chart(this.ctx, {
            type: type,
            data: { datasets: [] },
            options: this.options
        });

        this.datasets = {};
        this.lastTimestamp = -1;
    }

    async setData(dataSourceId, data) {
        if (data.type === 'spectrum') {
            this.updateSpectrum(data.values);
        }
    }

    /**
     * Updates (replaces) the spectrum dataset for the given series.
     * @param {Object[]} props - Array of layer prop objects from SpectrumLayer.getProps().values
     */
    updateSpectrum(props) {
        if (this.resetting || !props || props.length === 0) {
            return;
        }

        const p = props[0];
        const spectrumId = p.spectrumId;
        const frequencies = p.frequencies || [];
        const amplitudes = p.amplitudes || [];

        // Build {x, y} pairs from the parallel arrays
        const values = [];
        const len = Math.min(frequencies.length, amplitudes.length);
        for (let i = 0; i < len; i++) {
            values.push({ x: frequencies[i], y: amplitudes[i] });
        }

        let lineColor = this.getColor(p.lineColor);
        let bgColor = this.getColor(p.backgroundColor);

        if (!isDefined(this.datasets[spectrumId])) {
            const dataset = {
                ...this.datasetOptions,
                label: p.name,
                fill: p.fill,
                backgroundColor: bgColor,
                borderColor: lineColor,
                borderWidth: p.stroke,
                pointRadius: 0,
                data: values
            };
            this.datasets[spectrumId] = dataset;
            this.chart.data.datasets.push(dataset);
        } else {
            // Replace dataset in place — spectrum is a snapshot, not a time series
            this.datasets[spectrumId].data = values;
            this.datasets[spectrumId].backgroundColor = bgColor;
            this.datasets[spectrumId].borderColor = lineColor;
        }

        // Update axis labels from layer props
        this.chart.options.scales.x.title.text = p.xLabel;
        this.chart.options.scales.y.title.text = p.yLabel;

        // Rate-limit redraws
        if (this.lastTimestamp === -1 || Date.now() - this.lastTimestamp >= this.refreshRate) {
            this.lastTimestamp = Date.now();
            this.chart.update('none');
        }
    }

    getColor(value) {
        let v = value;
        if (v && v.length > 0 && v.charAt(0) === '#') {
            if (value.length === 9) {
                const rgba = hex2rgba(value);
                v = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
            } else {
                const rgb = hex2rgb(value);
                v = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1.0)';
            }
        }
        return v;
    }

    reset() {
        this.resetting = true;
        super.reset();
        this.datasets = {};
        this.chart.data.datasets = [];
        this.lastTimestamp = -1;
        this.chart.update('none');
        this.resetting = false;
    }
}

export default SpectrumChartJsView;
