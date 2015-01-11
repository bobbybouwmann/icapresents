// app/routes/image.js

/**
 * Expose image routes
 */
module.exports = function(app) {

    app.post('/upload', function (req, res) {
        res.json(req.files.image);
    });
    
};
