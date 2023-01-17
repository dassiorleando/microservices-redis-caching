/**
 * User model.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    language: String,
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', function (next) {
    var currentDate = new Date();
  
    // Edit the updatedAt field to the current date
    if (!this.keepUpdatedDate) this.updatedAt = currentDate;

    // if createdAt doesn't exist, add to that field
    if (!this.createdAt) this.createdAt = currentDate;

    next();
});

var Empty = mongoose.model('Empty', userSchema);

module.exports = Empty;
