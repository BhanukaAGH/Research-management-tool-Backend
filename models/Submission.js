const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema(
  {
    submitUserId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submissionId: {
      type: mongoose.Types.ObjectId,
      ref: 'SubmissionTypes',
      required: true,
    },
    submissionName: {
      type: String,
      required: [true, 'Please provide submission name'],
    },
    submissionDescription: {
      type: String,
      required: [true, 'Please provide submission description'],
    },
    submissionType: {
      type: String,
      enum: ['document', 'presentation'],
      required: [true, 'Please provide submission type'],
    },
    submitFileName: {
      type: String,
      required: true,
    },
    submitDocumentUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Submission', SubmissionSchema)
