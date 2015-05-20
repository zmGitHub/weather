/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('userProfileCtr', ['$scope', 'User','$state', '$ionicViewSwitcher', function ($scope, User, $state, $ionicViewSwitcher) {
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
}]);