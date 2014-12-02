// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var testSchema = mongoose.Schema({

    title: String,
    url: String,
    method: String,
    param: String,
    data: String,
    collectionid: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Test', testSchema);