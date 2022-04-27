const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema(
  {
    topicName: {
      type: 'String',
      trim: true,
      required: [true, 'Please provide topic name'],
    },
    researchArea: {
      type: 'String',
      trim: 'true',
      required: [true, 'Please provide research area'],
    },
    status: {
      type: 'String',
      default: 'pending',
      enum: ['pending', 'approve', 'reject'],
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Topic', TopicSchema)
