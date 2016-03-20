var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');

var Item = mongoose.model('Item', {
	task: String,
	subItems: Array
});

module.exports.Item = Item;