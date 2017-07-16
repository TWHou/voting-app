const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: { 
    type: String,
    minlength: 3,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  }
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
