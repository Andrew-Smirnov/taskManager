var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName: String,
	username: String,
    password: String,
    email: String,
    canReceiveItems: Boolean,
    sharedItems: Array, 
    created_at: {type: Date, default: Date.now}
});

module.exports.User = User;

exports.findByUsername = function(userName, callback){
User.findOne({ user_name: userName}, function(err, user){
        if(err){
            return callback(err);
        }
return callback(null, user);
});
}

exports.findById = function(id, callback){
User.findById(id, function(err, user){
        if(err){
           return callback(err);
        }
         return callback(null, user);
    });
}