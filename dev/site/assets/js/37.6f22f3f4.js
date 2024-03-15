(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{313:function(e,t,a){"use strict";a.r(t);var o=a(0),i=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"datasynchronizer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#datasynchronizer"}},[e._v("#")]),e._v(" DataSynchronizer")]),e._v(" "),t("p",[e._v("The main role of the DataSynchronizer is to synchronize multiple data sources based on timestamps.")]),e._v(" "),t("p",[e._v("It supports optional "),t("em",[e._v("buffering")]),e._v(" (adds latency but sometimes needed, e.g. video) to smooth out the data rate and send events at beginning and end of buffering so UI can display progress.")]),e._v(" "),t("p",[e._v("It supports "),t("em",[e._v("timeout")]),e._v(" if a data source hangs or its latency increases beyond a certain threshold (timeout means we don’t try to sync this data source anymore because it slows down everything else too much and flag data records that are passed the timeout so that views can indicate that the data source is out of sync).")]),e._v(" "),t("p",[e._v("Finally, it is possible to have multiple dataSynchronizer in the same application, each dataSynchronizer would handle a different group of data sources that we want to synchronize together.")]),e._v(" "),t("h2",{attrs:{id:"recall-the-principle-of-the-main-algorithm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#recall-the-principle-of-the-main-algorithm"}},[e._v("#")]),e._v(" Recall the principle of the main algorithm:")]),e._v(" "),t("ul",[t("li",[e._v("Data records from each DS are received in a separate queue (records are added at the end of the queue)")]),e._v(" "),t("li",[e._v("The DataSynchronizer loop is run with a setInterval() at a frequency that can be adjusted between 5 and 1000ms")]),e._v(" "),t("li",[e._v("The reference time stamp (TSref) is the timestamp of the first data received from any DS.")]),e._v(" "),t("li",[e._v("The reference clock time is computed with performance.now() when the first data is outputted by the synchronizer (i.e. at the end of the initial buffering period).")]),e._v(" "),t("li",[e._v("In each synchronizer loop, we loop through each DS and evaluate the oldest record received from it (i.e. the record at the front of the queue, if any):")]),e._v(" "),t("li",[e._v("We compare the 𝜟TS of this oldest record (diff between the DS record timestamp and TSref) to the 𝜟clock (diff between current performance.now() and the reference clock time). If 𝜟clock > 𝜟TS, the head of this DS queue can be dispatched")]),e._v(" "),t("li",[e._v("Continue evaluating the next record from this DS until the condition above returns false")])]),e._v(" "),t("p",[e._v("In addition to the above existing algorithm, the idea is to also do the following:")]),e._v(" "),t("ul",[t("li",[e._v("Always compute the timestamp of the latest synchronizer loop TSrun = TSref + 𝜟clock")]),e._v(" "),t("li",[e._v("When we receive a new record from a DS with timestamp TSrec, we compute its latency = min(TSrun - TSrec , DS_timeout) (this is computed when the data is received, not in the main loop, and stored as a variable of the queue object associated with each DS)")]),e._v(" "),t("li",[e._v("We regularly compute the maximum latency of all DS and compute 𝜟clock_adj  = 𝜟clock - max_latency")]),e._v(" "),t("li",[e._v("We use 𝜟clock_adj instead of 𝜟clock in the comparison with 𝜟TS in the main loop")]),e._v(" "),t("li",[e._v("If needed, in order to avoid abrupt changes, we can also smoothout the change of 𝜟clock_adj over time (e.g. over 10 loops)")]),e._v(" "),t("li",[e._v("In addition, when 𝜟clock_adj - 𝜟TS > threshold we flag the data to indicate that it was received very late and may be processed out of order")])])])}),[],!1,null,null,null);t.default=i.exports}}]);