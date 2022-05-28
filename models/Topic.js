const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      trim: true,
      required: [true, 'Please provide topic name'],
    },
    groupId: {
      type: String,
      trim: true,
      required: [true, 'Please provide group id'],
    },
    researchArea: {
      type: String,
      trim: 'true',
      required: [true, 'Please provide research area'],
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    supervisor: {
      id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approve', 'reject'],
      },
    },
    coSupervisor: {
      id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approve', 'reject'],
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Topic', TopicSchema)
