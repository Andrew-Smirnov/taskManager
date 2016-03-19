var mongoose = require('mongoose');
var Task = require('../db/task').Task;
var express = require('express');
var router = express.Router();


router.get('/:id', function(req, res) {
	var id = req.params.id;

	Task.find({item_Id: mongoose.Types.ObjectId(id)}, function(err, results) {
		if (err) { console.log(err); }

		res.send(results);
	});
});


router.post('/', function(req, res) {

	var task = new Task(req.body);
    task.save(function(err) {
        if (err) { console.log(err); }

        res.send('Task saved!');
    });

});


router.put('/:id', function(req, res) {
	var id = req.params.id;

	Task.update({_id: mongoose.Types.ObjectId(id)}, req.body, function(err) {
		if(err) { console.log(err); }

		res.send('Task updated!');
	})
})


router.delete('/:id', function(req, res) {
	var id = req.params.id;

	Task.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
		if(err) { console.log(err); }

		res.send('Task deleted!');
	})
})

module.exports = router;