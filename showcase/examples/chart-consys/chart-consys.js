// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import SweApi from "../../../source/core/datasource/sweapi/SweApi.datasource";
import {Mode} from 'osh-js/core/datasource/Mode';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
//import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

//const REPLAY_SPEED = 1.0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let chartDataSource = new ConSysApi("weather", {
    endpointUrl: "api.georobotix.io/ogc/demo1/api",
    startTime: "2015-08-02T20:00:00Z",
    endTime: "now",
    tls: true,
    mode: Mode.REAL_TIME,
    //replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/vadu2mqtbnrsa/observations',
    responseFormat: 'application/swe+binary',
});

// #region snippet_curve_layer
let windSpeedLayerCurve = new CurveLayer({
    dataSourceId: chartDataSource.id,
    getValues: (rec, time) => {
        return {
            x: time,
            y: rec.windSpeed
        }
    },
    lineColor: 'rgba(38,152,255,0.5)',
    getLineColor: (rec) => {
        const randomNumber = getRandomArbitrary(0,1);
        if(randomNumber > 0.5) {
            return 'rgba(255,0,0,0.5)';
        } else {
            return 'rgba(38,152,255,0.5)';
        }
    },
    fill: true,
    backgroundColor: 'rgba(169,212,255,0.5)',
    maxValues: 25,
    getBackgroundColor: (rec) => {
        const randomNumber = getRandomArbitrary(0,1);
        if(randomNumber > 0.5) {
            return 'rgba(255,0,0,0.5)';
        } else {
            return 'rgba(38,152,255,0.5)';
        }
    },
    name: 'Wind Speed (m/s)'
});
// #endregion snippet_curve_layer

// show it in video view
let chartView = new ChartJsView({
    container: 'char-consys-container',
    layers: [ windSpeedLayerCurve],
    css: "chart-view",
    options: {
        scales: {
            y: {
                title: {
                    display : true,
                    text: "Wind Speed (m/s)s",
                    padding: 20
                }
            },
        }
    },
    datasetOptions: {
        tension: 0.2 // for 'line'
    }
});

// start streaming
chartDataSource.connect();
