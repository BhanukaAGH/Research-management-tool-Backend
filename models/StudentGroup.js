const mongoose = require("mongoose");

// const validator = require('validator')

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
  Panelmember: [
    {
      Name: {
        type: String,
        trim: true,
        default: "Not Allocated",
      },
      MemberID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        trim: true,
      },
    },
  ],
});

module.exports = mongoose.model("StudentGroup", StudentGroupSchema);
