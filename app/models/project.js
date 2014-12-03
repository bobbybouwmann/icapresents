// app/models/test.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Custom error messages
 */
var max = [10, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];
/**
 * Project schema
 */
var projectSchema = mongoose.Schema({
    title: String,
    content: String,
    updated: { type: Date, default: Date.now },
    grade: { type: Number, max: max },
    students: String,
    semesterid: String
});

/**
 * Expose Project model
 */
module.exports = mongoose.model('Project', projectSchema);
