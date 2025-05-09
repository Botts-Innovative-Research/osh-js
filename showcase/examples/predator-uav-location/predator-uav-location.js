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

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data source for uav location
let uavDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Sensor Location', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
  tls: true,
  startTime: '2025-05-08T16:12:14Z',
  endTime: '2025-05-09T16:12:14Z',
  minTime: '2025-05-08T16:12:14Z',
  maxTime: '2025-05-09T16:12:14Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/6ft4mrvfugkr2/observations',
  responseFormat: 'application/swe+json',
  timeShift: -16000
});

// data source for uav attitude
let attDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Platform Attitude', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
  tls: true,
  startTime: '2025-05-08T19:20:14Z',
  endTime: '2025-05-09T16:12:14Z',
  minTime: '2025-05-08T19:20:14Z',
  maxTime: '2025-05-09T16:12:14Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/98nto59268lok/observations',
  responseFormat: 'application/swe+json',
  timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    dataSources: [uavDataSource, attDataSource]
});

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    dataSourceIds:  [uavDataSource.getId(), attDataSource.getId()],
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    getOrientation: (rec) => ({
        heading: rec.attitude.heading - 90.0
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

// start streaming
dataSynchronizer.connect();
