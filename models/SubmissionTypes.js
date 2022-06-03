const mongoose = require('mongoose')

const SubTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: [3, 'Submission Name Should Have more than 4 character'],
      maxlength: [50, 'Submission Name Should Have less than 50 character'],
    },
    dueDate: {
      type: String,
      required: [true, 'Please provide Date'],
    },
    type: {
      type: String,
      enum: ['document', 'presentation'],
      required: [true, 'Please provide Type'],
    },
    description: {
      type: String,
      maxlength: [100, 'description length cant exceed 100 characters'],
    },
    submitUsers: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('SubmissionTypes', SubTypeSchema)
