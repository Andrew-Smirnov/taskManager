
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
        var newUser = {};
        newUser.username = $scope.username;
        newUser.password = $scope.password;
        newUser.email = $scope.email;

        $http.post('/auth/signup', newUser).success(function(data){
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
                $scope.error_message = data.message;
            }
        });
    };


    $scope.onRegisterClick = () => {
        $scope.username = '';
        $scope.password = '';
        $scope.email = '';
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