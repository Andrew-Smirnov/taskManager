export default function($scope, $rootScope, $http) {

	$scope.incorrectLogin = null;
	$scope.incorrectEmail = null;
	$scope.successMessage = null;

	$scope.firstName = $rootScope.currentUser.firstName;
	$scope.username = $rootScope.currentUser.username;
	$scope.email = $rootScope.currentUser.email;
	$scope.canReceiveItems = $scope.currentUser.canReceiveItems;
	
	$scope.saveChangesClick = () => {
		$scope.incorrectLogin = null;
		$scope.incorrectEmail = null;
		$scope.successMessage = null;

		var editUserInfo = {};
		editUserInfo.firstName = $scope.firstName;
		editUserInfo.username = $scope.username;
		editUserInfo.email = $scope.email;
		editUserInfo.canReceiveItems = $scope.canReceiveItems;

		/////////////////////////////////////////

		$http.put(`/user-profile/${$rootScope.currentUser._id}`, editUserInfo)
		.success(response => {
			console.log(response);

			if (response.state === 'failure') {
				if(response.hasOwnProperty('incorrectEmail')) {
					$scope.incorrectEmail = response.incorrectEmail;
				}
				if(response.hasOwnProperty('incorrectLogin')) {
					$scope.incorrectLogin = response.incorrectLogin;
				}
			}
			else {
				$scope.successMessage = 'Your profile successfuly updated!';
				$rootScope.currentUser.firstName = editUserInfo.firstName;
				$rootScope.currentUser.username = editUserInfo.username;
				$rootScope.currentUser.email = editUserInfo.email;
				$rootScope.currentUser.canReceiveItems = editUserInfo.canReceiveItems;

				sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
	            //$rootScope.firstName = $rootScope.currentUser.firstName;            //variable to display name on pages
        	}
		})
	}

	$scope.onCanReceiveItemsClick = () => {
		$scope.canReceiveItems = !$scope.canReceiveItems;
	}

	$scope.deleteProfile = () => {
		
	}

}