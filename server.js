var express = require('express');
var app = express();
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var request = require('request');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var database = require('./config/database.js');

console.log(env);

mongoose.connect(database[env]); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(multer({
    dest: './images/uploads/'
}));
app.use(bodyParser());
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'yoursecretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(__dirname + '/public'))
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/project.js')(app, passport); // Load the routes for projects.
require('./app/routes/admin.js')(app, passport); // Load the routes for the admin.

/**
 * Default route.
 */
app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});

request.post('http://localhost:3000/signup', { 
	form: { 
		email: "admin@han.nl",
		password: "admin",
		role: "admin" 
	}
}, function (err, response, body) {
	if (err) {
		console.log('Error: ' + err);
	}
    
    console.log(body);
});

// launch ======================================================================
app.listen(port);
console.log('ready captain, on deck ' + port);

/**
 * Expose application
 */
module.exports = app;
