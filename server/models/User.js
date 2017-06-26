const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: { 
    type: String,
    required: true,
    unique: true 
  },
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('Poll', userSchema);

module.exports = User;
