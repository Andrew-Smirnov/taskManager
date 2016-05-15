var mongoose = require('mongoose');
var User = require('../db/user').User;
var express = require('express');
var router = express.Router();


router.get('/findUser/:email', function(req, res){
	var userEmail = req.params.email;

	User.find({email: userEmail, canReceiveItems: true}, function(err, results) {
		if (err) { console.log(err); }
		if (results.length === 0) {		//проверить что имаил не каррент юзера
			res.send({state: 'failure', shareError: 'No user with such email or user doesnt allow send items to him'});
		}
		else {

			res.send({state: 'success', user: results[0]});
		}
		
	})

});

router.post('/addItem/:id', function(req, res){
	var id = req.params.id;

	User.update({ _id: mongoose.Types.ObjectId(id) }, {
		$push: { sharedItems: req.body }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Item shared!');
	})
});

router.put('/editTask/:userId/:itemPos/:taskPos/:state', function(req, res){
	var userId = req.params.userId;
	var itemPos = req.params.itemPos.toString();
	var taskPos = req.params.taskPos.toString();
	var state = req.params.state;
	if(state === 'true')
		state = 1;
	else
		state = 0;
	var field = "sharedItems."+itemPos+".subItems."+taskPos+".isCompleted";
	var obj={};
	obj[field] = state;

	User.update({ _id: mongoose.Types.ObjectId(userId) }, {
		$set: obj 
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Item updated!');
	})
});

router.delete('/deleteItem/:userId/:itemId', function(req, res){
	var userId = req.params.userId;
	var itemId = req.params.itemId;

	User.update({ _id: mongoose.Types.ObjectId(userId) }, {
		$pull: { 'sharedItems': { '_id': itemId} }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('Item deleted!');
	})
});

module.exports = router;