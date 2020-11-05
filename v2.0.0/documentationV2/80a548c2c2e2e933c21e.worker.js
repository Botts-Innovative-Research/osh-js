!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/osh-js/v2.0.0/documentationV2/",n(n.s=2)}([function(t,e,n){t.exports=n(1)},function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function a(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(U){a=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),s=new E(r||[]);return i._invoke=function(t,e,n){var r=l;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===d){if("throw"===o)throw i;return M()}for(n.method=o,n.arg=i;;){var s=n.delegate;if(s){var c=O(s,n);if(c){if(c===m)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var a=h(t,e,n);if("normal"===a.type){if(r=n.done?d:f,a.arg===m)continue;return{value:a.arg,done:n.done}}"throw"===a.type&&(r=d,n.method="throw",n.arg=a.arg)}}}(t,n,s),i}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(U){return{type:"throw",arg:U}}}t.wrap=u;var l="suspendedStart",f="suspendedYield",p="executing",d="completed",m={};function v(){}function y(){}function g(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,S=w&&w(w(j([])));S&&S!==n&&r.call(S,i)&&(b=S);var T=g.prototype=v.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){function n(o,i,s,c){var a=h(t[o],t,i);if("throw"!==a.type){var u=a.arg,l=u.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,s,c)}),(function(t){n("throw",t,s,c)})):e.resolve(l).then((function(t){u.value=t,s(u)}),(function(t){return n("throw",t,s,c)}))}c(a.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function O(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,O(t,n),"throw"===n.method))return m;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=h(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,m;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,m):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function R(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(R,this),this.reset(!0)}function j(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,s=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return s.next=s}}return{next:M}}function M(){return{value:e,done:!0}}return y.prototype=T.constructor=g,g.constructor=y,y.displayName=a(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,a(t,c,"GeneratorFunction")),t.prototype=Object.create(T),t},t.awrap=function(t){return{__await:t}},x(C.prototype),C.prototype[s]=function(){return this},t.AsyncIterator=C,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var s=new C(u(e,n,r,o),i);return t.isGeneratorFunction(n)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},x(T),a(T,c,"Generator"),T[i]=function(){return this},T.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=j,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],c=s.completion;if("root"===s.tryLoc)return o("end");if(s.tryLoc<=this.prev){var a=r.call(s,"catchLoc"),u=r.call(s,"finallyLoc");if(a&&u){if(this.prev<s.catchLoc)return o(s.catchLoc,!0);if(this.prev<s.finallyLoc)return o(s.finallyLoc)}else if(a){if(this.prev<s.catchLoc)return o(s.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return o(s.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:j(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=r}catch(o){Function("r","regeneratorRuntime = r")(r)}},function(t,e,n){"use strict";function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}n.r(e);Math.pow(2,53);function o(t){return null!=t}function i(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}var s=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.parseTimeStamp=function(t){var e=String.fromCharCode.apply(null,new Uint8Array(t));return new Date(JSON.parse(e).time).getTime()},n.parseData=function(t){var e=JSON.parse(String.fromCharCode.apply(null,new Uint8Array(t))),n={};for(var r in e)"time"!==r&&(n[r]=e[r]);return n},n.buildUrl=function(e){return t.prototype.buildUrl.call(this,Object.assign({},e,{responseFormat:"application/json"}))},e}(function(){function t(){}return t.prototype.buildUrl=function(t){var e="";e+=t.protocol+"://",e+=t.endpointUrl+"?",e+="service="+t.service+"&",e+="version=2.0&",e+="request=GetResult&",e+="offering="+t.offeringID+"&",t.foiURN&&""!==t.foiURN&&(e+="featureOfInterest="+t.foiURN+"&"),e+="observedProperty="+t.observedProperty+"&";var n=o(t.lastTimeStamp)?t.lastTimeStamp:t.startTime;if(this.lastStartTime=t.startTime,e+="temporalFilter=phenomenonTime,"+n+"/"+t.endTime+"&",t.replaySpeed&&(e+="replaySpeed="+t.replaySpeed),t.responseFormat&&(e+="&responseFormat="+t.responseFormat),o(t.customUrlParams)&&Object.keys(t.customUrlParams).length>0){for(var r in e+="&",t.customUrlParams)e+=r+"="+t.customUrlParams[r]+"&";e.endsWith("&")&&(e=e.slice(0,-1))}return e},t}()),c=n(0),a=n.n(c);function u(t,e,n,r,o,i,s){try{var c=t[i](s),a=c.value}catch(u){return void n(u)}c.done?e(a):Promise.resolve(a).then(r,o)}var h="connected",l="disconnected",f=function(){function t(t){this.url=t,this.id="DataConnector-"+i(),this.reconnectTimeout=12e4,this.status=l,this.reconnectionInterval=-1}var e=t.prototype;return e.checkAndClearReconnection=function(){-1!==this.reconnectionInterval&&(clearInterval(this.reconnectionInterval),this.reconnectionInterval=-1)},e.disconnect=function(){this.checkStatus(l),this.checkAndClearReconnection()},e.setUrl=function(t){this.url=t},e.getId=function(){return this.id},e.getUrl=function(){return this.url},e.setReconnectTimeout=function(t){this.reconnectTimeout=t},e.onReconnect=function(){return!0},e.connect=function(){},e.forceReconnect=function(){this.disconnect(),this.connect()},e.onChangeStatus=function(t){},e.checkStatus=function(t){t!==this.status&&(this.onChangeStatus(t),this.status=t)},e.onDisconnect=function(){},e.onConnect=function(){},t}(),p=function(t){function e(e){var n;return(n=t.call(this,e)||this).interval=-1,n.lastReceiveTime=0,n}r(e,t);var n=e.prototype;return n.connect=function(){var t,e=(t=a.a.mark((function t(){var e=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.init||(this.closed=!1,this.init=!0,this.ws=new WebSocket(this.getUrl()),this.ws.binaryType="arraybuffer",this.ws.onmessage=function(t){this.checkAndClearReconnection(),this.checkStatus(h),this.lastReceiveTime=Date.now(),t.data.byteLength>0&&this.onMessage(t.data)}.bind(this),this.ws.onerror=function(t){console.error("WebSocket stream error"),this.checkStatus(l),this.init=!1,this.lastReceiveTime=-1,this.createReconnection()}.bind(this),this.ws.onclose=function(t){e.checkStatus(l),console.warn("WebSocket stream closed: ",t.reason,t.code),e.init=!1,1e3===t.code||e.closed||e.createReconnection()});case 1:case"end":return t.stop()}}),t,this)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function s(t){u(i,r,o,s,c,"next",t)}function c(t){u(i,r,o,s,c,"throw",t)}s(void 0)}))});return function(){return e.apply(this,arguments)}}(),n.createReconnection=function(){-1===this.reconnectionInterval&&(this.onReconnect(),this.reconnectionInterval=setInterval(function(){var t=Date.now()-this.lastReceiveTime;(-1===this.lastReceiveTime||t>=this.reconnectTimeout)&&(console.warn("trying to reconnect",this.url),this.connect())}.bind(this),this.reconnectTimeout))},n.disconnect=function(){t.prototype.disconnect.call(this),this.init=!1,this.closed=!0,null!=this.ws&&this.ws.readyState!==WebSocket.CLOSED&&this.ws.close()},n.onMessage=function(t){},n.isConnected=function(){return null!=this.ws&&this.ws.readyState===WebSocket.OPEN},e}(f),d=function(t){function e(e,n){var r;return(r=t.call(this,e)||this).method="POST",r.responseType="arraybuffer",o(n)&&(n.method&&(r.method=n.method),n.responseType&&(r.responseType=n.responseType)),r}r(e,t);var n=e.prototype;return n.sendRequest=function(t,e){var n=this,r=new XMLHttpRequest;r.withCredentials=!0,r.timeout=6e4,null===t?(o(e)?r.open("GET",this.getUrl()+"?"+e,!0):r.open("GET",this.getUrl(),!0),r.responseType=this.responseType,r.onload=function(t){r.response&&n.onMessage(r.response)},r.ontimeout=function(t){console.log("Timeout")},r.send(null)):(r.open("POST",this.getUrl(),!0),r.setRequestHeader("Content-Type","text/xml"),r.send(t),r.onreadystatechange=function(){r.readyState<4||4===r.readyState&&(200===r.status&&r.status<300?n.onSuccess(r.responseText):n.onError(""))})},n.onError=function(t){},n.onSuccess=function(t){},n.connect=function(){this.sendRequest(null)},e}(f),m=function(t){function e(e){var n;return(n=t.call(this,e)||this).lastReceiveTime=-1,n.interval=-1,n.broadcastChannel=null,n}r(e,t);var n=e.prototype;return n.connect=function(){var t=this;null===this.broadcastChannel&&(this.broadcastChannel=new BroadcastChannel(this.getUrl()),this.broadcastChannel.onmessage=function(e){t.lastReceiveTime=Date.now(),t.onMessage(e.data.data)},this.broadcastChannel.onerror=function(e){console.error("BroadcastChannel stream error: "+e),t.broadcastChannel.close(),t.init=!1,t.lastReceiveTime=-1},-1===this.interval&&(this.interval=setInterval(function(){var t=Date.now()-this.lastReceiveTime;(-1===this.lastReceiveTime||t>=this.reconnectTimeout)&&(console.warn("trying to reconnect after "+this.reconnectTimeout+" .."),this.reconnect())}.bind(this),this.reconnectTimeout)))},n.disconnect=function(){this.fullDisconnect(!0)},n.fullDisconnect=function(t){null!=this.broadcastChannel&&(this.broadcastChannel.close(),this.broadcastChannel=null),t&&clearInterval(this.interval)},n.reconnect=function(){this.onReconnect(),this.init&&this.fullDisconnect(!1),this.connect()},n.onMessage=function(t){},n.close=function(){this.disconnect()},e}(f),v="data",y="status";const g=new(function(){function t(t){this.parser=t,this.connector=null,this.lastTimeStamp=null,this.lastStartTime="now",this.timeShift=0,this.reconnectTimeout=1e4,this.values=[]}var e=t.prototype;return e.createConnector=function(t,e,n){this.dataSourceId=n,null!==this.connector&&(this.connector.disconnect(),this.connector=null),this.broadcastChannel=new BroadcastChannel(e);var r=JSON.parse(t);o(r.fetch)&&(this.fetch=r.fetch),o(r.timeShift)&&(this.timeShift=r.timeShift),o(r.bufferingTime)&&(this.bufferingTime=r.bufferingTime),o(r.timeOut)&&(this.timeOut=r.timeOut),o(r.reconnectTimeout)&&(this.reconnectTimeout=r.reconnectTimeout),"now"===r.startTime?this.batchSize=1:(o(r.replaySpeed)&&(o(r.batchSize)||(this.batchSize=1)),o(r.batchSize)&&(this.batchSize=r.batchSize)),this.properties=r,this.createDataConnector(this.properties)},e.createDataConnector=function(t){var e=this,n=this.parser.buildUrl(Object.assign({},t,{timeShift:this.timeShift}));t.protocol.startsWith("ws")?(this.connector=new p(n),this.connector.onMessage=this.onMessage.bind(this),this.connector.setReconnectTimeout(this.reconnectTimeout)):t.protocol.startsWith("http")?(this.connector=new d(n),this.connector.responseType="arraybuffer",this.connector.onMessage=this.onMessage.bind(this),this.connector.setReconnectTimeout(this.reconnectTimeout)):t.protocol.startsWith("topic")&&(this.connector=new m(n),this.connector.onMessage=this.onMessage.bind(this),this.connector.setReconnectTimeout(this.reconnectTimeout));var r=this.parser.lastStartTime;null!==this.connector&&(this.connector.onChangeStatus=this.onChangeStatus.bind(this),this.connector.onReconnect=function(){return"now"!==r&&e.connector.setUrl(e.parser.buildUrl(Object.assign({},t,{lastTimeStamp:new Date(e.lastTimeStamp).toISOString()}))),!0})},e.setTopic=function(t){null!==this.broadcastChannel&&this.broadcastChannel.close(),this.broadcastChannel=new BroadcastChannel(t),this.topic=t},e.connect=function(){null!==this.connector&&this.connector.connect()},e.disconnect=function(){null!==this.connector&&this.connector.disconnect(),this.connector=null},e.onMessage=function(t){var e=this.parser.parseTimeStamp(t)+this.timeShift,n=this.parser.parseData(t);this.values.push({data:n,timeStamp:e}),this.lastTimeStamp=e,o(this.batchSize)&&this.values.length>=this.batchSize&&this.flush()},e.onChangeStatus=function(t){t===l&&this.flush(),this.broadcastChannel.postMessage({type:y,status:t,dataSourceId:this.dataSourceId})},e.getLastTimeStamp=function(){return this.lastTimeStamp},e.updateUrl=function(t){this.disconnect();var e=new Date(this.lastTimeStamp).toISOString();t.hasOwnProperty("startTime")?e=t.startTime:"now"===this.properties.startTime&&(e="now"),this.createDataConnector(Object.assign({},this.properties,t,{lastTimeStamp:e})),this.connect()},e.flush=function(){this.broadcastChannel.postMessage({dataSourceId:this.dataSourceId,type:v,values:this.values.splice(0,this.values.length)})},e.handleMessage=function(t,e){if("init"===t.message)this.createConnector(t.properties,t.topic,t.id);else if("connect"===t.message)this.connect();else if("disconnect"===t.message)this.disconnect();else if("topic"===t.message)this.setTopic(t.topic);else if("last-timestamp"===t.message){var n=this.getLastTimeStamp();e.postMessage({message:"last-timestamp",data:n})}else"update-url"===t.message?this.updateUrl(t.data):"is-connected"===t.message&&e.postMessage({message:"is-connected",data:null!==this.connector&&this.connector.isConnected()})},t}())(new s);self.onmessage=t=>{g.handleMessage(t.data,self)}}]);