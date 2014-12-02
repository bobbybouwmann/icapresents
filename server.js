var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');


var port = process.env.PORT || 3000;
var database = require('./config/database.js')


// configuration ===============================================================
mongoose.connect(database.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up express application
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())
app.use(methodOverride())

// required for passport
app.use(session({ secret: 'yoursecretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(__dirname + '/public'))
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('ready captain, on deck ' + port);
