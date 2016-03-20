import _ from 'lodash';
import angular from 'angular';

const itemFactory = angular.module('app.itemFactory', [])

.factory('itemFactory', ($http) => {

	var getItemsSynchronously = function($scope) {
	    return $http.get('/todos').then(function(response) {    
	    	return response.data;
	    });
  	};

  	var getItems = function($scope) {
	   $http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
  	};

  	var onItemClick = function($scope, item) {
  		$scope.activeItem = item;
		var activeItemPos = $scope.todos.indexOf($scope.activeItem);

		$scope.getTasks().then(function(data) {
			$scope.todos[activeItemPos].subItems = data;
	 	}, function() {
		    console.log('unable to get the tasks');
		  }
		);
  	};

  	var createItem = function($scope) {
		$http.post('/todos', {
            task: $scope.newItemName
        })
        .success(response => {

        	getItemsSynchronously().then(function(data) {
		    	$scope.todos = data.todos;
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

	return {
		getItemsSynchronously,
		getItems,
		onItemClick,
		createItem,
		editItem,
		deleteItem
	};
});

export default itemFactory;