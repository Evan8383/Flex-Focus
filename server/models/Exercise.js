const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
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

const Exercise = model('Exercise', exerciseSchema);
module.exports = Exercise;