/**
 * Created by turbo on 15-5-20.
 */
/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('userSettingCtr', ['$scope', 'User', 'Weather', '$state', '$ionicViewSwitcher', '$cordovaNetwork', '$cordovaGeolocation', function ($scope, User, Weather, $state, $ionicViewSwitcher, $cordovaNetwork, $cordovaGeolocation) {
	var vm = $scope.vm = {};
	$scope.toggleName = function () {
		var user = User.getToken();
		if (angular.isDefined(user)) {
			vm.name = user.name;
		}
		vm.updateName = !vm.updateName;
	};

	$scope.updateCurrentPosition = function(){
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
							User.doUpdatePosition(res);
							User.showTip('当前城市'+res);
						}else{
							User.showTip('地位失败,请手动添加城市');
						}
					});
				}, function () {
					User.showTip('地位失败,请手动添加城市');
				});
			}
		}, false);
	};

	//修改昵称
	$scope.updateUserName = function (name) {
		var user = User.getToken();
		name = name || '';
		if (name !== '' && user.name !== name) {
			User.doUpdateUserName(name).then(function (res) {
				if (res) {
					User.showTip('姓名修改成功!');
				} else {
					User.showTip('姓名修改失败!');
				}
				vm.updateName = !vm.updateName;
			});
		} else {
			vm.updateName = !vm.updateName;
		}

	};
	//退出登录
	$scope.logOut = function () {
		User.doLogout();
		$ionicViewSwitcher.nextDirection('back');
		$ionicViewSwitcher.nextTransition('android');
		$state.go('app.profile');

	};
}]);