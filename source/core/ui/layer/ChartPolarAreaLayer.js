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
 * Layer for Chart.js polar area charts.
 * Equal-width slices with variable radius based on data values.
 *
 * @extends ChartRadialLayer
 * @example
 *
 * const layer = new ChartPolarAreaLayer({
 *     dataSourceId: ds.id,
 *     getLabels: (rec) => rec.result.categories,
 *     getDataValues: (rec) => rec.result.values,
 *     getBackgroundColors: (rec) => ['#FF638480', '#36A2EB80', '#FFCE5680'],
 * });
 */
class ChartPolarAreaLayer extends ChartRadialLayer {

    constructor(properties) {
        super(properties);
        this.type = 'chartPolarArea';
    }
}

export default ChartPolarAreaLayer;
