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
 * Layer for Chart.js bubble charts. Renders points with a third dimension (radius).
 * Use getRadius(rec) to extract the bubble size from each record.
 *
 * @extends ChartXYLayer
 * @example
 *
 * const layer = new ChartBubbleLayer({
 *     dataSourceId: ds.id,
 *     getXAxisValues: (rec) => rec.result.longitude,
 *     getYAxisValues: (rec) => rec.result.latitude,
 *     getRadius: (rec) => rec.result.magnitude,
 *     backgroundColor: '#FF638480',
 * });
 */
class ChartBubbleLayer extends ChartXYLayer {

    constructor(properties) {
        super(properties);
        this.type = 'chartBubble';
    }

    getDefaultProps() {
        return {
            pointRadius: 0,
            fill: true,
        };
    }
}

export default ChartBubbleLayer;
