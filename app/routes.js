// app/routes.js

/**
 * Module dependencies
 */
var path = require('path');
var fs = require('fs');

/**
 * Modul dependencies
 */
var Test = require('./models/test');
var Collection = require('./models/collection');
var User = require('./models/user');
var Project = require('./models/project');

/**
 * Expose routes
 */
module.exports = function(app, passport) {

    /**
     * Log the current user out using password
     */
	app.post('/logout', function(req, res) {
		req.logout();
		res.json({ redirect: '/logout' });
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

    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

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

            var jsonObject = { user: user, projects: {} };

            Project.find({
                students: user._id
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

    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users);
        });
    });

    app.get('/api/users/:_id', function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.send(err);
            }

            var jsonObject = { user: user, projects: {} };

            Project.find({
                students: user._id
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
     * Delete a collection based on the id provided in the request.
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

    app.get('/api/countUsers', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users.length);
        });
    });    

    /**
     * Get all the collections from the database.
     * @see isLoggedInAjax()
     */
    app.get('/api/collections', isLoggedInAjax, function (req, res) {
    	Collection.find(function (err, collections) {
    		if (err) {
    			return res.send(err);
    		}

    		res.json(collections);
    	});
    });

    /**
     * Create a collection based on the data provided in the request 
     * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/collections', isLoggedInAjax, function (req, res) {    	
    	Collection.create({
    		title: req.body.title,
    		description: req.body.description
    	}, function (err, collection) {
    		if (err) {
    			res.send(err);
    		}

    		Collection.find(function(err, collections) {
                if (err) {
                    res.send(err);
                }

                res.json(collections);
            });
    	});
    });

    /**
     * Get a collection based on the id provided in the request url
     * @see isLoggedInAjax()
     */
    app.get('/api/collections/:_id', isLoggedInAjax, function (req, res) {
    	Collection.findById(req.params._id, function (err, collection) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(collection);
    	});
    });

    /**
     * Update a collection based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/collections/:_id', isLoggedInAjax, function (req, res) {
    	Collection.findById(req.params._id, function (err, collection) {
    		if (err) {
    			res.send(err);
    		}

    		collection.title = req.body.title;
    		collection.description = req.body.description;
    		collection.save(function (err) {
    			if (err) {
    				res.send(err);
    			}

    			res.json(collection);
    		});
    	});
    });

    /**
     * Delete a collection based on the id provided in the request.
     * @see isLoggedInAjax()
     */
    app.delete('/api/collections/:_id', isLoggedInAjax, function (req, res) {
    	Collection.remove({
    		_id: req.params._id
    	}, function (err, collection) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(collection);
    	});
    });

    /**
     * Get all the tests from the database.
     * @see isLoggedInAjax()
     */
    app.get('/api/tests', isLoggedInAjax, function (req, res) {
    	Test.find(function (err, tests) {
    		if (err) {
    			return res.send(err);
    		}

    		res.json(tests);
    	});
    });

    /**
     * Create a test based on the data provided in the request 
     * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/tests', isLoggedInAjax, function (req, res) {
    	Test.create({
    		title: req.body.title,
    		url: req.body.url,
    		method: req.body.method,
    		param: req.body.param,
    		data: req.body.data,
            collectionid: req.body.collectionid
    	}, function (err, test) {
    		if (err) {
    			res.send(err);
    		}

    		Test.find(function(err, tests) {
                if (err) {
                    res.send(err);
                }

                res.json(tests);
            });
    	});
    });

    /**
     * Get a test based on the id provided in the request url
     * @see isLoggedInAjax()
     */
    app.get('/api/tests/:_id', isLoggedInAjax, function (req, res) {
    	Test.findById(req.params._id, function (err, test) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(test);
    	});
    });

    /**
     * Update a test based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/tests/:_id', isLoggedInAjax, function (req, res) {
    	Test.findById(req.params._id, function (err, test) {
    		if (err) {
    			res.send(err);
    		}

    		test.title = req.body.title;
    		test.url = req.body.url;
    		test.method = req.body.method;
    		test.param = req.body.param;
    		test.data = req.body.data;
            test.collectionid = req.body.collectionid;
    		
            test.save(function (err) {
    			if (err) {
    				res.send(err);
    			}

    			res.json(test);
    		});
    	});
    });
    
    /**
     * Delete a test based on the id provided in the request.
     * @see isLoggedInAjax()
     */
    app.delete('/api/tests/:_id', isLoggedInAjax, function (req, res) {
    	Test.remove({
    		_id: req.params._id
    	}, function (err, test) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(test);
    	});
    });

    /**
     * Get all the tests from the database where the collection id is 
     * the same as the id in the request.
     * @see isLoggedInAjax()
     */
    app.get('/api/collectionTests/:_id', isLoggedInAjax, function (req, res) {
        Test.find({
            collectionid: req.params._id
        }, function (err, tests) {
            if (err) {
                res.send(err);
            }

            res.json(tests);
        });
    });

    app.post('/upload', function (req, res) {
        res.json(req.files.image);
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

/**
 * Middleware to check if the user is logged
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @param  {Function} next Next route
 * @return {Boolean} Return json if the user is not logged in else go the next route.
 */
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
