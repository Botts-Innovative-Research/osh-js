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

import ChartXYLayer from "./ChartXYLayer.js";

/**
 * Layer for Chart.js scatter charts. Renders unconnected data points.
 *
 * @extends ChartXYLayer
 * @example
 *
 * const layer = new ChartScatterLayer({
 *     dataSourceId: ds.id,
 *     getValues: (rec) => ({ x: rec.result.windSpeed, y: rec.result.temperature }),
 *     lineColor: '#FF6384',
 * });
 */
class ChartScatterLayer extends ChartXYLayer {

    constructor(properties) {
        super(properties);
        this.type = 'chartScatter';
    }

    getDefaultProps() {
        return {
            pointRadius: 3,
            fill: false,
        };
    }
}

export default ChartScatterLayer;
