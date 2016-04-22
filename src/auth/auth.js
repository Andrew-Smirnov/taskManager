
export default function($scope, $http, $rootScope, $state) {

	$scope.error_message = '';

	$scope.login = () => {
        var user = {};
        user.username = $scope.username;
        user.password = $scope.password;

		$http.post('/auth/login', user).success(function(data){
            console.log(data);
            if(data.state == 'success'){
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = data.user;
                    sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
                    $rootScope.userName = $rootScope.currentUser.username;            //variable to display name on pages

                    $state.go('todos');

                     jQuery.noConflict();
                    (function ($) {
                        $('#loginModal').modal('hide');
                    }
                    )(jQuery);
                    $scope.username = '';
                    $scope.password = '';
            }
            else{
                $scope.error_message = data.message;
                $rootScope.currentUser = 'Guest';
            }
        });
        
	};

    $scope.register = () => {
        $scope.incorrectUsername = null;
        $scope.incorrectEmail = null;

        var newUser = {};
        newUser.username = $scope.username;
        newUser.password = $scope.password;
        newUser.email = $scope.email;

        $http.post('/auth/signup', newUser).success(function(data){
            console.log(data);
        if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.currentUser = data.user.username;

                $rootScope.currentUser = data.user;
                sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
                $rootScope.userName = $rootScope.currentUser.username;            //variable to display name on pages

                $state.go('todos');

                jQuery.noConflict();
                (function ($) {
                    $('#registerModal').modal('hide');
                }
                )(jQuery);
            }
            else{
                //$scope.error_message = data.message;
                if(data.incorrectUsername.length > 0) {
                    $scope.incorrectUsername = data.incorrectUsername[0];
                }
                if(data.incorrectEmail.length > 0) {
                    $scope.incorrectEmail = data.incorrectEmail[0];
                }

            }
        });
    };


    $scope.onRegisterClick = () => {
        $scope.username = '';
        $scope.password = '';
        $scope.email = '';
        $scope.incorrectUsername = null;
        $scope.incorrectEmail = null;
        $scope.error_message = null;
    }

    $scope.onLoginClick = () => {
        $scope.username = '';
        $scope.password = '';
        $scope.error_message = null;
    }

    $scope.signout = () => {
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.currentUser = 'Guest';
        sessionStorage.clear();
        $state.go('auth');
    };

/*    $scope.myProfileClick = () => {
        $state.go('userProfile');
    }*/

}