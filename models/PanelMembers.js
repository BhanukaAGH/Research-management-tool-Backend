const mongoose = require("mongoose");

const PanelTopicSchema = new mongoose.Schema({
  topicStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Accept", "Reject"],
  },

  groupID: {
    type: mongoose.Types.ObjectId,
    ref: "StudentGroup",
  },

  topicID: {
    type: mongoose.Types.ObjectId,
    ref: "Topic",
  },

  dateAppordeOrReject: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PanelTopic", PanelTopicSchema);
