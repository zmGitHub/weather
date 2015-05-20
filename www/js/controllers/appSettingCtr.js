/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('appSettingCtr', ['$scope', '$ionicLoading', '$timeout',function ($scope, $ionicLoading, $timeout) {
	var vm = $scope.vm = {};
	$scope.clearCache = function(){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-light" icon="bubbles"></ion-spinner>',
			animation: 'fade-in',
			showBackdrop: true,
			duration: 2000,
			showDelay: 0
		});
	};
}]);