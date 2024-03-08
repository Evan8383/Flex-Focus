const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    muscleGroup : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    }
});

const Exercise = model('Exercise', exerciseSchema);
module.exports = Exercise;