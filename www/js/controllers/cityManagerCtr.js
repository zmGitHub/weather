/**
 * Created by turbo on 15-5-19.
 */
weatherApp.controller('cityManagerCtr', ['$scope', 'cityList', function ($scope, cityList) {
	var vm = $scope.vm = {};
	vm.cityArr = cityList;
}]);