/**
 * Created by turbo on 15-5-20.
 */
weatherApp.controller('galleryCtr', ['$scope', '$state', 'Weather', '$cordovaCamera', function ($scope, $state, Weather, $cordovaCamera) {
	var vm = $scope.vm = {};
	vm.weahterShareList = Weather.getWeatherShare() || [];
	$scope.shareWeather = function(){
		document.addEventListener("deviceready", function () {
			var options = {
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA
			};

			$cordovaCamera.getPicture(options).then(function(imageURI) {
				$state.go('shareWeather',{weatherUrl: imageURI});
			}, function(err) {
				console.log(err);
			});
		}, false);
	};
}]);