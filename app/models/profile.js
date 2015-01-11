// app/models/profile.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Profile schema
 */
var profileSchema = mongoose.Schema({
    name: String,
    description: String,
    main: String
});

/**
 * Expose Profile model
 */
module.exports = mongoose.model('Profile', profileSchema);
