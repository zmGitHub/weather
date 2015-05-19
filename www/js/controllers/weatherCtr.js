weatherApp.controller('weatherCtr', ['$scope', 'Weather', 'WeatherDate', '$ionicModal', function ($scope, Weather, WeatherDate,$ionicModal) {
		var vm = $scope.vm = {};
		vm.weather = WeatherDate[0];
		console.log(vm.weather);
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
