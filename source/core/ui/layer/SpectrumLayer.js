/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 ******************************* END LICENSE BLOCK ***************************/

import Layer from "./Layer.js";
import {isDefined, randomUUID} from "../../utils/Utils.js";

/**
 * Layer for displaying RF/signal spectrum data as a frequency-vs-amplitude chart.
 * Each observation provides parallel frequency[] and amplitude[] arrays that
 * replace the previous frame entirely (not accumulated over time).
 *
 * @extends Layer
 */
class SpectrumLayer extends Layer {
    /**
     * Create a SpectrumLayer.
     * @param {Object} properties
     * @param {string} properties.dataSourceId - The datasource id
     * @param {Function} properties.getFrequencies - (rec, timestamp, options) => number[] — frequency values in Hz
     * @param {Function} properties.getAmplitudes - (rec, timestamp, options) => number[] — amplitude values in dBFS
     * @param {string} [properties.xLabel="Frequency (Hz)"] - x-axis label
     * @param {string} [properties.yLabel="Amplitude (dBFS)"] - y-axis label
     * @param {string} [properties.name=""] - dataset label shown in chart legend
     * @param {string} [properties.lineColor="#399ca5"] - stroke color (hex or rgba)
     * @param {string} [properties.backgroundColor="#399ca5"] - fill color (hex or rgba)
     * @param {boolean} [properties.fill=false] - fill area under the curve
     * @param {number} [properties.stroke=1] - line stroke width
     * @param {Function} [properties.getSpectrumId] - (rec, timestamp, options) => string — optional per-channel id for multi-channel support
     */
    constructor(properties) {
        super(properties);
        this.type = 'spectrum';
    }

    // called by super class constructor
    init(properties = this.properties) {
        super.init(properties);

        const props = {
            xLabel: 'Frequency (Hz)',
            yLabel: 'Amplitude (dBFS)',
            name: '',
            lineColor: '#399ca5',
            backgroundColor: '#399ca5',
            fill: false,
            stroke: 1,
            spectrumId: randomUUID(),
            frequencies: [],
            amplitudes: []
        };

        if (isDefined(properties.xLabel)) {
            props.xLabel = properties.xLabel;
        }
        if (isDefined(properties.yLabel)) {
            props.yLabel = properties.yLabel;
        }
        if (isDefined(properties.name)) {
            props.name = properties.name;
        }
        if (isDefined(properties.lineColor)) {
            props.lineColor = properties.lineColor;
        }
        if (isDefined(properties.backgroundColor)) {
            props.backgroundColor = properties.backgroundColor;
        }
        if (isDefined(properties.fill)) {
            props.fill = properties.fill;
        }
        if (isDefined(properties.stroke)) {
            props.stroke = properties.stroke;
        }

        this.definedId('spectrumId', props);

        if (isDefined(properties.getFrequencies)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('frequencies', await this.getFunc('getFrequencies')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getFrequencies'), fn);
        }

        if (isDefined(properties.getAmplitudes)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('amplitudes', await this.getFunc('getAmplitudes')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getAmplitudes'), fn);
        }
    }
}

export default SpectrumLayer;
