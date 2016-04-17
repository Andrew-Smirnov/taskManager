var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


var passport = require('passport'); //Используем passportjs для аутентификации
var LocalStrategy = require('passport-local').Strategy; //используем стратегию паспорта
var session = require('express-session'); // для поддержки сеансов


module.exports = function(passport){
// Passport должен иметь возможность сериализовывать и десериализовывать пользователей,чтобы
//Поддерживать устойчивые сеансы работы с системой
passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        done(null, user._id);
    });
passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user.username);
            done(err, user);
        });
    });

passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
        // Проверяем в mongo, существует ли пользователь с таким именем
        console.log(username);
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // В случае любой ошибки происходит возврат через метод done 
                    if (err)
                        return done(err);
                    // Имя пользователя не существует, логируем ошибку и делаем перенаправление назад
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false);                 
                    }
                    // Пользователь существует, но введен неверный пароль. Логируем ошибку 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // переадресация назад на страницу входа
                    }
                    // Имя пользователя и пароль верны, возвращаем пользователя через метод done
                    // что будет трактоваться как успех
                    console.log(user);
                    return done(null, user);
                }
            );
        }
    ));
passport.use('signup', new LocalStrategy({
            passReqToCallback : true // позволяет нам передать весь запрос в обратный вызов
        },
        function(req, username, password, done, email) {
// находим в mongo пользователя с указанным именем
            User.findOne({ 'username' :  username }, function(err, user) {
                // В случае любой ошибки возвращаемся через метод done
                if (err){
                    console.log('Error in SignUp: '+ err);
                    return done(err);
                }
                // уже существует
                if (user) {
                    console.log('User already exists with username: '+username);
                    return done(null, false);
                } else {
                    // если пользователя нет – создаем его
                    var newUser = new User();
                    // задаем локальные учетные данные пользователя
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.body.email;
                    // сохраняем пользователя
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        }
                        console.log(newUser.username + ' Registration succesful');    
                        return done(null, newUser);
                    });
                }
            });
        })
    );
var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Генерируем хеш при помощи bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
