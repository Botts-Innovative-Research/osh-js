function init() {
    // creates dataSources
    //--Android Phone Video
    var androidPhoneGpsDataSource = new OSH.DataReceiver.LatLonAlt("android-GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    });

    var androidPhoneOrientationDataSource = new OSH.DataReceiver.OrientationQuaternion("android-Orientation", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    });


    var androidPhoneVideoDataSource = new OSH.DataReceiver.Video("android-Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    },{
        format: "mjpeg"
    });

    var weatherDataSource = new OSH.DataReceiver.Chart("weather", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:mysos:offering03",
        observedProperty: "http://sensorml.com/ont/swe/property/Weather",
        startTime: "now",
        endTime: "2055-01-01Z"
    });

    var taskingVideoDataSource = new OSH.DataSender.Tasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: "ENDPOINT_URL",
        offeringID: "OFFERING_ID"
    });

    var androidEntity = {
        name: "Android Phone",
        dataSources: [androidPhoneGpsDataSource.getId(), androidPhoneOrientationDataSource.getId(),androidPhoneVideoDataSource.getId()]
    };

    // creates views
    var mapView = new OSH.UI.LeafletView("top-left");

    var videoView = new OSH.UI.VideoView("top-right",{
        dataSourceId:androidPhoneVideoDataSource.getId(),
        format: "mjpeg",
        css:"video",
        cssSelected:"video-selected",
        name:"Android Phone Video"
    });

    var windSpeedChartView = new OSH.UI.Nvd3CurveChartView("bottom-left",{
        name:"WindSpeed chart",
        yLabel : 'Wind Speed (m/s)',
        xLabel : 'Time'
    });

    var taskingView = new OSH.UI.TaskingView("bottom-right",{
        dataSourceId : taskingVideoDataSource.getId()
    });

    // creates stylers
    var androidMarkerStyler = new OSH.UI.Styler.PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        orientationFunc : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        iconFunc : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });

    var polylineStyler = new OSH.UI.Styler.Polyline({
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        color : 'rgba(0,0,255,0.5)',
        weight : 10,
        opacity : .5,
        smoothFactor : 1,
        maxPoints : 200
    });

    var windSpeedChartCurveStyler = new OSH.UI.Styler.Curve({
        valuesFunc : {
            dataSourceIds : [weatherDataSource.getId()],
            handler : function(rec,timeStamp) {
                return {
                    x : timeStamp,
                    y : parseFloat(rec[2])
                };
            }
        }
    });

    // adds view item to the view
    mapView.addViewItem({
        styler : androidMarkerStyler,
        name : "Android Phone GPS"
    });

    mapView.addViewItem({
        styler : polylineStyler,
        name : "Android Phone GPS Path"
    });

    windSpeedChartView.addViewItem({
        styler : windSpeedChartCurveStyler,
        name : "Wind speed curve"
    });

    // adds datasources to dataProviderController
    var dataProviderController = new OSH.DataReceiver.DataReceiverController({
        bufferingTime : 0*1000, // 2 seconds
        synchronizedTime : false // true to sync the data
    });
    dataProviderController.addDataSource(androidPhoneGpsDataSource);
    dataProviderController.addDataSource(androidPhoneOrientationDataSource);
    dataProviderController.addDataSource(androidPhoneVideoDataSource);
    dataProviderController.addDataSource(weatherDataSource);

    // registers the view into the data provider
    dataProviderController.registerObserver(mapView);
    dataProviderController.registerObserver(windSpeedChartView);
    dataProviderController.registerObserver(videoView);

    var dataSenderController = new OSH.DataSender.DataSenderController({});

    // adds datasources to dataSenderController
    dataSenderController.addDataSource(taskingVideoDataSource);

    // registers the view into the data provider
    taskingView.register(dataSenderController);

    // adds controller to interact between views
    var controller = new OSH.Controller();
    controller.addView(mapView);
    controller.addView(windSpeedChartView);
    controller.addView(videoView);

    // adds entities to controller
    controller.addEntity(androidEntity);

    // starts streaming
    dataProviderController.connectAll();
}