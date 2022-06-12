!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2)}([function(e,t,s){e.exports=function(){return new Worker(s.p+"WorkerName.45e771fcbcb3f6fece0d.js")}},function(e,t,s){e.exports=function(){return new Worker(s.p+"WorkerName.74db793c118777ce5dc3.js")}},function(e,t,s){"use strict";s.r(t);const i=document.getElementById("datasource-gps"),r=document.getElementById("datasource-orientation"),n=document.getElementById("datasource-video"),a=document.getElementById("error"),o=document.getElementById("last-gps"),c=document.getElementById("last-orient"),p=document.getElementById("last-video"),u=document.getElementById("current-time");let d=0;const h="data",m="time";Math.pow(2,53);function l(e){return null!=e}function g(e,t="letiable"){if(!l(e))throw t+" must be defined";return e}function y(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}var S=class{constructor(e,t){this.id="DataSource-"+y(),this.name=e,this.properties=t,this.currentRunningProperties={},this.eventSubscriptionMap={},this.initialized=!1,this.init=void 0,this.messagesMap={}}getId(){return this.id}getName(){return this.name}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return"datasource-data-"+this.id}getVersion(){return 0}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async createWorker(e){}async updateProperties(e){return this.currentRunningProperties={...this.properties,...e},new Promise(t=>{this.postMessage({message:"update-url",data:e},t)})}async connect(){await this.checkInit(),await this.doConnect()}async initDataSource(){return new Promise(async e=>{this.dataSourceWorker=await this.createWorker(this.properties),this.handleWorkerMessage(),this.postMessage({message:"init",id:this.id,properties:this.properties,topic:this.getTopicId()},async t=>{new BroadcastChannel(this.getTopicId()).onmessage=async e=>{this.handleMessage(e)},this.initialized=t,e()})})}async handleMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async checkInit(){return new Promise(async(e,t)=>{l(this.init)||(this.init=this.initDataSource()),await this.init,e()})}async doConnect(){return new Promise(async e=>{this.postMessage({message:"connect"},e)})}async isConnected(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"is-connected"},e)})}async disconnect(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"disconnect"},e)})}postMessage(e,t){const s=y();this.dataSourceWorker.postMessage({...e,messageId:s}),l(t)&&(this.messagesMap[s]=t)}handleWorkerMessage(){this.dataSourceWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}async onDisconnect(){}reset(){}};var f=class extends S{constructor(e,t){super(e,t),g(t,"Some properties must be defined"),g(t.startTime,"startTime must must be defined"),g(t.endTime,"startTime must must be defined"),this.timeSync=null}getTimeTopicId(){return"datasource-time-"+this.id}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getMinTime(){return this.properties.minTime}getMaxTime(){return this.properties.maxTime}getReplaySpeed(){return l(this.currentRunningProperties)&&l(this.currentRunningProperties.replaySpeed)?this.currentRunningProperties.replaySpeed:l(this.properties.replaySpeed)?this.properties.replaySpeed:1}async setDataSynchronizer(e){return new Promise(async(t,s)=>{await this.checkInit();const i="data-synchronizer-"+e.id;this.timeSync=e,this.postMessage({message:"topic",topic:i,timeTopic:this.getTimeTopicId()},t)})}async initDataSource(e){return await super.initDataSource(e),new Promise(async e=>{this.postMessage({message:"topic",topic:this.getTopicId(),timeTopic:this.getTimeTopicId()},async()=>{new BroadcastChannel(this.getTimeTopicId()).onmessage=async e=>{this.handleTimeMessage(e)},e()})})}async handleTimeMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async setTimeRange(e,t,s,i=!1){let r={};return l(s)&&(r={replaySpeed:s}),this.updateProperties({...this.currentRunningProperties,startTime:e,endTime:t,...r,reconnect:i})}async getCurrentTime(){return l(this.timeSync)?this.timeSync.getCurrentTime():new Promise(e=>{this.postMessage({message:"last-timestamp"},e)})}},w=s(0),T=s.n(w);var b=class extends f{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,tls:!1,...t})}async createWorker(e){return new T.a}},M=s(1),v=s.n(M);var x=class{constructor(e){this.bufferingTime=1e3,this.currentTime=Date.now(),this.id=y(),this.dataSources=e.dataSources||[],this.replaySpeed=e.replaySpeed||1,this.timerResolution=e.timerResolution||5,this.initialized=!1,this.properties={},this.properties.replaySpeed=this.replaySpeed,this.eventSubscriptionMap={},this.messagesMap={}}getTopicId(){return"data-synchronizer-"+this.id}getTimeTopicId(){return"data-synchronizer-time-"+this.id}initEventSubscription(){new BroadcastChannel(this.getTopicId()).onmessage=e=>{const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)},new BroadcastChannel(this.getTimeTopicId()).onmessage=e=>{const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}}getStartTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].currentRunningProperties.startTime}getEndTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].currentRunningProperties.endTime}getMinTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return l(this.dataSources[0].properties.minTime)?this.dataSources[0].properties.minTime:this.dataSources[0].properties.startTime}getMaxTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return l(this.dataSources[0].properties.maxTime)?this.dataSources[0].properties.maxTime:this.dataSources[0].properties.endTime}getReplaySpeed(){return this.replaySpeed}terminate(){null!==this.synchronizerWorker&&(this.synchronizerWorker.terminate(),this.synchronizerWorker=null);for(let e of this.dataSources)e.terminate()}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async initDataSources(){return new Promise(async(e,t)=>{try{const t=[];for(let e of this.dataSources){const s=await this.createDataSourceForWorker(e);t.push(s)}this.synchronizerWorker=new v.a,this.handleWorkerMessage(),await this.postMessage({message:"init",dataSources:t,replaySpeed:this.replaySpeed,timerResolution:this.timerResolution,dataTopic:this.getTopicId(),timeTopic:this.getTimeTopicId()},function(){this.initEventSubscription(),this.initialized=!0,e()}.bind(this),!1)}catch(e){console.log(e),t(e)}})}async createDataSourceForWorker(e){const t={bufferingTime:e.properties.bufferingTime||0,timeOut:e.properties.timeOut||0,id:e.id,name:e.name};try{await e.setDataSynchronizer(this),e.properties.replaySpeed=this.replaySpeed}catch(e){throw console.error("Cannot set the synchronizer to this DataSource",e),e}return t}async addDataSource(e){return new Promise(async t=>{const s=await this.createDataSourceForWorker(e);this.dataSources.push(e),await this.postMessage({message:"add",dataSources:[s]},t)})}async push(e,t){return new Promise(async(s,i)=>{null!==this.synchronizerWorker&&await this.postMessage({type:"data",dataSourceId:e,data:t},s)})}async connect(){await this.checkInit(),await this.doConnect()}async checkInit(){const e=this;return new Promise(async(t,s)=>{l(e.init)||(e.init=e.initDataSources()),await e.init,t()})}async doConnect(){for(let e of this.dataSources)await e.connect()}async disconnect(){await this.reset();for(let e of this.dataSources)await e.disconnect()}async setReplaySpeed(e){return new Promise(async t=>{this.replaySpeed=e,this.properties.replaySpeed=e,await this.postMessage({message:"replay-speed",replaySpeed:e},t)})}async setTimeRange(e,t,s,i=!1){this.replaySpeed!==s&&await this.setReplaySpeed(s),await this.reset();for(let r of this.dataSources)r.setTimeRange(e,t,s,i)}async reset(){return new Promise(async e=>{await this.checkInit(),await this.postMessage({message:"reset"},e)})}async getCurrentTime(){return new Promise(async e=>{await this.postMessage({message:"current-time"},e)})}async isConnected(){for(let e of this.dataSources)if(!await e.isConnected())return!1;return!0}async postMessage(e,t,s=!0){s&&await this.checkInit();const i=y();this.synchronizerWorker.postMessage({...e,messageId:i}),l(t)&&(this.messagesMap[i]=t)}handleWorkerMessage(){this.synchronizerWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}};const I="2015-12-19T21:04:29.231Z",P="2015-12-19T21:09:19.675Z",k=new b("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:I,endTime:P,replaySpeed:1,bufferingTime:800,timeOut:1e3}),O=new b("android-GPS",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:nav2",observedProperty:"http://www.opengis.net/def/property/OGC/0/PlatformLocation",startTime:I,endTime:P,replaySpeed:1,bufferingTime:800,responseFormat:"application/json",timeOut:1e3}),D=new b("android-Heading",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:nav2",observedProperty:"http://www.opengis.net/def/property/OGC/0/PlatformOrientation",startTime:I,endTime:P,replaySpeed:1,bufferingTime:800,timeOut:1e3}),W=new x({replaySpeed:1,timerResolution:5,dataSources:[k,O,D]});W.connect(),k.subscribe(e=>function(e){let t;for(let s=0;s<e.length;s++)t=e[s],t.data.videoFrame.data=e[s].data.videoFrame.data.slice(0,10),n.value=JSON.stringify([t])+"\n";p.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Video",u.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Current"}(e.values),[h]),O.subscribe(e=>{return t=e.values,i.value=JSON.stringify(t),o.innerText=new Date(t[t.length-1].data.timestamp).toISOString()+" - Location",void(u.innerText=new Date(t[t.length-1].data.timestamp).toISOString()+" - Current");var t},[h]),D.subscribe(e=>{return t=e.values,r.value=JSON.stringify(t)+"\n",c.innerText=new Date(t[t.length-1].data.timestamp).toISOString()+" - Orientation",void(u.innerText=new Date(t[t.length-1].data.timestamp).toISOString()+" - Current");var t},[h]),W.subscribe(e=>{return(t=e.timestamp)<d&&(a.value=new Date(t).toISOString()+" < "+new Date(d).toISOString()+"\n"),void(d=t);var t},[m]),W.connect()}]);