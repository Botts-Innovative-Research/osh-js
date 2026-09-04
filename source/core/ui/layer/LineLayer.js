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

import Layer from "./Layer.js";
import {isDefined, randomUUID} from "../../utils/Utils.js";

/**
 * Unified layer for line chart data. Supports both single-value (time-series)
 * and array-value (spectrum/snapshot) data shapes.
 *
 * For single values per record, use getValues(rec) => {x, y}.
 * For array values per record, use getXAxisValues(rec) and getYAxisValues(rec).
 *
 * @extends Layer
 * @example
 *
 * // Spectrum / snapshot style (array values)
 * const layer = new LineLayer({
 *     dataSourceId: ds.id,
 *     getXAxisValues: (rec) => rec.frequency_axis.map(f => f / 1e6),
 *     getYAxisValues: (rec) => rec.amplitude,
 *     getSeriesId:    (rec) => rec.channel,
 * });
 *
 * // Time-series style (single values)
 * const layer = new LineLayer({
 *     dataSourceId: ds.id,
 *     getValues:   (rec) => ({ x: rec.timestamp, y: rec.temperature }),
 *     getSeriesId: (rec) => 'temperature',
 *     lineColor: '#ff0000',
 *     maxValues: 200,
 * });
 */
class LineLayer extends Layer {

    constructor(properties) {
        super(properties);
        this.type = 'line';
    }

    // called by super class constructor
    init(properties = this.properties) {
        super.init(properties);

        const props = {
            xAxisValues:     [],
            yAxisValues:     [],
            timestamp:       0,
            seriesId:        randomUUID(),
            lineColor:       '#399ca5',
            backgroundColor: '#399ca5',
            fill:            false,
            stroke:          1,
            name:            '',
            maxValues:       10,
        };

        // Static property overrides
        if (isDefined(properties.lineColor))       props.lineColor = properties.lineColor;
        if (isDefined(properties.backgroundColor)) props.backgroundColor = properties.backgroundColor;
        if (isDefined(properties.fill))            props.fill = properties.fill;
        if (isDefined(properties.stroke))          props.stroke = properties.stroke;
        if (isDefined(properties.maxValues))       props.maxValues = properties.maxValues;
        if (isDefined(properties.name))            props.name = properties.name;

        // Register per-entity tracking via seriesId (replaces curveId / channel)
        this.definedId('seriesId', props);

        // --- Value extraction: two mutually exclusive APIs ---

        if (isDefined(properties.getValues)) {
            // Point style: getValues(rec) => {x, y} — wraps scalars into single-element arrays
            if (isDefined(properties.getXAxisValues) || isDefined(properties.getYAxisValues)) {
                console.warn('[LineLayer] getValues and getXAxisValues/getYAxisValues both provided; getValues takes precedence.');
            }
            let fn = async (rec, timestamp, options) => {
                const value = await this.getFunc('getValues')(rec, timestamp, options);
                this.updateProperty('xAxisValues', [value.x]);
                this.updateProperty('yAxisValues', [value.y]);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getValues'), fn);
        } else {
            // Array or scalar style: getXAxisValues/getYAxisValues — scalars are wrapped into [value]
            if (isDefined(properties.getXAxisValues)) {
                let fn = async (rec, timestamp, options) => {
                    const val = await this.getFunc('getXAxisValues')(rec, timestamp, options);
                    this.updateProperty('xAxisValues', Array.isArray(val) ? val : [val]);
                };
                this.addFn(this.getDataSourcesIdsByProperty('getXAxisValues'), fn);
            }

            if (isDefined(properties.getYAxisValues)) {
                let fn = async (rec, timestamp, options) => {
                    const val = await this.getFunc('getYAxisValues')(rec, timestamp, options);
                    this.updateProperty('yAxisValues', Array.isArray(val) ? val : [val]);
                };
                this.addFn(this.getDataSourcesIdsByProperty('getYAxisValues'), fn);
            }
        }

        if (isDefined(properties.getTimestamp)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('timestamp', await this.getFunc('getTimestamp')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getTimestamp'), fn);
        }

        if (isDefined(properties.getStroke)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('stroke', await this.getFunc('getStroke')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getStroke'), fn);
        }

        if (isDefined(properties.getLineColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('lineColor', await this.getFunc('getLineColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLineColor'), fn);
        }

        if (isDefined(properties.getBackgroundColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('backgroundColor', await this.getFunc('getBackgroundColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getBackgroundColor'), fn);
        }
    }
}

export default LineLayer;
