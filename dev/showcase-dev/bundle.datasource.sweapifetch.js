!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){e.exports=function(){return new Worker(s.p+"WorkerName.b6ba8269f88f75c09772.js")}},function(e,t,s){"use strict";s.r(t);Math.pow(2,53);function i(e){return null!=e}function n(e,t="letiable"){if(!i(e))throw t+" must be defined";return e}function r(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}var a=s(0),o=s.n(a);const c="realTime";var p=class{constructor(e,t){this.id="DataSource-"+r(),this.name=e,this.properties=t,this.eventSubscriptionMap={},this.init=void 0,this.messagesMap={},this.mode=c,i(t.mode)&&(this.mode=t.mode)}getId(){return this.id}getName(){return this.name}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return"datasource-data-"+this.id}getVersion(){return 0}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async createWorker(e){return new o.a}async updateProperties(e){return this.properties={...this.properties,...e},new Promise(t=>{this.postMessage({message:"update-properties",data:e},t)})}async connect(){await this.checkInit(),await this.doConnect()}async initDataSource(){return new Promise(async(e,t)=>{this.dataSourceWorker=await this.createWorker(this.properties),this.handleWorkerMessage(),this.postMessage({message:"init",id:this.id,properties:this.properties,topics:{data:this.getTopicId()}},async t=>{new BroadcastChannel(this.getTopicId()).onmessage=async e=>{await this.handleMessage(e)},e(t)})})}async handleMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async checkInit(){return new Promise(async(e,t)=>{i(this.init)||(this.init=this.initDataSource()),await this.init,e()})}async doConnect(){return new Promise(async e=>{this.postMessage({message:"connect"},e)})}async isConnected(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"is-connected"},e)})}async disconnect(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"disconnect"},e)})}postMessage(e,t){const s=r();this.dataSourceWorker.postMessage({...e,messageId:s}),i(t)&&(this.messagesMap[s]=t)}handleWorkerMessage(){this.dataSourceWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}async onDisconnect(){}reset(){}};var d=class extends p{constructor(e,t){super(e,t),n(t,"Some properties must be defined"),this.dataSynchronizer=void 0}getTimeTopicId(){return"datasource-time-"+this.id}getStartTime(){return this.properties.startTime}getMode(){return this.properties.mode}getEndTime(){return this.properties.endTime}getMinTime(){return this.properties.minTime}getMaxTime(){return this.properties.maxTime}setMinTime(e){this.properties.minTime=e}setMaxTime(e){this.properties.maxTime=e}getReplaySpeed(){return this.properties.replaySpeed}setReplaySpeed(e){this.properties.replaySpeed=e}async setDataSynchronizer(e){return new Promise(async(t,s)=>{await this.checkInit();const i="data-synchronizer-"+e.id;this.dataSynchronizer=e,this.postMessage({message:"topics",topics:{data:i,time:this.getTimeTopicId(),sync:e.getTimeTopicId()}},t)})}async disconnect(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"disconnect"},e)})}async doConnect(){return new Promise(async e=>{let t=this.properties.startTime;if(i(this.dataSynchronizer)){let e=(await this.dataSynchronizer.getCurrentTime()).data;i(e)&&(t=new Date(e).toISOString())}this.postMessage({message:"connect",startTime:t},e)})}async initDataSource(e){return await super.initDataSource(e),new Promise(async(e,t)=>{this.postMessage({message:"topics",topics:{data:this.getTopicId(),time:this.getTimeTopicId()}},async()=>{new BroadcastChannel(this.getTimeTopicId()).onmessage=async e=>{await this.handleTimeMessage(e)},e()})})}async handleTimeMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async setTimeRange(e=this.getStartTime(),t=this.getEndTime(),s=this.getReplaySpeed(),i=!1,n=this.getMode()){return this.updateProperties({startTime:e,endTime:t,replaySpeed:s,reconnect:i,mode:n})}};let h=new class extends d{constructor(e,t){super(e,{reconnectTimeout:5e3,reconnectRetry:10,startTime:"now",endTime:"2055-01-01T00:00:00Z",tls:!1,responseFormat:"application/om+json",protocol:"http",type:"SweApiStream",mode:c,prefetchBatchSize:250,prefetchBatchDuration:5e3,connectorOpts:{},...t})}}("android-GPS",{endpointUrl:"api.georobotix.io/ogc/t18/api",resource:"/datastreams/fled6eics1cl4/observations",tls:!0,protocol:"mqtt",mqttOpts:{prefix:"/api",endpointUrl:"api.georobotix.io:443/ogc/t18"},mode:c});h.subscribe(async e=>{let t;for(let s=0;s<e.values.length;s++){t=e.values[s];const i=JSON.stringify(t.data,null,2);document.getElementById("json-container").innerHTML=i}},["data"]),h.connect()}]);