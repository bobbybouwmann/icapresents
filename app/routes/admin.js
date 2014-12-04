// app/routes/admin.js

/**
 * Model dependencies
 */
var Profile = require('./../models/profile');
var Semester = require('./../models/semester');

/**
 * Expose admin routes
 */
module.exports = function (app, passport) {

    /**
     * Get all the profile from the database.
     */
    app.get('/api/profiles', function (req, res) {
        Profile.find(function (err, profiles) {
            if (err) {
                return res.send(err);
            }

            res.json(profiles);
        });
    });

    /**
     * Create a profile based on the data provided in the request
     * * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/profiles', isLoggedInAjax, function (req, res) {
        Profile.create({
            name: req.body.name,
            description: req.body.description            
        }, function (err, profile) {
            if (err) {
                res.send(err);
            }

            Profile.find(function(err, profiles) {
                if (err) {
                    res.send(err);
                }

                res.json(profiles);
            });
        });
    });

    /**
     * Get a profile based on the id provided in the request url
     */
    app.get('/api/profiles/:_id', function (req, res) {
        Profile.findById(req.params._id, function (err, profile) {
            if (err) {
                res.send(err);
            }

            res.json(profile);
        });
    });

    /**
     * Update a profile based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/profiles/:_id', isLoggedInAjax, function (req, res) {
        Profile.findById(req.params._id, function (err, profile) {
            if (err) {
                res.send(err);
            }

            profile.name = req.body.name;
            profile.description = req.body.description;

            profile.save(function (err) {
                if (err) {
                    res.send(err);
                }

                Profile.find(function(err, profiles) {
                    if (err) {
                        res.send(err);
                    }

                    res.json(profiles);
                });
            });            
        }); 
    });

    /**
     * Delete a profile based on the id provided in the request url.
     * @see isLoggedInAjax()
     */
    app.delete('/api/profiles/:_id', isLoggedInAjax, function (req, res) {
        Profile.remove({
            _id: req.params._id
        }, function (err, profile) {
            if (err) {
                res.send(err);
            }

            Profile.find(function(err, profiles) {
                if (err) {
                    res.send(err);
                }

                res.json(profiles);
            });
        });
    });

    /**
     * Get all the semesters from the database.
     */
    app.get('/api/semesters', function (req, res) {
        Semester.find(function (err, semesters) {
            if (err) {
                return res.send(err);
            }

            res.json(semesters);
        });
    });

    /**
     * Create a semester based on the data provided in the request
     * * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/semesters', isLoggedInAjax, function (req, res) {
        Semester.create({
            name: req.body.name,
            description: req.body.description,
            profileid: req.body.profileid
        }, function (err, semester) {
            if (err) {
                res.send(err);
            }

            Semester.find(function(err, semesters) {
                if (err) {
                    res.send(err);
                }

                res.json(semesters);
            });
        });
    });

    /**
     * Get a semester based on the id provided in the request url
     */
    app.get('/api/semesters/:_id', function (req, res) {
        Semester.findById(req.params._id, function (err, semester) {
            if (err) {
                res.send(err);
            }

            res.json(semester);
        });
    });

    /**
     * Update a semester based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/semesters/:_id', isLoggedInAjax, function (req, res) {
        Semester.findById(req.params._id, function (err, semester) {
            if (err) {
                res.send(err);
            }

            semester.name = req.body.name;
            semester.description = req.body.description;
            semester.profileid = req.body.profileid;

            semester.save(function (err) {
                if (err) {
                    res.send(err);
                }

                Semester.find(function(err, semesters) {
                    if (err) {
                        res.send(err);
                    }

                    res.json(semesters);
                });
            });            
        }); 
    });

    /**
     * Delete a semester based on the id provided in the request url.
     * @see isLoggedInAjax()
     */
    app.delete('/api/semesters/:_id', isLoggedInAjax, function (req, res) {
        Semester.remove({
            _id: req.params._id
        }, function (err, semester) {
            if (err) {
                res.send(err);
            }

            Semester.find(function(err, semesters) {
                if (err) {
                    res.send(err);
                }

                res.json(semesters);
            });
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
