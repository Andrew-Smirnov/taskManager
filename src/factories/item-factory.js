import _ from 'lodash';
import angular from 'angular';

const itemFactory = angular.module('app.itemFactory', [])

.factory('itemFactory', ($http, $rootScope) => {

	var getItemsSynchronously = function($scope) {
	    return $http.get(`/todos/${$rootScope.currentUser._id}` ).then(function(response) {    
	    	return response.data;
	    });
  	};

  	var getItems = function($scope) {
	   $http.get(`/todos/${$rootScope.currentUser._id}` ).success(response => {
			$rootScope.todos = response.todos;
		});
  	};

  	var getComletedTasksCount = function(item) {
  		var comletedTasksCount = 0;
  		for (var i = 0; i < item.subItems.length; i++) {
  			if (item.subItems[i].hasOwnProperty('isCompleted') && item.subItems[i].isCompleted === true)
  				comletedTasksCount++;
  		};
  		return comletedTasksCount;
  	};

  	var onItemClick = function($scope, item) {
  		$scope.activeItem = item;
  		$scope.sharedItemActive = false;
		var activeItemPos = $scope.todos.indexOf($scope.activeItem);

		$scope.getTasks().then(function(data) {
			$scope.todos[activeItemPos].subItems = data;
			//$scope.tasksCount = item.subItems.length;
			//$scope.comletedTasksCount = getComletedTasksCount(item);
	 	}, function() {
		    console.log('unable to get the tasks');
		  }
		);
  	};



  	var createItem = function($scope) {
		$http.post('/todos', {
            task: $scope.newItemName,
            shared: false,
            user_Id: $rootScope.currentUser._id
        })
        .success(response => {

        	getItemsSynchronously().then(function(data) {
		    	$rootScope.todos = data.todos;
		    	$scope.activeItem = $scope.todos[$scope.todos.length - 1];
		 	}, function() {
			    console.log('unable to get the items');
			  }
			);

            console.log(response);
        });
  	};

  	var editItem = function($scope) {
  		var activeItemPos = $scope.todos.indexOf($scope.activeItem);

    	$http.put(`/todos/${$scope.activeItem._id}`, { task: $scope.newItemName })
    	.success(response => {
    		$scope.todos[activeItemPos].task = $scope.newItemName;
    		console.log(response);
		});
  	};

  	var deleteItem = function($scope, itemToDelete) {
		for (var i = 0; i < itemToDelete.subItems.length; i++) {					//Delete all sub tasks
			$http.delete(`/tasks/${itemToDelete.subItems[i]._id}`)
			.success(response => {
				console.log(response);
	    	})
		}

		$http.delete(`/todos/${itemToDelete._id}`)									//Delete item
		.success(response => {			
			$scope.getItems();
			$scope.activeItem = undefined;
			console.log(response);
		});
  	};

  	var deleteUserInfo = function($scope, itemToDelete) {
		for (var i = 0; i < itemToDelete.subItems.length; i++) {					//Delete all sub tasks
			$http.delete(`/tasks/${itemToDelete.subItems[i]._id}`)
			.success(response => {
				console.log(response);
	    	})
		}

		$http.delete(`/todos/${itemToDelete._id}`)									//Delete item
		.success(response => {			
			$scope.activeItem = undefined;
			console.log(response);
		});
  	};

	return {
		getItemsSynchronously,
		getItems,
		onItemClick,
		createItem,
		editItem,
		deleteItem,
		deleteUserInfo
	};
});

export default itemFactory;