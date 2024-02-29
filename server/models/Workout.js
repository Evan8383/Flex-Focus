const { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: true
  },
  workoutCategory: {
    type: String,
    required: false
  },
  workoutSubCategory: [{
    type: String,
    required: false
  }],
  workoutDescription: {
    type: String,
    required: false
  },
  workoutNotes: {
    type: String,
    required: false
  },
  libraryExercises: [{
    type: Schema.Types.ObjectId,
    // * Subject to change
    ref: 'Exercise'
  }],
  customExercises: [{
    type: Schema.Types.ObjectId,
    // * Subject to change
    ref: 'CustomExercise'
  }]
});

const Workout = model('Workout', workoutSchema);
module.exports = Workout;