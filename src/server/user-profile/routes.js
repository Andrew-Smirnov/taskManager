var mongoose = require('mongoose');
var User = require('../db/user').User;
var express = require('express');
var router = express.Router();


router.put('/:id', function(req, res) {
	var id = req.params.id;

	User.find({'_id': mongoose.Types.ObjectId(id), 'email': req.body.email}, function(err, results) {
		if (results.length === 0){
			var changesEmail = true;
			User.find({'email': req.body.email}, function(err, results) {
				if (results.length > 0) {
					res.send('email already exists')
				}
				else {
					User.update({ _id: mongoose.Types.ObjectId(id) }, {
					$set: { username: req.body.username,
							email: req.body.email,
							canReceiveItems: req.body.canReceiveItems
					 }
					}, function(err) {
						if(err) { console.log(err); }

						res.send('User info updated!');
					})

				}
			})
		}
		else {
			var changesEmail = false;
			User.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { username: req.body.username,
					email: req.body.email,
					canReceiveItems: req.body.canReceiveItems
			 }
			}, function(err) {
				if(err) { console.log(err); }

				res.send('User info updated!');
			})
		}

		
	})
	//console.log(changesEmail);
		

	/*User.update({ _id: mongoose.Types.ObjectId(id) }, {
		$set: { username: req.body.username,
				email: req.body.email,
				canReceiveItems: req.body.canReceiveItems
		 }
	}, function(err) {
		if(err) { console.log(err); }

		res.send('User info updated!');
	})*/
})


module.exports = router;