(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["details"],{"1dde":function(t,i,e){var a=e("d039"),n=e("b622"),s=e("2d00"),o=n("species");t.exports=function(t){return s>=51||!a((function(){var i=[],e=i.constructor={};return e[o]=function(){return{foo:1}},1!==i[t](Boolean).foo}))}},"56b8":function(t,i,e){},8418:function(t,i,e){"use strict";var a=e("c04e"),n=e("9bf2"),s=e("5c6c");t.exports=function(t,i,e){var o=a(i);o in t?n.f(t,o,s(0,e)):t[o]=e}},"95cd":function(t,i,e){t.exports=e.p+"img/loader.3ff50595.gif"},9670:function(t,i,e){"use strict";e("56b8")},"9f52":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"details"},[a("div",{staticClass:"details__back"},[a("Button",{attrs:{name:"Go Back"},nativeOn:{click:function(i){return t.back(i)}}},[a("chevron-left-icon")],1)],1),a("div",{staticClass:"details__results"},[a("h1",{domProps:{textContent:t._s(t.txt.title)}}),t.loading||t.isOffline?a("div",{staticClass:"info"},[a("div",{class:t.loading?"loading":"hidden"},[a("img",{attrs:{src:e("95cd")}})]),a("div",{class:t.isOffline?"offline":"hidden"},[a("wifi-off-icon",{attrs:{size:"70"}})],1)]):t._e(),t.loading||0!==t.bookingDetails.length?t._e():a("div",{staticClass:"md:w-48 w-full"},[a("Button",{attrs:{name:"Try again"},nativeOn:{click:function(i){return t.getData(this.detailsData[0])}}},[a("refresh-icon")],1)],1),a("span",{staticClass:"details__results__filter-title"},[a("i",[t._v("Station:")]),t._v(" "+t._s(t.stationName)+" | "),a("i",[t._v("Date Range:")]),t._v(" "+t._s(t.startDate)+" / "+t._s(t.endDate)+" ")]),a("ul",{staticClass:"details__results__list"},t._l(t.bookingDetails,(function(i,e){return a("li",{key:e},[i.bookings[t.filterStationName()].startDate.slice(0,10)>=t.startDate&&i.bookings[t.filterStationName()].endDate.slice(0,10)<=t.endDate?[a("tent-icon"),a("div",[a("i",[t._v(t._s(t.txt.customerName))]),t._v(" "+t._s(i.bookings[t.filterStationName()].customerName))]),a("div",[a("i",[t._v(t._s(t.txt.startDate))]),t._v(" "+t._s(i.bookings[t.filterStationName()].startDate.slice(0,10))+" ")]),a("div",[a("i",[t._v(t._s(t.txt.endDate)+" ")]),t._v(t._s(i.bookings[t.filterStationName()].endDate.slice(0,10))+" ")])]:0===e?[t._v(t._s(t.txt.noResults)+" ")]:t._e()],2)})),0)])])},n=[],s=(e("fb6a"),e("d3b7"),e("2a7d")),o={name:"Details",components:{Button:s["a"]},data:function(){return{txt:{title:"Booking Details",customerName:"Customer Name: ",startDate:"Start Date: ",endDate:"End Date: ",noResults:"No results for the searched criteria, go back and search again."},loading:!0,isOffline:!1,fetchingError:!1,stationName:this.detailsData[0],startDate:this.detailsData[1],endDate:this.detailsData[2],bookingDetails:[]}},mounted:function(){this.getData()},props:{detailsData:Array},methods:{back:function(){this.$router.push("/")},filterStationName:function(){return this.stationName.slice(-1)-1},checkConnection:function(){var t=this;navigator.onLine?this.isOffline=!1:(this.isOffline=!0,setTimeout((function(){return t.isOffline=!1}),3e3))},getData:function(){var t=this,i="https://605c94c36d85de00170da8b4.mockapi.io/stations/",e=this;this.checkConnection(),this.isOffline||0!==this.bookingDetails.length||e.error||e.axios.get(i).then((function(t){if(!t.data||0==t.data.length){var i=new Error("Invalid data");throw i.statusCode=500,i}e.bookingDetails=t.data&&t.data.length?t.data:[]})).catch((function(t){e.error=!!t,console.log("Error getting data "+t)})).finally((function(){return t.loading=!1}))}}},r=o,c=(e("9670"),e("2877")),l=Object(c["a"])(r,a,n,!1,null,"bd253fb6",null);i["default"]=l.exports},e8b5:function(t,i,e){var a=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==a(t)}},fb6a:function(t,i,e){"use strict";var a=e("23e7"),n=e("861d"),s=e("e8b5"),o=e("23cb"),r=e("50c4"),c=e("fc6a"),l=e("8418"),f=e("b622"),d=e("1dde"),u=d("slice"),v=f("species"),h=[].slice,g=Math.max;a({target:"Array",proto:!0,forced:!u},{slice:function(t,i){var e,a,f,d=c(this),u=r(d.length),_=o(t,u),b=o(void 0===i?u:i,u);if(s(d)&&(e=d.constructor,"function"!=typeof e||e!==Array&&!s(e.prototype)?n(e)&&(e=e[v],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return h.call(d,_,b);for(a=new(void 0===e?Array:e)(g(b-_,0)),f=0;_<b;_++,f++)_ in d&&l(a,f,d[_]);return a.length=f,a}})}}]);
//# sourceMappingURL=details.1a43574f.js.map