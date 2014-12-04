// config/passport.js

/**
 * Module dependencies
 */
var LocalStrategy = require('passport-local').Strategy;

/**
 * Model dependencies
 */
var User = require('../app/models/user');

/**
 * Expose passport configuration
 */
module.exports = function(passport) {

    /**
     * Password session setup: serialize the user for the session
     */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    /**
     * Password session setup: deserialize the user
     */
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /**
     * Passport local login
     */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        process.nextTick(function () {
            User.findOne({ 
                'local.email': email 
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, { 
                        error: 'Oops! This user does not exists!'
                    });
                }

                if (!user.validPassword(password)) {
                    return done(null, { 
                        error: 'Oops! This user does not exists!'
                    });
                } 

                else {
                    return done(null, user);
                }
            });
        });

    }));

    /**
     * Passport local signup
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        if (email) {           
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        }

        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 
                    'local.email':  email 
                }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, { 
                            error: 'Oops! This email already exists!'
                        });
                    } else {
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err) {
                                 throw err;
                             }

                            return done(null, newUser);
                        });
                    }
                });
            } else {
                return done(null, req.user);
            }
        });
    }));
};
