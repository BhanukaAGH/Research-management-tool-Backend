const mongoose = require('mongoose')

const MarkSchemeSchema = mongoose.Schema(
  {
    markSchemeName: {
      type: String,
      required: [true, 'Please MarkScheme name'],
      minlength: [3,'MarkScheme Name Should Have more than 4 character'],
      maxlength: [10,'MarkScheme Name Should Have less than 10 character'],
    },
    Description: {
      type: String,
      maxlength: [50,"description length cant exceed 50 characters"],
    },
    markScheme: [
      {
        criteria: {
          type: String,
          trim: true,
          //required:[true, 'Please provide criteria'],
          default: 'empty',
        },
        allocatedMark: {
          type: Number,
          //required:[true, 'Please provide  AllocatedMark'],
          default: 0,
        },
      },
    ],
    schemeType: {
      type: String,
      enum: ['document', 'presentation'],
      required: [true, 'Please provide schema type'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('MarkScheme', MarkSchemeSchema)
