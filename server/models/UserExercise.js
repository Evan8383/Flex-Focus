const { Schema, model } = require('mongoose');

const userExerciseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true
    },
    name : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    muscleGroup : {
        type: String,
        required: true
    },
    subMuscleGroup : {
        type: String
    },
    description : {
        type: String,
        required: true
    }
});

const UserExercise = model('UserExercise', userExerciseSchema);
module.exports = UserExercise;