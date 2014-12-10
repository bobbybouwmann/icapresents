// app/routes/project.js

/**
 * Model dependencies
 */
var Project = require('./../models/project');

/**
 * Expose project routes
 */
module.exports = function(app, passport) {

    /**
     * Get all the projects from the database.
     */
    app.get('/api/projects', function (req, res) {
        Project.find(function (err, projects) {
            if (err) {
                return res.send(err);
            }

            res.json(projects);
        });
    });

    /**
     * Create a project based on the data provided in the request 
     * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/projects', isLoggedInAjax, function (req, res) {
        Project.create({
            title: req.body.title,
            content: req.body.content,
            grade: req.body.grade,
            students: req.body.students,
            semester: req.body.semester
        }, function (err, project) {
            if (err) {
                res.send(err);
            }

            res.json(project);
        });
    });

    /**
     * Get a project based on the id provided in the request url
     */
    app.get('/api/projects/:_id', function (req, res) {
        Project.findById(req.params._id, function (err, project) {
            if (err) {
                res.send(err);
            }

            res.json(project);
        });
    });

    /**
     * Update a project based on the id provided in the request url and 
     * the data provided in the request.
     * @see isLoggedInAjax()
     */
    app.put('/api/projects/:_id', isLoggedInAjax, function (req, res) {
        Project.findById(req.params._id, function (err, test) {
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

                Project.find(function(err, projects) {
                    if (err) {
                        res.send(err);
                    }

                    res.json(projects);
                });
            });
        });
    });
    
    /**
     * Delete a project based on the id provided in the request.
     * @see isLoggedInAjax()
     */
    app.delete('/api/projects/:_id', isLoggedInAjax, function (req, res) {
        Project.remove({
            _id: req.params._id
        }, function (err, project) {
            if (err) {
                res.send(err);
            }

            Project.find(function(err, projects) {
                if (err) {
                    res.send(err);
                }

                res.json(projects);
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

