
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
                    $rootScope.current_user = data.user.username;
                    $rootScope.sess = data.user;
                    sessionStorage.setItem('current_user', $rootScope.sess.username);
                    sessionStorage.setItem('current_user_id', $rootScope.sess._id);
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
                $rootScope.sess = null;
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
                $rootScope.current_user = data.user.username;
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
        $rootScope.current_user = 'Guest';
        sessionStorage.clear();
        $state.go('auth');
    };

}