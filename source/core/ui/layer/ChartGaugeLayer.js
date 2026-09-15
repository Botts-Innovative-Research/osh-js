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
 * Layer for gauge charts. Extracts a single streaming numeric value from a DataSource.
 *
 * @extends Layer
 * @example
 *
 * const layer = new ChartGaugeLayer({
 *     dataSourceId: ds.id,
 *     getValue: (rec) => rec.result.stationPressure,
 * });
 */
class ChartGaugeLayer extends Layer {

    constructor(properties) {
        super(properties);
        this.type = 'chartGauge';
    }

    // called by super class constructor
    init(properties = this.properties) {
        super.init(properties);

        const props = {
            value:     0,
            timestamp: 0,
            seriesId:  randomUUID(),
            name:      '',
        };

        if (isDefined(properties.name)) props.name = properties.name;

        // Register per-entity tracking via seriesId
        this.definedId('seriesId', props);

        // Single value extraction
        if (isDefined(properties.getValue)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('value', await this.getFunc('getValue')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getValue'), fn);
        }

        if (isDefined(properties.getTimestamp)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('timestamp', await this.getFunc('getTimestamp')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getTimestamp'), fn);
        }
    }
}

export default ChartGaugeLayer;
