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
    local: {
        email: String,
        password: String
    },
    role: { type: String, default: 'normal' }
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
    return bcrypt.compareSync(password, this.local.password);
};

/**
 * Expose User model
 */
module.exports = mongoose.model('User', userSchema);