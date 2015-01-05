// app/models/project.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Project schema
 */
var projectSchema = mongoose.Schema({
    title: String,
    banner: String,
    logo: String,
    content: String,
    semesterid: String,
    students: [String],
    updated: { type: Date, default: Date.now }
});

/**
 * Expose Project model
 */
module.exports = mongoose.model('Project', projectSchema);
