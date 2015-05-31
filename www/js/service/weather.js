/**
 * Created by turbo on 15-5-14.
 */
weatherApp.factory('Weather', ['$http', '$q', '$ionicLoading', '$window', function($http, $q, $ionicLoading, $window){
	var isOffLine = this.offLine = false;
	/*天气接口key值*/
	var weatherKey = this.weatherKey = '4e2a4a4be57445b2973fa2a367cb8539';
	/*经纬度解析key值*/
	var locationKey = this.locationKey = '74b35fe8a83648cd9735a8638fbfb6cb';

	var weatherService = {};
	/*获取当前的地点*/
	weatherService.getGelocation = function(lat, long){
		var defer = $q.defer();
		if(angular.isUndefined(lat)){
			defer.resolve(null);
		}else{
			var url = 'http://api.haoservice.com/api/getLocationinfor?latlng='+lat+','+long+'&type=2&key='+locationKey;
			$http.get(url).success(function (data) {
				if(!data.error_code){
					weatherService.setLocalStorage('locationInfo', data.result);
					weatherService.getWeatherUpdate(data.result.city);
					defer.resolve(data.result.city);
				}else{
					defer.resolve(null);
				}

			}).error(function(){
				weatherService.getWeatherUpdate('衡阳');
				defer.resolve('衡阳');
			});
		}
		return defer.promise;
	};

	/*获取当前天气信息*/
	weatherService.getWeatherUpdate = function (city){
		var defer = $q.defer();
		weatherService.showLoading();
		var weatherCache = weatherService.getLocalStorage('weather') || undefined;
		if(angular.isUndefined(weatherCache)){
			weatherCache = [];
			weatherService.setLocalStorage('weather', weatherCache);
		}
		var url = 'http://apis.haoservice.com/weather?cityname='+city+'&key='+weatherKey;
		$http.get(url).success(function (data) {
			if(!data.error_code){
				weatherCache.push(data.result);
				weatherService.setLocalStorage('weather', weatherCache);
				defer.resolve(weatherCache);
			}else {
				defer.resolve(null);
			}
			weatherService.hideLoading();
		}).error(function () {
			defer.resolve(weatherCache);
			weatherService.hideLoading();
		});
		return defer.promise;
	};

	/*存储实景列表*/
	weatherService.addWeatherShare = function (obj) {
		var weatherShareList = weatherService.getLocalStorage('weatherShareList') || [];
		if(weatherShareList.length>0){
			weatherShareList.push(obj);
			weatherShareList = weatherShareList.reverse();
		}else {
			weatherShareList.push(obj);
		}
		weatherService.setLocalStorage('weatherShareList', weatherShareList);
	};

	/*获取实景列表*/
	weatherService.getWeatherShare = function(){
		return weatherService.getLocalStorage('weatherShareList');
	};
	/*存储localstorage*/
	weatherService.setLocalStorage = function (name, obj) {
		var objStr = angular.toJson(obj); //转换成json字符串
		$window.localStorage.setItem(name, objStr);
	};
	/*获取localstorage*/
	weatherService.getLocalStorage = function (name){
		var objStr = $window.localStorage.getItem(name);
		return angular.fromJson(objStr);
	};

	/*加载信息*/
	weatherService.showLoading = function () {
		$ionicLoading.show({
			template: '<ion-spinner icon="bubbles"></ion-spinner>'
		});
	};
	/*提示信息*/
	weatherService.showTip = function (textStr) {
		$ionicLoading.show({
			template: textStr?textStr:'温馨提示',
			animation: 'fade-in',
			showBackdrop: true,
			duration:2000,
			showDelay: 0
		});
	};

	weatherService.hideLoading = function () {
		$ionicLoading.hide();
	};
	return weatherService;
}]);
