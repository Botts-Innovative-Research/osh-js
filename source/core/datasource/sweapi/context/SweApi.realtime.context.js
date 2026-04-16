/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import SweApiContext from "./SweApi.context";
import Control from "../../../sweapi/control/Control";
import DataStream from "../../../sweapi/datastream/DataStream";
import {Status} from "../../../connector/Status.js";
import {isDefined} from "../../../utils/Utils";

const FETCH_LATEST_RETRY_DELAYS_MS = [100, 400, 1200, 3000];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class SweApiRealTimeContext extends SweApiContext {
    init(properties) {
        this.properties = properties;

        const networkProperties = {
            ...properties,
            streamProtocol: properties.protocol
        };
        let filter;
        let regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');

        this.streamObject = undefined;

        // check control status
        if(regex.test(properties.resource)) {
            filter = this.createControlFilter(properties);
            // is observation streaming
            const match = regex.exec(properties.resource);

            this.streamObject = new Control({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.streamFunction = function() {
                this.streamObject.streamStatus(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
            }
        } else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(properties.resource)) {
                filter = this.createObservationFilter(properties);
                // is observation streaming
                const match = regex.exec(properties.resource);
                this.streamObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.streamFunction = function() {
                    this.streamObject.streamObservations(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
                }
            }
        }

            if (isDefined(this.streamObject)) {
               this.streamObject.stream().onChangeStatus = this.onStreamConnectorStatus.bind(this);
            }
        }
    /**
     * When the observation stream reconnects, pull the last observation again so map layers stay in sync.
     */
    onStreamConnectorStatus(status) {
        if (this.onChangeStatus) {
            this.onChangeStatus(status);
        }
        if (status === Status.CONNECTED && this.streamObject && this.streamObject.searchObservations) {
            this.scheduleFetchLatestObservations();
        }
    }

    scheduleFetchLatestObservations() {
        if (this._fetchLatestDebounce) {
            clearTimeout(this._fetchLatestDebounce);
        }
        this._fetchLatestDebounce = setTimeout(() => {
            this._fetchLatestDebounce = undefined;
            this.fetchLatestObservationsWithRetry();
        }, 150);
    }

    async fetchLatestObservationsWithRetry() {
        if (!this.streamObject || !this.streamObject.searchObservations) {
            return;
        }
        const responseFormat = this.properties.responseFormat;
        let lastErr;
        for (let i = 0; i < FETCH_LATEST_RETRY_DELAYS_MS.length; i++) {
            await delay(FETCH_LATEST_RETRY_DELAYS_MS[i]);
            try {
                const filter = this.createObservationFilter(this.properties);
                filter.props.resultTime = 'latest';
                const collection = await this.streamObject.searchObservations(filter);
                const page = await collection.nextPage();
                const data = page;
                if (data && data.length) {
                    data.forEach(d => {
                        d.version = this.properties.version;
                    });
                    this.handleData(data, responseFormat);
                    return;
                }
            } catch (err) {
                lastErr = err;
            }
        }
        if (lastErr) {
            console.error('[SweApiRealTimeContext] fetch latest observations failed after retries', lastErr);
        }
    }

    onStreamMessage(messages, format) {
         // in case of om+json, we have to add the timestamp which is not included for each record but at the root level
        let results = messages;
        let version = this.properties.version;
        for(let message of messages) {
            message.version = version;
        }
        this.handleData(results, format);
    }

    connect() {
        this.streamFunction();
        if (this.streamObject && this.streamObject.searchObservations) {
            this.scheduleFetchLatestObservations();
        }
    }

    async disconnect() {
        if(isDefined(this.streamObject)) {
            this.streamObject.stream().disconnect();
        }
    }

    isConnected() {
        return this.streamObject.stream().status;
    }
}


export default SweApiRealTimeContext;
