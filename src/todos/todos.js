export default function($scope, todoFactory, $http, $q) {

/*	$scope.getItems = () => {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	};*/

/*	$scope.getItemsSynchronous = () => {
	  	getItems().then(function(data) {
	    	$scope.todos = data.todos;
	 	}, function() {
		    //$scope.error = 'unable to get the items';
		    console.log('unable to get the items');
		  }
		);
  	}*/

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



	$scope.onCompletedClick = subTask => {
		subTask.isCompleted = !subTask.isCompleted;
	}

	$scope.onItemClick = item => {
		$scope.activeItem = item;
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
				    console.log('unable to update item');
				  }
				);

	    	})
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

/*		var itemPosition = $scope.todos.indexOf(item);
		$scope.todos.splice(itemPosition, 1);*/

		$http.delete(`/todos/${item._id}`).success(response => {
			$scope.getItems();
			$scope.activeItem = undefined;
		});
	}







	$scope.onAddNewTaskClick = () => {
		$scope.isAddingNewTask = true;
		$scope.taskName = '';
		$scope.description = '';
	}

	$scope.onSaveNewTaskClick = () => {
		if($scope.isAddingNewTask) {
			var activeItemPos = $scope.todos.indexOf($scope.activeItem);
			var newObj = {};
			newObj.taskName = $scope.taskName;
			newObj.description = $scope.description;
			newObj.isCompleted = false;
			$http.put(`/todos/${$scope.activeItem._id}`, newObj)
			.success(response => {

	    		getItems().then(function(data) {
			    	$scope.todos = data.todos;
			    	$scope.activeItem = $scope.todos[activeItemPos];
			 	}, function() {
				    console.log('unable to update item');
				  }
				);

				console.log(response);
	    	})
		}
		else {
			$scope.subTask.taskName = $scope.taskName;
			$scope.subTask.description = $scope.description;
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

	$scope.onDeleteClick = (item, subTask) => {
		var subTaskPosition = item.subTasks.indexOf(subTask);
		item.subTasks.splice(subTaskPosition, 1);
	}



	$scope.getItems();
	//$scope.activeItem = $scope.todos[0];

}