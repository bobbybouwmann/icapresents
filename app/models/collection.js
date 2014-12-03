// app/models/collection.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Collection schema
 */
var collectionSchema = mongoose.Schema({
    title: String,
    description: String
});

/**
 * Exspose Collection model
 */
module.exports = mongoose.model('Collection', collectionSchema);
