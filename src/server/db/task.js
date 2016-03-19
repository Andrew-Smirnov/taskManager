var mongoose = require('mongoose');

var Task = mongoose.model('Task', {
	taskName: String,
	description: String,
	isCompleted: Boolean,
	item_Id: mongoose.Schema.Types.ObjectId
});

module.exports.Task = Task;