import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion, Cartesian3} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data sources
let satellite7DataSource =  new ConSysApi('SPOT-7 Satellite - Platform Location', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
  tls: true,
  startTime: '2025-10-09T09:24:12.272Z',
  endTime: '2025-10-10T09:24:12.272Z',
  minTime: '2025-10-09T09:24:12.272Z',
  maxTime: '2025-10-10T09:24:12.272Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/9hlba9dv4t9ig/observations',
  responseFormat: 'application/om+json',
  timeShift: -16000
});
console.log('satellite data source created:', satellite7DataSource);

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    dataSources: [satellite7DataSource]
});

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: satellite7DataSource.id,
    getLocation: (rec) => ({
        x: rec.pos.x,
        y: rec.pos.y,
        z: rec.pos.z
    }),
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
    allowBillboardRotation: false
});
console.log('point marker created');

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker]
});
console.log('cesium view done');

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

//cesiumView.viewer.camera.flyTo({
//    destination: Cartesian3.fromDegrees(0,0,0)
//});

// start streaming
dataSynchronizer.connect();
