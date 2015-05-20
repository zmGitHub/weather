var weatherApp = angular.module('weather', ['ionic', 'ngCordova'])

	.run(function ($rootScope, $ionicPlatform, $cordovaNetwork, $cordovaGeolocation, $ionicLoading, Weather, User) {
		User.getToken();
		/*检测是否有网路存在*/
		document.addEventListener("deviceready", function () {

			var isOnline = $cordovaNetwork.isOnline();
			if (isOnline) {
				Weather.offLine = isOnline;
				var posOptions = {timeout: 10000, enableHighAccuracy: true};
				$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
					var lat = position.coords.latitude;
					var long = position.coords.longitude;
					Weather.getGelocation(lat,long).then(function(res){
						if(res){
							$ionicLoading.show({
								template: '当前城市'+res,
								duration: 3000
							});
						}else{
							$ionicLoading.show({
								template: '地位失败,请手动添加城市',
								duration: 3000
							});
						}
					});
				}, function () {
					$ionicLoading.show({
						template: '地位失败,请手动添加城市',
						duration: 3000
					});
				});
			}

			$rootScope.$on('$cordovaNetwork:offline', function () {
				$ionicLoading.show({
					template: '亲!世界上最遥远的距离就是木有网~',
					duration: 3000
				});
			});

		}, false);


		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}

		});
	})

	.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		$ionicConfigProvider.platform.ios.tabs.style('standard');
		$ionicConfigProvider.platform.ios.tabs.position('bottom');
		$ionicConfigProvider.platform.android.tabs.style('standard');
		$ionicConfigProvider.platform.android.tabs.position('standard');
		$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
		$ionicConfigProvider.platform.android.navBar.alignTitle('left');
		$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
		$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');
		$ionicConfigProvider.platform.ios.views.transition('ios');
		$ionicConfigProvider.platform.android.views.transition('android');
		$ionicConfigProvider.tabs.style('standard');

		$stateProvider
			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html"
			})

			.state('app.weather', {
				url: "/weather",
				views: {
					'tab-weather': {
						templateUrl: "templates/weather.html",
						resolve: {
							WeatherDate: function (Weather) {
								return Weather.getLocalStorage('weather');
							}
						},
						controller: 'weatherCtr'
					}
				}
			})
			.state('app.china', {
				url: "/china",
				views: {
					'tab-china': {
						templateUrl: "templates/china.html"
					}
				}
			})
			.state('app.profile', {
				url: "/profile",
				views: {
					'tab-profile': {
						templateUrl: "templates/profile.html",
						controller: 'userProfileCtr'
					}
				}
			})
			.state('userLogin', {
				url: '/user-login',
				templateUrl: 'templates/user/login.html',
				controller: 'userLoginCtr'
			})
			.state('userRegister', {
				url: '/user-register',
				templateUrl: 'templates/user/register.html',
				controller: 'userRegisterCtr'
			})
			.state('userSetting', {
				url: '/user-setting',
				templateUrl: 'templates/user/user.html',
				controller: 'userSettingCtr'
			})
			.state('gallery', {
				url: '/gallery-shop',
				templateUrl: 'templates/user/gallery.html',
				controller: 'galleryCtr'
			})
			.state('weatherAutoUpdate', {
				url: '/weather-auto-update',
				templateUrl: 'templates/setting/weatherAutoUpdate.html',
				controller: 'weatherAutoUpdateCtr'
			})
			.state('cityManager', {
				url: '/city-manager',
				templateUrl: 'templates/cityManager/cityManager.html',
				resolve: {
					cityList: function (Weather) {
						return Weather.getLocalStorage('weather');
					}
				},
				controller: 'cityManagerCtr'
			})
			.state('cityAddProvince', {
				url: '/city-add-province',
				templateUrl: 'templates/cityManager/cityProvince.html',
				controller: 'cityAddProvinceCtr'
			})
			.state('cityAddArea', {
				url: '/city-add-area/:province',
				templateUrl: 'templates/cityManager/cityArea.html',
				controller: 'cityAddAreaCtr'
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/weather');
	}]);


/*天气接口  http://apis.haoservice.com/weather?cityname=%E6%B7%B1%E5%9C%B3&key=4e2a4a4be57445b2973fa2a367cb8539*/
//http://www.haoservice.com/docs/6
/*http://www.ui.cn/detail/44449.html
 http://codepen.io/benjamingeorge/pen/QwQZqB
 http://codepen.io/calendee/pen/pCwyx?editors=101  autocomplete
 http://codepen.io/yafraorg/pen/jBEky?editors=101 地图
 http://codepen.io/ionic/pen/mqolp
 http://codepen.io/joaoneto/pen/BFIwq
 http://codepen.io/wattenberger/pen/VYoePW
 http://greengerong.github.io/blog/2015/05/09/qian-duan-javascriptgui-fan/
 http://codepen.io/shoowack/pen/LBsxD

 http://www.google.com/design/spec/components/buttons.html#buttons-usage
 */
