/**
 * Created by turbo on 15-5-31.
 */
weatherApp.controller('shareWeatherCtr', ['$scope', '$state','$stateParams', '$filter', 'Weather', '$timeout',function ($scope, $state, $stateParams, $filter, Weather, $timeout) {
	var vm = $scope.vm = {};
	vm.weatherPic = $stateParams.weatherUrl;

	$scope.shareWeatherToServe = function(){
		var obj = {};
		obj.url = vm.weatherPic;
		var today=new Date();
		obj.shareTime = today.getHours()+'时'+today.getMinutes()+'分';
		Weather.addWeatherShare(obj);
		Weather.showLoading();
		$timeout(function(){
			Weather.hideLoading();
			Weather.showTip('实景分享成功');
			$state.go('gallery');
		},3000, false);

	};
}]);