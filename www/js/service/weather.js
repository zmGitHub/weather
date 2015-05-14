/**
 * Created by turbo on 15-5-14.
 */
weatherApp.service('Weather', ['$http', '$q','$window', function($http, $q, $window){
	var _this = this;
	var isOffLine = this.offLine = false;
	/*天气接口key值*/
	var weatherKey = this.weatherKey = '4e2a4a4be57445b2973fa2a367cb8539';
	/*经纬度解析key值*/
	var locationKey = this.locationKey = '74b35fe8a83648cd9735a8638fbfb6cb';


	/*获取当前的地点*/
	this.getGelocation = function(lat, long){
		var defer = $q.defer();
		if(angular.isUndefined(lat)){
			defer.resolve(null);
		}else{
			var url = 'http://api.haoservice.com/api/getLocationinfor?latlng='+lat+','+long+'&type=2&key='+locationKey;
			$http.get(url).success(function (data) {
				if(!data.error_code){
					_this.setLocalStorage('locationInfo', data.result);
				}
				defer.resolve(data.error_code);
			});
		}

		return defer.promise;
	};

	/*获取当前天气信息*/
	this.getWeather = function (){
		var defer = $q.defer();
		var location = _this.getLocalStorage('locationInfo') || undefined;
		if(angular.isUndefined(location)){
			location = '珠晖区';
		}
		var url = 'http://apis.haoservice.com/weather?cityname='+location+'&key='+weatherKey;
		$http.get(url).success(function (data) {
			if(!data.error_code){
				_this.setLocalStorage('weather', data.result);
				defer.resolve(data.result);
			}else {
				defer.resolve(null);
			}
		});
		return defer.promise;
	};

	/*存储localstorage*/
	this.setLocalStorage = function (name, obj) {
		var objStr = angular.toJson(obj); //转换成json字符串
		$window.localStorage.setItem(name, objStr);
	};
	/*获取localstorage*/
	this.getLocalStorage = function (name){
		var objStr = $window.localStorage.getItem(name);
		return angular.fromJson(objStr);
	};
}]);
