/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('userProfileCtr', ['$scope', 'User','$state', '$ionicLoading', '$ionicViewSwitcher', '$timeout', function ($scope, User, $state, $ionicLoading, $ionicViewSwitcher, $timeout) {
	var vm = $scope.vm = {};
	$scope.checkLoginStatus = function () {
		$ionicViewSwitcher.nextTransition('android');
		if (User.checkUser()) {
			$ionicViewSwitcher.nextDirection('forward');
			$state.go('userSetting');
		} else {
			$ionicViewSwitcher.nextDirection('back');
			$state.go('userLogin');
		}
	};

	/*版本检测*/
	$scope.checkAppVersion = function(){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-light" icon="bubbles"></ion-spinner><p>正在检测版本,请稍后...</p>',
			animation: 'fade-in',
			showBackdrop: true,
			duration: 2000,
			showDelay: 0
		});

		$timeout(function(){
			$ionicLoading.show({
				template: '您现在用的是最新版本',
				animation: 'fade-in',
				showBackdrop: true,
				duration: 2000,
				showDelay: 0
			});
		},3000, false);
	};
}]);