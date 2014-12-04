// app/models/semester.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

var semesterSchema = mongoose.Schema({
    name: String,
    description: String,
    profileid: String
});

/**
 * Expose Semester model
 */
module.exports = mongoose.model('Semester', semesterSchema);
