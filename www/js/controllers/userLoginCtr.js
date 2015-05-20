/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('userLoginCtr', ['$scope', 'User','$state', '$ionicViewSwitcher', function ($scope, User, $state, $ionicViewSwitcher) {
	var vm = $scope.vm = {};
	$scope.userLogin = function (isValid) {
		if (isValid) {
			User.doLogin(vm).then(function (res) {
				if (res) {
					$ionicViewSwitcher.nextTransition('android');
					$ionicViewSwitcher.nextDirection('forward');
					$state.go('app.profile');
				}
			});
		}
	};
}]);