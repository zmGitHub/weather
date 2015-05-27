weatherApp.controller('weatherCtr', ['$scope', 'Weather', 'WeatherDate', '$ionicModal', '$timeout', function ($scope, Weather, WeatherDate, $ionicModal,$timeout) {
	var vm = $scope.vm = {};
	vm.citys = WeatherDate;
	vm.weather = WeatherDate[0];

	/*下拉刷新*/
	$scope.doRefresh = function(){
		$timeout( function() {
			//simulate async response
			Weather.showTip('数据已是最新');
			$scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	};
	/*切换城市*/
	$scope.changeCity = function(index){
		vm.weather = WeatherDate[index];
	};
	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/modal/weatherDetail.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};


}]);
