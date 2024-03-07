const { Schema, model } = require('mongoose');

// const validateWorkoutCategory = (workoutCategory) => {
//   const workoutCategoryRegex = /^(Strength|Hypertrophy|Endurance)$/;
//   return workoutCategoryRegex.test(workoutCategory);
// }

const assignedExerciseSchema = new Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    // * Subject to change
    ref: 'Exercise'
  },
  goalSets: {
    type: Number,
    required: false
  },
  goalReps: {
    type: Number,
    required: false
  },
  goalWeight: {
    type: Number,
    required: false
  },
  performance: [{
    type: Schema.Types.ObjectId,
    ref: 'Performance'
  }]
  });


const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: true
  },
  workoutCategory: {
    type: String,
    required: false,
    // validate: [validateWorkoutCategory, 'Workout category is not valid']
  },
  workoutDescription: {
    type: String,
    required: false
  },
  workoutNotes: {
    type: String,
    required: false
  },
  assignedExercises: [{
    type: Schema.Types.ObjectId,
    ref: 'AssignedExercise'
  }]
});

const AssignedExercise = model('AssignedExercise', assignedExerciseSchema);
const Workout = model('Workout', workoutSchema);

module.exports = {Workout, AssignedExercise};