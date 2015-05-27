/**
 * Created by turbo on 15-5-21.
 */
weatherApp.directive("appMap", function ($window) {
	return {
		restrict: "E",
		replace: true,
		template: "<div id='weatherMap'>地图加载中...</div>",
		scope: {
			center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
			markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
			width: "@",         // Map width in pixels.
			height: "@",        // Map height in pixels.
			zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
			mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
			panControl: "@",    // Whether to show a pan control on the map.
			zoomControl: "@",   // Whether to show a zoom control on the map.
			scaleControl: "@"   // Whether to show scale control on the map.
		},
		link: function (scope, element, attrs) {
			var mapUrl = 'http://webapi.amap.com/maps?v=1.3&key=e261b69773e202c0ba74629344ba419e&callback=init';
			element[0].style.height = ($window.screen.height-50)+'px';
			$LAB.script(mapUrl).wait(function() {
				//初始化地图对象
				var map = new AMap.Map('weatherMap', {
					resizeEnable: true,
					zooms: [5, 18]
				});
				map.setZoom(5);
				map.plugin(['AMap.ToolBar'], function() {
					map.addControl(new AMap.ToolBar());
				});
			});

		}
	};
});

/*https://github.com/vczero/OurTimes/blob/master/client-web/lib/controllers/contacts/map.js
 http://www.it165.net/pro/html/201503/36888.html
 http://segmentfault.com/q/1010000002484757
 http://vczero.github.io/tuban/main.html#/contacts
* */