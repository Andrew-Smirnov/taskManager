export default function($scope, todoFactory, $http, $q) {

/*	$scope.getItems = () => {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	};*/

  	var getItems = function() {
	    return $http.get('/todos').then(function(response) {    
	    	return response.data;
	    });
  	};

	$scope.getItems = () => {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	};


	var getTasks = function() {
	    return $http.get(`/tasks/${$scope.activeItem._id}`).then(function(response) {    
	    	return response.data;
	    });
  	};

/*	$scope.getTasks = () => {
		$http.get(`/tasks/${$scope.activeItem._id}`)).success(response => {
			$scope.todos[$scope.todos.indexOf($scope.activeItem)] = response;
		});
	};*/



	$scope.onCompletedClick = subTask => {
		subTask.isCompleted = !subTask.isCompleted;
	}

	$scope.onItemClick = item => {
		$scope.activeItem = item;
		var activeItemPos = $scope.todos.indexOf($scope.activeItem);

		getTasks().then(function(data) {
			$scope.todos[activeItemPos].subItems = data;
	 	}, function() {
		    console.log('unable to get the tasks');
		  }
		);
	}

	$scope.onCreateNewItemClick = () => {
		$scope.isCreatingNewItem = true;
		$scope.newItemName = '';
	}


	$scope.onAddNewItemClick = () => {
		if(!$scope.newItemName) { return }

		if($scope.isCreatingNewItem) {															//createItem
	        $http.post('/todos', {
	            task: $scope.newItemName
	        })
	        .success(response => {

	        	getItems().then(function(data) {
			    	$scope.todos = data.todos;
			    	$scope.activeItem = $scope.todos[$scope.todos.length - 1];
			 	}, function() {
				    console.log('unable to get the items');
				  }
				);

	            console.log(response);
	        });
	    }
	    else {																					//updateItem
	    	var activeItemPos = $scope.todos.indexOf($scope.activeItem);

	    	$http.put(`/todos/${$scope.activeItem._id}`, { task: $scope.newItemName })
	    	.success(response => {

	    		getItems().then(function(data) {
			    	$scope.todos = data.todos;
			    	$scope.activeItem = $scope.todos[activeItemPos];
			 	}, function() {
				    console.log('unable to get the items');
				  }
				);

				console.log(response);
	    	});
	    }

        jQuery.noConflict();
	    (function ($) {
	        $('#newItemModal').modal('hide');
	    }
	    )(jQuery);
	}

	$scope.onEditItemClick = item => {
		$scope.isCreatingNewItem = false;
		$scope.newItemName = item.task;
	}

	$scope.onDeleteItemClick = item => {

		for (var i = 0; i < item.subItems.length; i++) {					//Delete all sub tasks
			$http.delete(`/tasks/${item.subItems[i]._id}`)
			.success(response => {
				console.log(response);
	    	})
		}

		$http.delete(`/todos/${item._id}`)									//Delete item
		.success(response => {			
			$scope.getItems();
			$scope.activeItem = undefined;
			console.log(response);
		});
	}







	$scope.onAddNewTaskClick = () => {
		$scope.isAddingNewTask = true;
		$scope.taskName = '';
		$scope.description = '';
	}

	$scope.onSaveNewTaskClick = () => {
		
		var activeItemPos = $scope.todos.indexOf($scope.activeItem);
		var newObj = {};
		newObj.taskName = $scope.taskName;
		newObj.description = $scope.description;
		newObj.isCompleted = false;
		newObj.item_Id = $scope.activeItem._id;

		if($scope.isAddingNewTask) {

			$http.post('/tasks', newObj)								//addNewTask
			.success(response => {

	    		getTasks().then(function(data) {
			    	$scope.todos[activeItemPos].subItems = data;
			 	}, function() {
				    console.log('unable to get the items');
				  }
				);

				console.log(response);
    		})

		}
		else {

			$http.put(`/tasks/${$scope.subTask._id}`, newObj)
			.success(response => {

	    		getTasks().then(function(data) {
			    	$scope.todos[activeItemPos].subItems = data;
			 	}, function() {
				    console.log('unable to get the items');
				  }
				);

				console.log(response);
    		})
			
		}
		$scope.taskName = '';
		$scope.description = '';
	}

	$scope.onEditClick = subTask => {
		$scope.isAddingNewTask = false;

		$scope.taskName = subTask.taskName;
		$scope.description = subTask.description;
		$scope.subTask = subTask;
	}

	$scope.onDeleteClick = (subTask) => {
		var activeItemPos = $scope.todos.indexOf($scope.activeItem);

		$http.delete(`/tasks/${subTask._id}`)
		.success(response => {
			getTasks().then(function(data) {
		    	$scope.todos[activeItemPos].subItems = data;
		 	}, function() {
			    console.log('unable to get the items');
			  }
			);

			console.log(response);
    	})
	}



	$scope.getItems();
}