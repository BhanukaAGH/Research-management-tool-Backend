const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema(
  {
    submitUserId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submissionTypeId: {
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
    submitDocumentUrl: {
      type: String,
      required: [true, 'please upload your document'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Submission', SubmissionSchema)
