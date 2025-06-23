import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import {
    Cartesian3
} from '@cesium/engine';
import {EventType} from 'osh-js/core/event/EventType';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

const begin = '2025-06-12T14:11:06.410999755Z';
const fin = '2025-06-13T14:11:06.410999755Z';

// create data source for uav location
//let uavDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Sensor Location', {
//  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
//  tls: true,
//  startTime: begin,
//  endTime: fin,
//  minTime: begin,
//  maxTime: fin,
//  mode: Mode.REPLAY,
//  replaySpeed: REPLAY_SPEED,
//  prefetchBatchDuration: 10000,
//  prefetchBatchSize: 250,
//  resource: '/datastreams/6ft4mrvfugkr2/observations',
//  responseFormat: 'application/om+json',
//  timeShift: -16000
//});

let uavDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Sensor Location', {
    endpointUrl: 'api.georobotix.io/ogc/demo1/api',
    resource: '/datastreams/6ft4mrvfugkr2/observations',
    responseFormat: 'application/om+json',
    tls: true,
    protocol: 'ws',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
    },
    mode : Mode.REAL_TIME
});

// data source for uav attitude
//let attDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Platform Attitude', {
//  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
//  tls: true,
//  startTime: begin,
//  endTime: fin,
//  minTime: begin,
//  maxTime: fin,
//  mode: Mode.REPLAY,
//  replaySpeed: REPLAY_SPEED,
//  prefetchBatchDuration: 10000,
//  prefetchBatchSize: 250,
//  resource: '/datastreams/98nto59268lok/observations',
//  responseFormat: 'application/om+json',
//  timeShift: -16000
//});

let attDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Platform Attitude', {
    endpointUrl: 'api.georobotix.io/ogc/demo1/api',
    resource: '/datastreams/98nto59268lok/observations',
    responseFormat: 'application/om+json',
    tls: true,
    protocol: 'ws',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
    },
    mode : Mode.REAL_TIME
});


//const dataSynchronizer = new DataSynchronizer({
//    replaySpeed: 2,
//    dataSources: [uavDataSource, attDataSource]
//});

uavDataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

attDataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

// style it with a point marker
// need to convert to lon/lat?
let pointMarker = new PointMarkerLayer({
    dataSourceIds:  [uavDataSource.getId(), attDataSource.getId()],
    getLocation: (rec) => ({
        x: rec.result.location.lon,
        y: rec.result.location.lat,
        z: rec.result.location.alt
    }),
    defaultToTerrainElevation: true,
    //console,log("Record:", rec);
    getOrientation: (rec) => ({
        heading: rec.result.attitude.heading - 90.0
    }),
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
    allowBillboardRotation: false
});


// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker]
});

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

//cesiumView.viewer.camera.flyTo({
//    destination: Cartesian3.fromDegrees(34.69824752989143, -86.67816246239383, 3047.812619211108)
//});

// start streaming
uavDataSource.connect();
attDataSource.connect();
