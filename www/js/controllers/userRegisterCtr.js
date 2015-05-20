/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('userRegisterCtr', ['$scope', 'User', '$interval', '$state', '$ionicViewSwitcher',function ($scope, User, $interval, $state, $ionicViewSwitcher) {
	var vm = $scope.vm = {};
	vm.validTime = 60; //60秒后重新发送验证码
	vm.validTimeStr = "发送验证码";
	vm.isRetry = false;
	var timer; // 计时器
	// 开始计时器
	$scope.startTimer = function (telNumber) {
		if (telNumber) {
			if (angular.isDefined(timer)) return; //避免重复开启计时器
			vm.isRetry = true;
			timer = $interval(function () {
				if (vm.validTime > 0) {
					vm.validTime -= 1;
					vm.validTimeStr = vm.validTime + "S 后可重发";
				} else {
					$scope.stopTimer(timer);
				}
			}, 1000);
			User.getTelValidCode(vm.telNumber).then(function (res) {
				if (!res) {
					$scope.stopTimer(timer);
					$scope.showTip('网路繁忙');
				}
			});
		} else {
			User.showTip('手机号码格式有误');
		}
	};

	//停止计时器
	$scope.stopTimer = function (timered) {
		//判断是否开启了计时器
		if (angular.isDefined(timered)) {
			$interval.cancel(timered);
			timer = undefined;
			vm.isRetry = false;
			vm.validTimeStr = "发送验证码";
			vm.validTime = 60;
		}
	};


	$scope.registerAction = function (isValid) {
		if (isValid) {
			User.doRegister(vm).then(function (res) {
				if (res) {
					$ionicViewSwitcher.nextTransition('android');
					$ionicViewSwitcher.nextDirection('forward');
					$state.go('app.profile');
				}
			});
		} else {
			User.showTip('网路繁忙');
		}
	};

	//当这个controller销毁时 同时销毁这个计时器
	$scope.$on("$destroy", function () {
		$scope.stopTimer();
	});
}]);