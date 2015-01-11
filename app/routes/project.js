// app/routes/project.js

// Model dependencies
var Project = require('./../models/project');
var User = require('./../models/user');

/**
 * Expose project routes.
 */
module.exports = function(app) {

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
     * 
     * @see isLoggedInAjax()
     */
    app.post('/api/projects', isLoggedInAjax, function (req, res) {
        var students = String(req.body.students).replace(/\n/g, ",");
        var studentArray = students.split(',');

        Project.create({
            user: req.user._id,
            title: req.body.title,
            content: req.body.content,
            grade: req.body.grade,
            semesterid: req.body.semesterid,
            banner: req.body.banner,
            logo: req.body.logo,
            students: studentArray
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

            var jsonObject = { project: project, users: {} };

            User.find({ 
                email: { $in: project.students }
            }, function (err, users) {
                console.log(users.length);

                if (err) {
                    res.send(err);
                }

                users.forEach(function (user) {
                    jsonObject.users[user.email] = user;
                });                    

                res.json(jsonObject);
            }); 
        });
    });

    /**
     * Update a project based on the id provided in the request url and 
     * the data provided in the request.
     * 
     * @see isLoggedInAjax()
     */
    app.put('/api/projects/:_id', isLoggedInAjax, function (req, res) {
        Project.findById(req.params._id, function (err, project) {
            if (err) {
                res.send(err);
            }
            
            var students = String(req.body.students).replace(/\n/g, ",");
            var studentArray = students.split(',');

            project.user = project.user;
            project.title = req.body.title;
            project.content = req.body.content;
            project.semesterid = req.body.semesterid;
            project.banner = req.body.banner;
            project.logo = req.body.logo;
            project.students = studentArray;
            
            project.save(function (err) {
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
     * 
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

    /**
     * Increase the vote of a project based on the id provided in the request.
     */
    app.post('/api/projects/votes/:_id', function (req, res, done) {
        Project.findById(req.params._id, function (err, project) {
            if (err) {
                res.send(err);
            }

            project.votes = project.votes + 1;
            project.save(function (err) {
                if (err) {
                    res.send(err);
                }

                console.log(project);
            });
        })
    });

};

/**
 * Middleware to check if the user is logged in using ajax get request.
 * 
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
