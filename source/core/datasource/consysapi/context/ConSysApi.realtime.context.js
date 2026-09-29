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

import ConSysApiContext from "./ConSysApi.context";
import DataStream from "../../../consysapi/datastream/DataStream";
import {Status} from "../../../connector/Status.js";
import {isDefined} from "../../../utils/Utils";
import ControlStream from "../../../consysapi/controlstream/ControlStream";


/**
 * Backoff schedule (in milliseconds) used by {@link SweApiRealTimeContext#fetchLatestObservationsWithRetry}
 * when attempting to retrieve the most recent observation after a (re)connection.
 *
 * @type {number[]}
 */
const FETCH_LATEST_RETRY_DELAYS_MS = [100, 400, 1200, 3000];

/**
 * `datastream -> system` lookups keyed by `<baseUrl>|<datastreamId>`. Holds the in-flight promise
 * so datasources connecting together share one request.
 * @type {Map<string, Promise<?string>>}
 */
const systemIdByDatastream = new Map();

/**
 * Newest observation time per system, keyed by `<baseUrl>|<systemId>`.
 * @type {Map<string, Promise<?number>>}
 */
const systemActivityBySystem = new Map();

/** Page size when listing a system's datastreams. */
const SYSTEM_DATASTREAMS_PAGE_SIZE = 100;

/**
 * Promisified `setTimeout` used to await between retry attempts without blocking the event loop.
 *
 * @param {number} ms - Number of milliseconds to wait before the returned promise resolves.
 * @returns {Promise<void>} A promise that resolves once `ms` milliseconds have elapsed.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class ConSysApiRealTimeContext extends ConSysApiContext {
    init(properties) {
        this.properties = properties;

        const networkProperties = {
            ...properties,
            streamProtocol: properties.protocol
        };
        let filter;
        let regex = new RegExp('\\/systems\\/(.*)\\/controlstreams\\/(.*)\\/status');

        this.streamObject = undefined;

        // check control status
        if(regex.test(properties.resource)) {
            filter = this.createControlStreamFilter(properties);
            // is observation streaming
            const match = regex.exec(properties.resource);

            this.streamObject = new ControlStream({
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

    onStreamConnectorStatus(status) {
        if (this.onChangeStatus) {
            this.onChangeStatus(status);
        }
        if (status === Status.CONNECTED && this.streamObject && this.streamObject.searchObservations) {
            this.scheduleFetchLatestObservations();
        }
    }

    /**
     * 150ms debounce on fetchLatestObservationsWithRetry.
     *
     * No-op unless the datasource opted in with `fetchLatestOnConnect`. The seed reads the
     * observation store, which can hand back data of any age, so whether a last-known value is
     * worth showing is the consumer's call.
     */
    scheduleFetchLatestObservations() {
        if (!this.properties.fetchLatestOnConnect) {
            return;
        }
        if (this._fetchLatestDebounce) {
            clearTimeout(this._fetchLatestDebounce);
        }
        this._fetchLatestDebounce = setTimeout(() => {
            this._fetchLatestDebounce = undefined;
            this.fetchLatestObservationsWithRetry();
        }, 150);
    }

    /**
     * Resolves the id of the system this datastream belongs to, from `system@id` on the
     * datastream resource (`GET /datastreams/{id}`). Memoized per endpoint and datastream.
     *
     * @returns {Promise<?string>} the system id, or null if it could not be resolved.
     */
    async resolveSystemId() {
        const stream = this.streamObject;
        const datastreamId = stream && stream.properties && stream.properties.id;
        if (!datastreamId || !stream.fetchAsJson) {
            return null;
        }
        const key = `${stream.baseUrl()}|${datastreamId}`;
        if (!systemIdByDatastream.has(key)) {
            const pending = (async () => {
                const json = await stream.fetchAsJson(
                    `/datastreams/${datastreamId}`,
                    'f=application/json'
                );
                return (json && json['system@id']) || null;
            })().catch(() => null);
            systemIdByDatastream.set(key, pending);
        }
        return systemIdByDatastream.get(key);
    }

    /**
     * Newest `phenomenonTime` end across all of the system's datastreams (`'now'` counts as the
     * current instant). Asked of the whole system so a one-shot location stream does not make a
     * live system look silent. Memoized per endpoint and system.
     *
     * @param {String} systemId - the system to look up.
     * @returns {Promise<?number>} epoch millis of the newest observation, or null if unknown.
     */
    async resolveSystemLastActivity(systemId) {
        const stream = this.streamObject;
        if (!systemId || !stream || !stream.fetchAsJson) {
            return null;
        }
        const key = `${stream.baseUrl()}|${systemId}`;
        if (!systemActivityBySystem.has(key)) {
            const pending = (async () => {
                const json = await stream.fetchAsJson(
                    `/systems/${systemId}/datastreams`,
                    `f=application/json&limit=${SYSTEM_DATASTREAMS_PAGE_SIZE}`
                );
                const datastreams = (json && json.items) || [];
                let newest = null;
                for (const datastream of datastreams) {
                    const phenomenonTime = datastream && datastream.phenomenonTime;
                    const end = Array.isArray(phenomenonTime) ? phenomenonTime[1] : undefined;
                    if (!isDefined(end)) {
                        continue;
                    }
                    const at = end === 'now' ? Date.now() : Date.parse(end);
                    if (Number.isFinite(at) && (newest === null || at > newest)) {
                        newest = at;
                    }
                }
                return newest;
            })().catch(() => null);
            systemActivityBySystem.set(key, pending);
        }
        return systemActivityBySystem.get(key);
    }

    /**
     * Whether the system was heard from within `fetchLatestMaxSilenceMs`. Gates both the seed and
     * the declared-position fallback. Unset horizon or unknown activity passes.
     *
     * @param {String} systemId - the system to judge.
     * @returns {Promise<boolean>} true if stored or declared state may be shown.
     */
    async isWithinSystemSilence(systemId) {
        const maxSilenceMs = this.properties.fetchLatestMaxSilenceMs;
        if (!isDefined(maxSilenceMs)) {
            return true;
        }
        const lastActivity = await this.resolveSystemLastActivity(systemId);
        if (lastActivity === null) {
            return true;
        }
        return (Date.now() - lastActivity) <= maxSilenceMs;
    }

    /**
     * Determines whether a seed record is recent enough to be delivered.
     *
     * Always true when `fetchLatestMaxAgeMs` is not set, which is the default.
     * There is no way to differentiate between stale data & an old timestamp
     * (a manually set location) that is still accurate for a running driver.
     *
     * @param {Object} record - a parsed observation, carrying `timestamp` in epoch millis.
     * @returns {boolean} true if the record may be delivered.
     */
    isWithinLatestObsMaxAge(record) {
        const maxAgeMs = this.properties.fetchLatestMaxAgeMs;
        if (!isDefined(maxAgeMs)) {
            return true;
        }
        const timestamp = record && record.timestamp;
        if (!isDefined(timestamp) || Number.isNaN(timestamp)) {
            return false;
        }
        return (Date.now() - timestamp) <= maxAgeMs;
    }

    /**
     * Fetches the latest observation (`phenomenonTime=now`) with retries and delivers what passes
     * {@link isWithinLatestObsMaxAge}. Skipped without a query when the parent system fails
     * {@link isWithinSystemSilence}. Retries cover a store not written to yet; a stale answer
     * stops them, since re-reading the same rows cannot help.
     *
     * @returns {Promise<void>} Resolves once delivered, skipped, rejected as stale, or retries exhausted.
     */
    async fetchLatestObservationsWithRetry() {
        if (!this.streamObject || !this.streamObject.searchObservations) {
            return;
        }
        if (isDefined(this.properties.fetchLatestMaxSilenceMs)) {
            const systemId = await this.resolveSystemId();
            if (!await this.isWithinSystemSilence(systemId)) {
                return;
            }
        }
        const responseFormat = this.properties.responseFormat;
        let lastErr;
        for (let i = 0; i < FETCH_LATEST_RETRY_DELAYS_MS.length; i++) {
            await delay(FETCH_LATEST_RETRY_DELAYS_MS[i]);
            try {
                const filter = this.createObservationFilter(this.properties);
                filter.props.phenomenonTime = 'now';
                const collection = await this.streamObject.searchObservations(filter);
                const data = await collection.nextPage();
                if (data && data.length) {
                    const fresh = data.filter(record => this.isWithinLatestObsMaxAge(record));
                    if (fresh.length) {
                        fresh.forEach(d => {
                            d.version = this.properties.version;
                        });
                        this.handleData(fresh, responseFormat);
                    }
                    return;
                }
            } catch (err) {
                lastErr = err;
            }
        }
        if (lastErr) {
            console.error('[ConSysApiRealTimeContext] fetch latest observations failed after retries', lastErr);
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


export default ConSysApiRealTimeContext;
