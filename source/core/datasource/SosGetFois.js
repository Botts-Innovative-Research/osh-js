/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataSource from "./DataSource";
import SosGetResultJsonWorker from "./workers/SosGetFois.worker.js";

class SosGetFois extends DataSource {

    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.procedureId the specific procedure id
     * @param {Number} [properties.responseFormat=application/xml] the response format (e.g video/mp4)
     */
    constructor(name, properties) {
        super(name, {
            batchSize: 10,
            ...properties,
            responseType: 'application/xml',
        }, new SosGetResultJsonWorker());
    }
}
export default SosGetFois;
