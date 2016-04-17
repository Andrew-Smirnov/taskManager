var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./src/server/routes');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser'); //для поддержки сеансов


var passport = require('passport'); //Используем passportjs для аутентификации
var LocalStrategy = require('passport-local').Strategy; //используем стратегию паспорта
var session = require('express-session'); // для поддержки сеансов

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./src/server/passport/passport-init');
initPassport(passport);


var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});
