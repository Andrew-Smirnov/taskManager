var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');

var Item = mongoose.model('Item', {
	task: String,
	shared: Boolean,
	user_Id: mongoose.Schema.Types.ObjectId
});

module.exports.Item = Item;