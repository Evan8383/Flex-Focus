const { Schema, model } = require('mongoose');

const performanceSchema = new Schema({
  numberSet: {
    type: Number,
    required: true,
  },
  dropSet: {
    type: Boolean,
    required: false,
    default: false
  },
  numberReps: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: true
  },
  dateCompleted: {
    type: Date,
    required: false
  }
}, { timestamps: true });

const Performance = model('Performance', performanceSchema);
module.exports = Performance;