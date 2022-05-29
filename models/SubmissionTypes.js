const mongoose = require('mongoose')

const SubTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: [3, 'Submission Name Should Have more than 4 character'],
      maxlength: [10, 'Submission Name Should Have less than 10 character'],
    },
    dueDate: {
      type: String,
      required: [true, 'Please provide Date'],
    },
    type: {
      type: String,
      required: [true, 'Please provide Type'],
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: [50, 'description length cant exceed 50 characters'],
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
