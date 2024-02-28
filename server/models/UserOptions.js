const { Schema, model } = require('mongoose')

// * IF ADDING OPTIONS, ALSO UPDATE RESOLVERS.JS SETUSEROPTIONS METHOD TO HAVE THE NEW OPTION.

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