var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  title: { 
    type: String,
    required: true,
    unique: true 
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

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
