import _ from 'lodash';

export default function($scope, $http, $q, itemFactory, taskFactory) {

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
	};

	$scope.onCreateNewItemClick = () => {
		$scope.isCreatingNewItem = true;
		$scope.newItemName = '';
	};


	$scope.onSaveItemClick = () => {
		if(!$scope.newItemName) { return }

		if($scope.isCreatingNewItem) {															//createItem
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
		newTask.isCompleted = false;
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


	$scope.getItems();

}