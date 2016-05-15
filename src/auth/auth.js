
export default function($scope, $http, $rootScope, $state) {

    $scope.currentState = $state.current.name;
	$scope.error_message = '';

	$scope.login = () => {
        $scope.incorrectLogin = null;
        $scope.incorrectPassword = null;

        var user = {};
        user.username = $scope.username;
        user.password = $scope.password;

		$http.post('/auth/login', user).success(function(data){
            console.log(data);
            if(data.state == 'success'){
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = data.user;
                    sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
                    //$rootScope.firstName = $rootScope.currentUser.firstName;            //variable to display name on pages

                    //$rootScope.sharedItems = $rootScope.currentUser.sharedItems;

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
                if(data.incorrectLogin.length > 0) {
                    $scope.incorrectLogin = data.incorrectLogin[0];
                }
                if(data.incorrectPassword.length > 0) {
                    $scope.incorrectPassword = data.incorrectPassword[0];
                }
                //$scope.error_message = data.message;
                $rootScope.currentUser = 'Guest';
            }
        });
        
	};

    $scope.register = () => {
        $scope.incorrectLogin = null;
        $scope.incorrectEmail = null;

        var newUser = {};
        newUser.username = $scope.username;
        newUser.password = $scope.password;
        newUser.email = $scope.email;
        newUser.firstName = $scope.firstName;

        $http.post('/auth/signup', newUser).success(function(data){
            console.log(data);
        if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.currentUser = data.user.username;

                $rootScope.currentUser = data.user;
                sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
                //$rootScope.firstName = $rootScope.currentUser.firstName;            //variable to display name on pages

                $state.go('todos');

                jQuery.noConflict();
                (function ($) {
                    $('#registerModal').modal('hide');
                }
                )(jQuery);
            }
            else{
                if(data.incorrectLogin.length > 0) {
                    $scope.incorrectLogin = data.incorrectLogin[0];
                }
                if(data.incorrectEmail.length > 0) {
                    $scope.incorrectEmail = data.incorrectEmail[0];
                }
            }
        });
    };


    $scope.onRegisterClick = () => {
        $scope.firstName = '';
        $scope.username = '';
        $scope.password = '';
        $scope.email = '';
        $scope.incorrectLogin = null;
        $scope.incorrectEmail = null;
        $scope.error_message = null;
    }

    $scope.onLoginClick = () => {
        $scope.username = '';
        $scope.password = '';
        $scope.error_message = null;
        $scope.incorrectLogin = null;
        $scope.incorrectPassword = null;
    }

    $scope.signout = () => {
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.currentUser = 'Guest';
        sessionStorage.clear();
        $state.go('auth');
    };

}