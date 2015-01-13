// app/routes/user.js

/**
 * Modul dependencies
 */
var User = require('./../models/user');
var Project = require('./../models/project');
var Profile = require('./../models/profile');

/**
 * Expose user routes
 */
module.exports = function(app, passport) {

    /**
     * Sign the user up based on their input using Passport.
     * Return an error message when something went wrong. 
     */
    app.post('/signup', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.json({ 
                error: 'Email and Password required' 
            });
        }

        var email = req.body.email;

        if (email.indexOf('han.nl') < 0) {
            return res.json({ 
                error: 'This is not a valid email address'
            });
        }

        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { 
                return res.json(err);
            }
            if (user.error) {   
                return res.json({ error: user.error });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }

                return res.json({ redirect: '/profile' });
            });
        })(req, res);
    });

    /**
     * Log the user in based on their input (email and password) using Passport.
     * Return an error message when something went wrong. 
     */
    app.post('/login', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { 
                return res.json(err);
            }
            if (user.error) {
                return res.json({ 
                    error: user.error 
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }

                return res.json({ redirect: '/profile' });
            });
        })(req, res);
    });
        
    /**
     * Log the current user out using password.
     */
    app.post('/logout', function(req, res) {
        req.logout();
        res.json({ redirect: '/logout' });
    });

    /**
     * Check if the current user is logged in. If so return the user else return 0.
     */
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    /**
     * Check if the current user is logged in and if he/she has an admin role. 
     * If so return the user else return 0.
     */
    app.get('/loggedinadmin', function(req, res) {
        res.send((req.isAuthenticated() && req.user.role == 'admin') ? req.user : '0');
    });

    /**
     * Get the userdata of the current logged in user.
     * @see isLoggedInAjax()
     */
    app.get('/api/userData', isLoggedInAjax, function(req, res) {
        User.findById(req.user.id, function (err, user) {
            if (err) {
                res.send(err);
            }

            Profile.findById(user.profileid, function (err, profile) {
                if (err) {
                    res.send(err);
                }

                var jsonObject = { user: user, projects: {}, profile: profile };

                Project.find({
                    user: user._id
                }, function (err, projects) {
                    if (err) {
                        res.send(err);
                    }

                    projects.forEach(function (project) {
                        jsonObject.projects[project._id] = project;
                    });

                    res.json(jsonObject);
                });
            });
        });
    });

    /**
     * Get all users from the database.
     */
    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users);
        });
    });

    /**
     * Get a yser based on the id provided in the request url
     */
    app.get('/api/users/:_id', function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.send(err);
            }

            var jsonObject = { user: user, projects: {} };

            Project.find({
                user: user._id
            }, function (err, projects) {
                if (err) {
                    res.send(err);
                }

                projects.forEach(function (project) {
                    jsonObject.projects[project._id] = project;
                });

                res.json(jsonObject);
            });
        });
    });

    /**
     * Update a user based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/users/:_id', isLoggedInAjax, function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.send(err);
            }

            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.profileid = req.body.profileid;
            user.studentnumber = req.body.studentnumber;
            user.email = req.body.email;
            user.picture = req.body.picture;
            user.bio = req.body.bio;
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }

                User.find(function (err, users) {
                    if (err) {
                        return res.send(err);
                    }

                    res.json(users);
                });
            });
        });
    });

    /**
     * Delete a user based on the id provided in the request.
     * @see isLoggedInAjax()
     */
    app.delete('/api/users/:_id', isLoggedInAjax, function (req, res) {
        User.remove({
            _id: req.params._id
        }, function (err, user) {
            if (err) {
                res.send(err);
            }

            User.find(function (err, users) {
                if (err) {
                    return res.send(err);
                }

                res.json(users);
            });
        });
    });

    /**
     * Count the number of users in the database.
     */
    app.get('/api/countUsers', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users.length);
        });
    });  
    
};

/**
 * Middleware to check if the user is logged in using ajax get request
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @param  {Function} next Next route
 * @return {Boolean} Return json if the user is not logged in else go the next route.
 */
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json({
            redirect: '/login' 
        });
    } else {
        next();
    }
}
