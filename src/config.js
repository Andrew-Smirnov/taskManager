import angular from 'angular';
import uiRouter from 'angular-ui-router';
import itemFactory from 'factories/item-factory';
import taskFactory from 'factories/task-factory';
import todosController from 'todos/todos';
import authController from 'auth/auth';

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

    $locationProvider.html5Mode(true);

});
app.run(function($http, $rootScope, $state)
{
    if(sessionStorage.length > 0) {
        $rootScope.current_user = sessionStorage.current_user;
        $rootScope.authenticated = true;
        $state.go('todos');
    }
    else {
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
    }

});                      

export default app;