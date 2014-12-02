// app/models/test.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Test schema
 */
var testSchema = mongoose.Schema({
    title: String,
    url: String,
    method: String,
    param: String,
    data: String,
    collectionid: String
});

/**
 * Expose Test model
 */
module.exports = mongoose.model('Test', testSchema);