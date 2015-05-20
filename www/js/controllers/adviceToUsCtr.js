/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('adviceToUsCtr', ['$scope', '$state', '$ionicViewSwitcher', '$ionicLoading', function ($scope, $state, $ionicViewSwitcher, $ionicLoading) {
	var vm = $scope.vm = {};
	vm.advice = '';
	$scope.userAdvice = function(){
		if(vm.advice){
			$ionicLoading.show({
				template: '提交成功!',
				animation: 'fade-in',
				showBackdrop: true,
				duration: 3000,
				showDelay: 0
			});
			$ionicViewSwitcher.nextTransition('android');
			$ionicViewSwitcher.nextDirection('back');
			$state.go('app.profile');
		}else{
			$ionicLoading.show({
				template: '请输入文字',
				animation: 'fade-in',
				showBackdrop: true,
				duration: 2000,
				showDelay: 0
			});
		}
	};
}]);