import _ from 'lodash';

export default function($scope, $rootScope, $http, $q, itemFactory, taskFactory) {

	const { getItemsSynchronously, getItems, onItemClick, createItem, editItem, deleteItem } = itemFactory;
	const { getTasks, createTask, editTask, deleteTask } = taskFactory;

  	$scope.getItemsSynchronously = _.partial(getItemsSynchronously, $scope);
  	$scope.getItems     = _.partial(getItems, $scope);
  	$scope.onItemClick  = _.partial(onItemClick, $scope);
  	$scope.createItem   = _.partial(createItem, $scope);
  	$scope.editItem     = _.partial(editItem, $scope);
  	$scope.deleteItem   = _.partial(deleteItem, $scope);

  	$scope.getTasks   = _.partial(getTasks, $scope);
  	$scope.createTask = _.partial(createTask, $scope);
  	$scope.editTask   = _.partial(editTask, $scope);
  	$scope.deleteTask = _.partial(deleteTask, $scope);



	$scope.onCompletedClick = task => {
		task.isCompleted = !task.isCompleted;
		$scope.editingTask = task;
		if($scope.sharedItemActive) {
			var itemPos = $rootScope.currentUser.sharedItems.indexOf($scope.activeItem);
			var taskPos = $rootScope.currentUser.sharedItems[itemPos].subItems.indexOf(task);

			$http.put(`/share/editTask/${$rootScope.currentUser._id}/${itemPos}/${taskPos}/${task.isCompleted}`)
			.success(response => {
				console.log(response);

				$rootScope.currentUser.sharedItems[itemPos].subItems[taskPos].isCompleted = task.isCompleted;
				sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
	    	})
		}
		else
			$scope.editTask(task);
	};

	$scope.onCreateNewItemClick = () => {
		$scope.isCreatingNewItem = true;
		$scope.newItemName = '';
	};


	$scope.onSaveItemClick = () => {
		if(!$scope.newItemName) { return }

		if($scope.isCreatingNewItem) {														//createItem
	        $scope.createItem();
	    }
	    else {																					//updateItem
	    	$scope.editItem();
	    }

        jQuery.noConflict();
	    (function ($) {
	        $('#newItemModal').modal('hide');
	    }
	    )(jQuery);
	};

	$scope.onEditItemClick = item => {
		$scope.isCreatingNewItem = false;
		$scope.newItemName = item.task;
	};



	$scope.onAddNewTaskClick = () => {
		$scope.isAddingNewTask = true;
		$scope.taskName = '';
		$scope.description = '';
	};

	$scope.onSaveTaskClick = () => {
		if(!$scope.taskName) { return }
		var newTask = {};
		newTask.taskName = $scope.taskName;
		newTask.description = $scope.description;
		newTask.isCompleted = $scope.isCompleted;
		newTask.item_Id = $scope.activeItem._id;

		if($scope.isAddingNewTask) {
			$scope.createTask(newTask);
		}
		else {
			$scope.editTask(newTask);
		}
	}

	$scope.onEditClick = task => {
		$scope.isAddingNewTask = false;

		$scope.taskName = task.taskName;
		$scope.description = task.description;
		$scope.editingTask = task;
	}


	//$scope.getItems();

    getItemsSynchronously().then(function(data) {
    	$rootScope.todos = data.todos;
    	$rootScope.sharedItems = $rootScope.currentUser.sharedItems;

 	}, function() {
	    console.log('unable to get the items');
	  }
	);

	setTimeout(function() {											//заполняем subtusks
		for(var i = 0; i < $rootScope.todos.length; i++) {
			$scope.onItemClick($rootScope.todos[i]);
		}
		$scope.activeItem = null;
	}, 500);



	$scope.onShareItemClick = () => {
		$scope.shareEmail = '';
		$scope.shareError = null;
	}

	$scope.shareItem = () => {
		if(!$scope.shareEmail || $scope.shareEmail === $rootScope.currentUser.email) {
			$scope.shareError = "Please, enter user email";
			return;
		}

		$http.get(`/share/findUser/${$scope.shareEmail}`).success(function(data){
            console.log(data);
            if(data.state == 'success'){

        		$http.post(`/share/addItem/${data.user._id}`, $scope.activeItem).success(function(data) {
					console.log(data);
        		});
               
                 jQuery.noConflict();
                (function ($) {
                    $('#shareItemModal').modal('hide');
                }
                )(jQuery);

            }
            else{
                if(data.shareError) {
                    $scope.shareError = data.shareError;
                }
            }
        });    
	};

	$scope.onSharedItemClick = item => {
		$scope.activeItem = item;
		$scope.sharedItemActive = true;
	}

	$scope.deleteSharedItem = item => {
		var pos = $rootScope.currentUser.sharedItems.indexOf(item);
		$rootScope.currentUser.sharedItems.splice(pos, 1);

		$http.delete(`/share/deleteItem/${$rootScope.currentUser._id}/${item._id}`)
			.success(response => {
				console.log(response);
	    })
		$scope.activeItem = null;

		sessionStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
	}

}