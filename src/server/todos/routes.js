var mongoose = require('mongoose');
var Item = require('../db/item').Item;
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
	var id = req.params.id;
	Item.find({user_Id: mongoose.Types.ObjectId(id)}, function(err, results) {
		if (err) { console.log(err); }

		res.send({todos: results});
	});
});

router.post('/', function(req, res) {
	console.log(req.body);
    var item = new Item(req.body);
    item.save(function(err) {
        if (err) { console.log(err); }

        res.send('Item saved!');
    });
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	Item.update({ _id: mongoose.Types.ObjectId(id) }, {
		$set: { task: req.body.task }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Item updated!');
	})
})

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Item.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
		if(err) { console.log(err); }

		res.send('Item deleted!');
	})
})

module.exports = router;