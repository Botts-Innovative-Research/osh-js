!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){e.exports=function(){return new Worker(r.p+"WorkerName.98536b90e712a88fb57d.js")}},function(e,t,r){"use strict";r.r(t);Math.pow(2,53);function n(e){return null!=e}function s(e,t="letiable"){if(!n(e))throw t+" must be defined";return e}function i(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}const o="disconnected";var a=class{constructor(e,t,r){this.id="DataSource-"+i(),this.name=e,this.properties=t,this.dataSourceWorker=r,this.currentRunningProperties={},this.initDataSource(t)}initDataSource(e){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(e),topic:this.getTopicId()})}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}onDisconnect(){return new Promise(e=>{new BroadcastChannel(this.getTopicId()).onmessage=t=>{t.data.status===o&&e()}})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"is-connected"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),e}getId(){return this.id}getName(){return this.name}updateProperties(e){this.currentRunningProperties={...this.properties,...e},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:e})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return"datasource-data-"+this.id}};var u=class extends a{constructor(e,t,r){super(e,t,r),s(t,"Some properties must be defined"),s(t.startTime,"startTime must must be defined"),s(t.endTime,"startTime must must be defined"),this.dataSynchronizer=null}setDataSynchronizer(e){this.dataSynchronizer=e,this.dataSourceWorker.postMessage({message:"topic",topic:"data-synchronizer-"+this.dataSynchronizer.id,timeTopic:this.getTimeTopicId()})}initDataSource(e){super.initDataSource(e),this.dataSourceWorker.postMessage({message:"topic",topic:this.getTopicId(),timeTopic:this.getTimeTopicId()})}setTimeRange(e,t,r,s=!1){let i={};n(r)&&(i={replaySpeed:r}),this.updateProperties({...this.currentRunningProperties,startTime:e,endTime:t,...i,reconnect:s})}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getMinTime(){return this.properties.minTime}getMaxTime(){return this.properties.maxTime}getReplaySpeed(){return n(this.properties.replaySpeed)?this.properties.replaySpeed:1}async getCurrentTime(){if(n(this.dataSynchronizer))return this.dataSynchronizer.getCurrentTime();{const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"last-timestamp"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"last-timestamp"}),e}}updateProperties(e){super.updateProperties(e)}getTimeTopicId(){return"datasource-time-"+this.id}},c=r(0),d=r.n(c);const p=new class extends u{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,...t},new d.a)}}("android-GPS",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:nav2",observedProperty:"http://www.opengis.net/def/property/OGC/0/PlatformLocation",startTime:"2015-12-19T21:04:29.231Z",endTime:"2015-12-19T21:09:19.675Z",replaySpeed:1}),m=new BroadcastChannel("datasource-data-"+p.id),l=document.getElementById("datasource-gps");m.onmessage=e=>{"data"===e.data.type&&(l.value+=JSON.stringify(e.data.values)+"\n")};document.getElementById("run-datasource-button").onclick=()=>p.connect()}]);