var Test = require('./models/test');
var Collection = require('./models/collection');

module.exports = function(app, passport) {

	app.post('/logout', function(req, res) {
		req.logout();
		res.json({ redirect: '/logout' });
	});

	app.post('/login', function(req, res, next) {
	    if (!req.body.email || !req.body.password) {
	        return res.json({ error: 'Email and Password required' });
	    }
	    passport.authenticate('local-login', function(err, user, info) {
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
		
	app.post('/signup', function(req, res, next) {
	    if (!req.body.email || !req.body.password) {
	        return res.json({ error: 'Email and Password required' });
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

	app.post('/connect/local', isLoggedInAjax, function(req, res, next) {
	    if (!req.body.email || !req.body.password) {
	        return res.json({ error: 'Email and Password required' });
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

    app.get('/api/userData', isLoggedInAjax, function(req, res) {
        return res.json(req.user);
    });

    app.get('/api/collections', isLoggedInAjax, function (req, res) {
    	Collection.find(function (err, collections) {
    		if (err) {
    			return res.send(err);
    		}

    		res.json(collections);
    	});
    });

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

    app.get('/api/collections/:_id', isLoggedInAjax, function (req, res) {
    	Collection.findById(req.params._id, function (err, collection) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(collection);
    	});
    });

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
    	})
    });

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

    app.get('/api/tests', isLoggedInAjax, function (req, res) {
    	Test.find(function (err, tests) {
    		if (err) {
    			return res.send(err);
    		}

    		res.json(tests);
    	});
    });

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

    app.get('/api/tests/:_id', isLoggedInAjax, function (req, res) {
    	Test.findById(req.params._id, function (err, test) {
    		if (err) {
    			res.send(err);
    		}

    		res.json(test);
    	});
    });

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
    	})
    });

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

	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
	
};

// route middleware to ensure user is logged in - ajax get
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json({
        	redirect: '/login' 
        });
    } else {
        next();
    }
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}