/**
 * Created by turbo on 15-5-19.
 */
weatherApp.controller('cityAddAreaCtr', ['$scope', 'cityData','$stateParams', function ($scope, cityData, $stateParams) {
	var vm = $scope.vm = {};
	vm.province = $stateParams.province;
	vm.areaList = _.find(cityData.cityList,{p: vm.province});
	var res = vm.areaList.c[0].a || undefined;
	vm.hasArea = angular.isDefined(res);
}]);
