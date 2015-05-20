/**
 * Created by turbo on 15-5-20.
 */
weatherApp.factory('User', ['$http', '$q', '$rootScope', '$ionicLoading', '$window', function($http, $q, $rootScope, $ionicLoading, $window){
	/*天气接口key值*/
	var userInfo = {
		id: 0,
		name: '',
		tel: '',
		avatar: 'http://diy.qqjay.com/u2/2012/0923/72475d96a1f87cfdb45bb078484769d9.jpg',
		hotAddress: ''
	};
	var userService = {};

	var transform = function (data) {
		return $.param(data);
	};
	/*验证码*/
	//获取验证码
	userService.getTelValidCode = function (telNumber) {
		var defer = $q.defer();
		$http.post("http://120.24.171.184/Home/login/verify_code",
			{phone: telNumber},
			{
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				transformRequest: transform
			}).success(function (data) {
				data = angular.isDefined(data)?parseInt(data):false;
				if (data) {
					defer.resolve(data);
				} else {
					defer.resolve(data);
				}

			}).error(function (data, status) {
				defer.resolve(status);
			});
		return defer.promise;
	};
	/*注册*/
	userService.doRegister = function (paramas) {
		var defer = $q.defer();
		$http.post("http://120.24.171.184/Home/login/add_user",
			paramas,
			{
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				transformRequest: transform
			}).success(function (data) {
				data = angular.isDefined(data)?parseInt(data):false;
				if (data) {
					userService.showTip('注册成功!');
					userInfo.tel = paramas.telNumber;
					var locationInfo = userService.getLocalStorage('locationInfo') || '';
					if(locationInfo){
						userInfo.hotAddress = locationInfo.village;
					}
					userService.setLocalStorage('user', userInfo);
					userService.setToken(userInfo);
					defer.resolve(data);
				} else {
					userService.showTip('网路繁忙!');
					defer.resolve(data);
				}

			}).error(function(){
				userService.showTip('请检查网路设置!');
			});

		return defer.promise;
	};
	//登录
	userService.doLogin = function (user) {
		var defer = $q.defer();
		var userToken = userService.getToken();
		if(angular.isUndefined(userToken)){
			userService.showLoading('登录中...');
			$http.post("http://120.24.171.184/Home/login/doLogin",
				user,
				{
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					transformRequest: transform
				}).success(function (data) {
					data = angular.isDefined(data)?parseInt(data):false;
					userService.hideLoading();
					if (data) {
						userInfo.id = data;
						userInfo.tel = user.userName;
						var locationInfo = userService.getLocalStorage('locationInfo') || '';
						if(locationInfo){
							userInfo.hotAddress = locationInfo.village;
						}
						userService.setLocalStorage('user', userInfo);
						userService.setToken(userInfo);
						defer.resolve(data);
						userService.showTip('登录成功!');
					} else {
						userService.showTip('登录失败!');
						defer.resolve(data);
					}
				}).error(function () {
					userService.showTip('网络繁忙!');
				});
		}else{
			userService.showTip('不能重复登录!');
			defer.resolve(0);
		}
		return defer.promise;
	};
	/*昵称修改*/
	userService.doUpdateUserName = function (name) {
		var defer = $q.defer();
		var userCache = userService.getToken() || undefined;
		if(angular.isDefined(userCache)){
			userCache.name = name;
			userService.setToken(userCache);
			userService.setLocalStorage('user', userCache);
			defer.resolve(1);
		}else{
			defer.resolve(0);
		}
		return defer.promise;
	};
	//注销
	userService.doLogout = function () {
		$rootScope.user = {};
		$window.localStorage.removeItem("user");
		$window.localStorage.userToken = false;
	};
	/*缓存登录信息*/
	userService.setToken = function (userObj) {
		$rootScope.user= userObj;
		$window.localStorage.userToken = true;
	};
	userService.getToken = function () {
		var userStr = $window.localStorage.getItem("user") || undefined;
		if(angular.isUndefined(userStr)){
			$window.localStorage.userToken = false;
			return userStr;
		}else{
			return $rootScope.user = angular.fromJson(userStr);
		}
	};
	//判读用户登录状态
	userService.checkUser = function () {
		var res = $window.localStorage.userToken || false;
		return angular.fromJson(res);
	};

	/*存储localstorage*/
	userService.setLocalStorage = function (name, obj) {
		var objStr = angular.toJson(obj); //转换成json字符串
		$window.localStorage.setItem(name, objStr);
	};
	/*获取localstorage*/
	userService.getLocalStorage = function (name){
		var objStr = $window.localStorage.getItem(name);
		return angular.fromJson(objStr);
	};
	/*更新常居住地*/
	/*更新用户定位城市*/
	userService.doUpdatePosition = function (city){
		var defer = $q.defer();
		var userCache = userService.getToken() || undefined;
		if(angular.isDefined(userCache)){
			userCache.hotAddress = city;
			userService.setToken(userCache);
			userService.setLocalStorage('user', userCache);
			defer.resolve(1);
		}else{
			defer.resolve(0);
		}
		return defer.promise;
	};
	/*提示信息*/
	userService.showLoading = function () {
		$ionicLoading.show({
			template: '<ion-spinner icon="bubbles"></ion-spinner>',
			animation: 'fade-in',
			showBackdrop: true,
			duration:10000,
			showDelay: 0
		});
	};
	userService.showTip = function (textStr) {
		$ionicLoading.show({
			template: textStr?textStr:'温馨提示',
			animation: 'fade-in',
			showBackdrop: true,
			duration:2000,
			showDelay: 0
		});
	};
	userService.hideLoading = function () {
		$ionicLoading.hide();
	};
	return userService;
}]);
