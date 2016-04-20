import _ from 'lodash';
import angular from 'angular';

const taskFactory = angular.module('app.taskFactory', [])

.factory('taskFactory', ($http) => {

	var getTasks = function($scope) {
	    return $http.get(`/tasks/${$scope.activeItem._id}`).then(function(response) {    
	    	return response.data;
	    });
  	};

  	var createTask = function($scope, task) {
  		var activeItemPos = $scope.todos.indexOf($scope.activeItem);
	   	$http.post('/tasks', task)								//addNewTask
		.success(response => {

    		$scope.getTasks().then(function(data) {
		    	$scope.todos[activeItemPos].subItems = data;
		 	}, function() {
			    console.log('unable to get the items');
			  }
			);

			console.log(response);
		})
  	};

  	var editTask = function($scope, task) {
  		var activeItemPos = $scope.todos.indexOf($scope.activeItem);
	   	$http.put(`/tasks/${$scope.editingTask._id}`, task)
		.success(response => {

    		$scope.getTasks().then(function(data) {
		    	$scope.todos[activeItemPos].subItems = data;
		    	if(task.isCompleted)
		    		$scope.comletedTasksCount++;
		    	else
		    		$scope.comletedTasksCount--;
		 	}, function() {
			    console.log('unable to get the items');
			  }
			);

			console.log(response);
		})
  	};

  	var deleteTask = function($scope, task) {
  		var activeItemPos = $scope.todos.indexOf($scope.activeItem);
  		var deleteTaskPos = $scope.todos[activeItemPos].subItems.indexOf(task);		
		$scope.todos[activeItemPos].subItems.splice(deleteTaskPos, 1);				//remoove from client-side

		$http.delete(`/tasks/${task._id}`)											//remoove from db
		.success(response => {
			$scope.getTasks().then(function(data) {
		    	$scope.todos[activeItemPos].subItems = data;
		 	}, function() {
			    console.log('unable to get the items');
			  }
			);

			console.log(response);
    	})
  	};




	return {
		getTasks,
		createTask,
		editTask,
		deleteTask
	};
});

export default taskFactory;