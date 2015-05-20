/**
 * Created by turbo on 15-5-19.
 */
weatherApp.controller('cityAddAreaCtr', ['$scope', 'Weather', 'cityData', '$state', '$stateParams', function ($scope, Weather, cityData, $state, $stateParams) {
	var vm = $scope.vm = {};
	vm.province = $stateParams.province;
	vm.areaList = _.find(cityData.cityList,{p: vm.province});
	var res = vm.areaList.c[0].a || undefined;
	vm.hasArea = angular.isDefined(res);

	/*添加城市*/
	$scope.addProvinceCity = function(province, area){
		Weather.getWeatherUpdate(area).then(function(res){
			if(res){
				$state.go('cityManager');
			}
		});
	}

	$scope.addAreaCity = function (city, area) {
		var isArea = area.indexOf(area) || 0;
		if(isArea>0){
			Weather.getWeatherUpdate(city).then(function(res){
				if(res){
					$state.go('cityManager');
				}
			});
		}else{
			Weather.getWeatherUpdate(area).then(function(res){
				if(res){
					$state.go('cityManager');
				}
			});
		}
	}
}]);
