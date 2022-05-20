const mongoose = require('mongoose')

const EvalutaionSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      trim: true,
      required: [true, 'Please provide group Id'],
    },
    evaluationType: {
      type: String,
      enum: ['document', 'presentation'],
      required: [true, 'Please provide evaluation type'],
    },
    markScheme: {
      type: Array,
      required: [true, 'Please provide evaluation scheme'],
    },
    totalMark: {
      type: Number,
      required: [true, 'Please provide total marks'],
    },
    evaluateBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Evaluation', EvalutaionSchema)
