import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import {
    Cartesian3
} from '@cesium/engine';
import PolygonLayer from "osh-js/core/ui/layer/PolygonLayer";
import {EventType} from 'osh-js/core/event/EventType';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data source for geo ref
//let uavGeoDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - GeoReferenced Image Frame', {
//  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
//  tls: true,
//  startTime: '2025-06-12T14:06:06.410Z',
//  endTime: '2025-06-13T14:06:06.410Z',
//  minTime: '2025-06-12T14:06:06.410Z',
//  maxTime: '2025-06-13T14:06:06.410Z',
//  mode: Mode.REPLAY,
//  replaySpeed: REPLAY_SPEED,
//  prefetchBatchDuration: 10000,
//  prefetchBatchSize: 250,
//  resource: '/datastreams/15po2igbfnjjk/observations',
//  responseFormat: 'application/om+json',
//  timeShift: -16000
//});

let uavGeoDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - GeoReferenced Image Frame', {
    endpointUrl: 'api.georobotix.io/ogc/demo1/api',
    resource: '/datastreams/15po2igbfnjjk/observations',
    responseFormat: 'application/swe+json',
    tls: true,
    protocol: 'ws',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
    },
    mode : Mode.REAL_TIME
});
console.log('uav geo point marker created');

uavGeoDataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

//const dataSynchronizer = new DataSynchronizer({
//    replaySpeed: 2,
//    dataSources: [uavGeoDataSource]
//});
//console.log('uav geo data sync');

// bounded draping layer
let uavBoundedDraping = new PolygonLayer({
    dataSourceId: [uavGeoDataSource.id],
    opacity: .5,
    clampToGround: true,
    getVertices: (rec) => {
        console.log('Received geoRef record:', rec);
        return [
            rec.geoRef.ulc.lon,
            rec.geoRef.ulc.lat,
            rec.geoRef.llc.lon,
            rec.geoRef.llc.lat,
            rec.geoRef.lrc.lon,
            rec.geoRef.lrc.lat,
            rec.geoRef.urc.lon,
            rec.geoRef.urc.lat,
        ];
    },
});
console.log('uav layer created');

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [uavBoundedDraping]
});
console.log('uav view');

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

//cesiumView.viewer.camera.flyTo({
//    destination: Cartesian3.fromDegrees(34.68361017046664, -86.67185709191106, 0)
//});

// start streaming
//dataSynchronizer.connect();
uavGeoDataSource.connect();
