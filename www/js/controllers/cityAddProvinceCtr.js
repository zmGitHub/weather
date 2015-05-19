/**
 * Created by turbo on 15-5-19.
 */
weatherApp.controller('cityAddProvinceCtr', ['$scope', 'cityData', function ($scope, cityData) {
	var vm = $scope.vm = {};
	vm.cityProvince = cityData.cityList;
}]);
