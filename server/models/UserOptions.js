const { Schema, model } = require('mongoose')

const userOptionSchema = new Schema({
  darkMode: {
    type: Boolean,
    default: false,
    required: false
  },
  fitnessGoal: {
    type: String,
    default: null,
    required: false
  },
});

const UserOptions = model('UserOptions', userOptionSchema);

module.exports = UserOptions;