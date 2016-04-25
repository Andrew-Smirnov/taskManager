var mongoose = require('mongoose');
var User = require('../db/user').User;
var express = require('express');
var router = express.Router();


router.put('/:id', function(req, res) {
	var id = req.params.id;

	User.find({'_id': mongoose.Types.ObjectId(id)}, function(err, user) {
		var error = {};

		if (user[0].username === req.body.username && user[0].email === req.body.email) {	//user doesn't change login and email
			console.log('user doesnt change login and email');
			User.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { firstName: req.body.firstName,
					canReceiveItems: req.body.canReceiveItems
			 }
			}, function(err) {
				if(err) { console.log(err); }

				res.send('User info updated!');
			})
		}
		else {
			if (user[0].username === req.body.username) {
				console.log('user changes email');
				User.find({'email' : req.body.email}, function(err, result) {
					if (result[0]) {
						error.incorrectEmail = 'User already exists with email: '+req.body.email;
					}
				})
			}
			if (user[0].email === req.body.email) {
				console.log('user changes login');
				User.find({'username' : req.body.username}, function(err, result) {
					if (result[0]) {
						error.incorrectLogin = 'User already exists with login: '+req.body.username;
					}
				})
			}

			if (user[0].username != req.body.username && user[0].email != req.body.email) {
				console.log('user changes login and email');
				error.incorrectEmail = 'User already exists with email: '+req.body.email;
				error.incorrectLogin = 'User already exists with login: '+req.body.username;
			}

			setTimeout(function() {
				if (error.hasOwnProperty('incorrectEmail') || error.hasOwnProperty('incorrectLogin')) {
					error.state = 'failure';
					res.send(error);
				}
				else {
					User.update({ _id: mongoose.Types.ObjectId(id) }, {
					$set: { firstName: req.body.firstName,
							username: req.body.username,
							email: req.body.email,
							canReceiveItems: req.body.canReceiveItems
					 }
					}, function(err) {
						if(err) { console.log(err); }

						res.send('User info updated!');
					})
				}
			}, 500)
		}
	});

})


module.exports = router;