import angular from 'angular';
import uiRouter from 'angular-ui-router';
import itemFactory from 'factories/item-factory';
import taskFactory from 'factories/task-factory';
import todosController from 'todos/todos';
import authController from 'auth/auth';
import userProfileController from 'user-profile/user-profile';

const app = angular.module('app', [uiRouter, itemFactory.name, taskFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

        $stateProvider
        .state("auth", {
            url: ('/'),
            views: {
                "auth-panel": {
                    template: require('auth/auth-panel.html'),
                    controller: authController
                }
            }
        })
        .state('todos', {
            url: ('/todos'),
            views: {
                "auth-panel": {
                    template: require('auth/auth-panel.html'),
                    controller: authController
                },
                "todos": {
                    template: require('todos/todos.html'),
                    controller: todosController
                }
            }
        })
        .state('userProfile', {
            url: ('/profile'),
            views: {
                "auth-panel": {
                    template: require('auth/auth-panel.html'),
                    controller: authController
                },
                "user-profile": {
                    template: require('user-profile/user-profile.html'),
                    controller: userProfileController
                }
            }
        })

    $locationProvider.html5Mode(true);

});
app.run(function($http, $rootScope, $state)
{
    if(sessionStorage.length > 0) {
        $rootScope.currentUser = JSON.parse(sessionStorage.currentUser);
        $rootScope.authenticated = true;
        $rootScope.firstName = $rootScope.currentUser.firstName;            //variable to display name on pages
        $state.go('todos');
    }
    else {
        $rootScope.authenticated = false;
        $rootScope.currentUser = 'Guest';
        $state.go('auth');
    }

});                      

export default app;