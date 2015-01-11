// server.js

/**
 * Module dependencies
 */
var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var request = require('request');

/**
 * Initialize application
 */
var app = express();

/** 
 * Set environment
 */
var env = process.env.NODE_ENV || 'development';

/**
 * Set port
 */
var port = process.env.PORT || 3000;

/**
 * Get databae configuration
 */
var database = require('./config/database.js');

/**
 * Connect to the database
 */
mongoose.connect(database[env]);

/**
 * Configure passport
 */
require('./config/passport')(passport);

/**
 * Set up application
 */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(multer({
    dest: './public/images/uploads/'
}));
app.use(bodyParser());
app.use(methodOverride());

/**
 * Set session for passport and initialize passport
 */
app.use(session({ secret: 'yoursecretsession' }));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Set public path for user
 */
app.use(express.static(__dirname + '/public'))

/**
 * Routes
 */
require('./app/routes/user.js')(app, passport); // Load the routes for users
require('./app/routes/project.js')(app); // Load the routes for projects
require('./app/routes/profile.js')(app); // Load the routes for profiles
require('./app/routes/semester.js')(app); // Load the routes for semesters
require('./app/routes/image.js')(app); // Load the routes for images

/**
 * If everything fails use default route
 */
app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});

/**
 * Generate admin user if it doesn't exist
 */
request.get('http://localhost:3000/api/countUsers', function (err, response, body) {
    if (err) {
        console.log('Error: ' + err);
    }

    if (body == '0') {
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
        });
    }
});

/**
 * Launch application on the configurated port
 */
app.listen(port);

/**
 * Expose application
 */
module.exports = app;
