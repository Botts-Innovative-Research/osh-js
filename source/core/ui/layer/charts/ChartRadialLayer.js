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
 * Base layer for radial chart types (pie, doughnut, polar area) and radar.
 * Uses labels[] + dataValues[] data shape instead of x/y points.
 * Subclasses set this.type and override default props.
 *
 * Not intended to be instantiated directly — use ChartPieLayer, ChartPolarAreaLayer, or ChartRadarLayer.
 *
 * @extends Layer
 */
class ChartRadialLayer extends Layer {

    constructor(properties) {
        super(properties);
        // Subclasses must set this.type
    }

    // called by super class constructor
    init(properties = this.properties) {
        super.init(properties);

        const props = {
            labels:           [],
            dataValues:       [],
            backgroundColors: [],
            borderColors:     [],
            borderWidth:      1,
            lineColor:        '#399ca5',
            backgroundColor:  '#399ca5',
            fill:             true,
            timestamp:        0,
            seriesId:         randomUUID(),
            name:             '',
            cutout:           '0%',
            ...this.getDefaultProps(),
        };

        // Static property overrides
        if (isDefined(properties.borderWidth))      props.borderWidth = properties.borderWidth;
        if (isDefined(properties.lineColor))        props.lineColor = properties.lineColor;
        if (isDefined(properties.backgroundColor))  props.backgroundColor = properties.backgroundColor;
        if (isDefined(properties.fill))             props.fill = properties.fill;
        if (isDefined(properties.name))             props.name = properties.name;
        if (isDefined(properties.cutout))           props.cutout = properties.cutout;

        // Register per-entity tracking via seriesId
        this.definedId('seriesId', props);

        // Label extraction
        if (isDefined(properties.getLabels)) {
            let fn = async (rec, timestamp, options) => {
                const val = await this.getFunc('getLabels')(rec, timestamp, options);
                this.updateProperty('labels', Array.isArray(val) ? val : [val]);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLabels'), fn);
        }

        // Data value extraction
        if (isDefined(properties.getDataValues)) {
            let fn = async (rec, timestamp, options) => {
                const val = await this.getFunc('getDataValues')(rec, timestamp, options);
                this.updateProperty('dataValues', Array.isArray(val) ? val : [val]);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getDataValues'), fn);
        }

        // Background colors extraction
        if (isDefined(properties.getBackgroundColors)) {
            let fn = async (rec, timestamp, options) => {
                const val = await this.getFunc('getBackgroundColors')(rec, timestamp, options);
                this.updateProperty('backgroundColors', Array.isArray(val) ? val : [val]);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getBackgroundColors'), fn);
        }

        // Border colors extraction
        if (isDefined(properties.getBorderColors)) {
            let fn = async (rec, timestamp, options) => {
                const val = await this.getFunc('getBorderColors')(rec, timestamp, options);
                this.updateProperty('borderColors', Array.isArray(val) ? val : [val]);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getBorderColors'), fn);
        }

        if (isDefined(properties.getTimestamp)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('timestamp', await this.getFunc('getTimestamp')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getTimestamp'), fn);
        }

        // Radar-specific: lineColor and fill can be dynamic
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

    /**
     * Override in subclasses to provide chart-type-specific default props.
     * @return {Object}
     */
    getDefaultProps() {
        return {};
    }
}

export default ChartRadialLayer;
