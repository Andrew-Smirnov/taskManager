var mongoose = require('mongoose');
var Item = require('../db/db').Item;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Item.find(function(err, results) {
		if (err) { console.log(err); }

		res.send({todos: results});
	});
});

router.post('/', function(req, res) {
    var item = new Item(req.body);
    item.save(function(err) {
        if (err) { console.log(err); }

        res.send('ToDo saved!');
    });
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	if(req.body.task != undefined) {
		Item.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { task: req.body.task }
		}, function(err) {
			if(err) { console.log(err); }

			res.send('Item updated!');
		})
	}
	else {
		Item.update({ _id: mongoose.Types.ObjectId(id) }, {
			$push: { subItems: req.body }
		}, function(err) {
			if(err) { console.log(err); }

			res.send('Task added!');
		})
	}
})

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Item.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
		if(err) { console.log(err); }

		res.send('Item deleted!');
	})
})

module.exports = router;