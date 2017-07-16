const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const pollSchema = new Schema({
  title: { 
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  options: [{
    name: { type: String, required: true},
    votes: { type: Number, default: 0 }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

pollSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
