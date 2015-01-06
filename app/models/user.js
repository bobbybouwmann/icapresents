// app/models/user.js

/**
 * Module dependencies
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/**
 * User schema
 */
var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    profileid: String,
    studentnumber: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'normal' },
    picture: String
});

/**
 * Generate a hash using bcrypt.
 * @param  {String} password Password provided by user.
 * @return {String} Hashed password.
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Compare provided password with saved password
 * @param  {String} password Password provided by user.
 * @return {Boolean} Returns if the passwords match. 
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Expose User model
 */
module.exports = mongoose.model('User', userSchema);
