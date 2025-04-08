import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from "osh-js/core/datasource/Mode";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const REPLAY_SPEED = 1.0;

// create data source for UAV camera
let videoDataSource =  new ConSysApi('Dahua PTZ Cam SG00010 - Video Feed', {
  endpointUrl: 'api.georobotix.io/ogc/demo1/api',
  tls: true,
  startTime: '2020-04-27T08:00:00Z',
  endTime: '2025-03-21T20:26:31Z',
  minTime: '2020-04-27T08:00:00Z',
  maxTime: '2055-03-21T20:26:31Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/fuv5963hd138e/observations',
  responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
  container: 'ptz-dahua-container',
  css: 'video-dahua-ptz',
  name: 'Dahua PTZ Cam SG00010 - Video Feed',
  framerate: 25,
  showTime: true,
  showStats: true,
  useWebCodecApi: true,
  layers: [
    new VideoDataLayer({
      dataSourceId: videoDataSource.id,
      getFrameData: (rec) => rec.img,
      getTimestamp: (rec) => rec.timestamp
    })
  ]
});

// start streaming
const dataSynchronizer = new DataSynchronizer({
  masterTimeRefreshRate: 250,
  replaySpeed: REPLAY_SPEED,
  mode: Mode.REPLAY,
  dataSources: [
    videoDataSource
  ]
});
dataSynchronizer.connect()