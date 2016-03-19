var mongoose = require('mongoose');
var Item = require('../db/db').Item;
var express = require('express');
var router = express.Router();


router.post('/:id', function(req, res) {
	var id = req.params.id;

	Item.update({ _id: mongoose.Types.ObjectId(id) }, {
		$push: { subItems: req.body }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Task added!');
	});
});

router.put('/:id/:taskName', function(req, res) {
	var id = req.params.id;
	console.log(req.params.taskName);
	if(req.params.taskName == undefined) {																	//task to update
		var taskName = req.params.taskName;

		Item.update({ _id: mongoose.Types.ObjectId(id), "subItems.taskName": taskName}, {
			$set: { "subItems.$": req.body }
		}, function(err) {
			if(err) { console.log(err); }

			res.send('Task updated!');
		});
	}
	else {																							//task to delete
		console.log(req.body);
		Item.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { subItems: req.body }
		}, function(err) {
		if(err) { console.log(err); }

		res.send('Item deleted!');
	})
	}
});

/*router.put('/:id', function(req, res) {
	var id = req.params.id;

	console.log(req.body);
	Item.update({ _id: mongoose.Types.ObjectId(id) }, {
		$set: { subItems: req.body }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Item deleted!');
	})

});
*/

module.exports = router;