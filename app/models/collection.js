// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var collectionSchema = mongoose.Schema({

    title: String,
    description: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Collection', collectionSchema);