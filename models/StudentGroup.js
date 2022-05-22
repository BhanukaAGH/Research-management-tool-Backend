const mongoose = require('mongoose')

const StudentGroupSchema = mongoose.Schema({
  groupID: {
    type: String,
    required: true,
  },

  leader: {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  member2: {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  member3: {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  member4: {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  Panelmember: {
    type: String,
    default: 'Not Allocated',
  },
})

module.exports = mongoose.model('StudentGroup', StudentGroupSchema)
