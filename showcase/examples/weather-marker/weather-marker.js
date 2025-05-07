import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data source for weather sensor
let weatherDataSource =  new ConSysApi('Simulated Weather Sensor - Sensor Location', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
  tls: true,
  startTime: '2025-04-17T18:54:41.08Z',
  endTime: '2025-04-17T18:57:17Z',
  minTime: '2025-04-17T18:54:41.08Z',
  maxTime: '2025-04-17T18:57:17Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/d0nbmp1npvp3o/observations',
  responseFormat: 'application/swe+json',
  timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
//    startTime: '2015-02-16T07:58:22.00Z',
//    endTime: '2015-02-16T08:09:00Z',
    dataSources: [weatherDataSource]
});

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: weatherDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    icon: 'images/marker-icon.png',
   // icon: 'https://storage.googleapis.com/grx-morpheusx-icons/mdi-svg/ab-testing.svg',
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
