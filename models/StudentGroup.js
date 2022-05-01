const mongoose = require('mongoose')

// const validator = require('validator')

const StudentGroupSchema = mongoose.Schema({
  groupID: {
    type: Number,
    required: true,
  },

  leader: {
    name: {
      type: String,
      required: true,
    },
    studentID: {
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
    studentID: {
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
    studentID: {
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
    studentID: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
})

module.exports = mongoose.model('StudentGroup', StudentGroupSchema)