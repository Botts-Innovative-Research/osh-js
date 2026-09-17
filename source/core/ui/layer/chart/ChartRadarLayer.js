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

import ChartRadialLayer from "./ChartRadialLayer.js";

/**
 * Layer for Chart.js radar charts. Renders overlapping polygons on a radial grid.
 * Supports multiple series (datasets) for comparison.
 *
 * @extends ChartRadialLayer
 * @example
 *
 * const layer = new ChartRadarLayer({
 *     dataSourceId: ds.id,
 *     getLabels: (rec) => ['Speed', 'Strength', 'Agility', 'Endurance'],
 *     getDataValues: (rec) => [rec.result.speed, rec.result.strength, rec.result.agility, rec.result.endurance],
 *     getSeriesId: (rec) => rec.result.playerId,
 *     lineColor: '#FF6384',
 *     backgroundColor: '#FF638440',
 *     fill: true,
 * });
 */
class ChartRadarLayer extends ChartRadialLayer {

    constructor(properties) {
        super(properties);
        this.type = 'chartRadar';
    }

    getDefaultProps() {
        return {
            fill: true,
            borderWidth: 2,
        };
    }
}

export default ChartRadarLayer;
