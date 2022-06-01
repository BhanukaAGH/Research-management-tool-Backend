const express = require("express");
const router = express.Router();
const panelController = require("../controllers/panelController");

router.route("/getAcceptTopics").get(panelController.getAcceptTopics);
router
  .route("/getAcceptTopicsByPanel")
  .get(panelController.getAcceptTopicsByPanelMember);
router.route("/getTopicStatus/:id").get(panelController.getTopicStatus);
router.route("/getGroupDetails/:id").get(panelController.getGropudetails);
router
  .route("/getSubmittedDocument/:id")
  .get(panelController.getSubmissionDocument);
router.route("/topicAcceptOrReject").post(panelController.createTopicAccept);

router.route("/sendFeedback").post(panelController.senEmail);

module.exports = router;
