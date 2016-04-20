export default function($scope, $rootScope, $http) {

	$scope.canReceiveItems = $scope.currentUser.canReceiveItems;
	
	$scope.saveChangesClick = () => {
		var editUserInfo = {};
		editUserInfo.username = $scope.currentUser.username;
		editUserInfo.email = $scope.currentUser.email;
		editUserInfo.canReceiveItems = $scope.canReceiveItems;

		$http.put(`/user-profile/${$rootScope.currentUser._id}`, editUserInfo)
		.success(response => {
			console.log(response);
		})
	}

	$scope.onCanReceiveItemsClick = () => {
		$scope.canReceiveItems = !$scope.canReceiveItems;
	}

}