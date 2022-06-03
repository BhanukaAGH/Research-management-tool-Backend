const Topic = require("../models/Topic");
const StudentGroup = require("../models/StudentGroup");
const PanelTopic = require("../models/PanelMembers");
const User = require("../models/User");
const Submission = require("../models/Submission");
const sgMail = require("@sendgrid/mail");

//get to accept topic by the panel member
exports.getAcceptTopics = async (req, res) => {
  try {
    const acceptTopics = await Topic.find({
      "supervisor.status": "approve",
    });

    if (acceptTopics.length != 0) {
      return res.json({
        status: "success",
        numberOfResults: acceptTopics.length,
        acceptTopics,
      });
    } else {
      return res.json({
        status: "No any accept topic yet",
        numberOfResults: acceptTopics.length,
        acceptTopics: [],
      });
    }
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

//get submission document by the student
exports.getSubmissionDocument = async (req, res) => {
  try {
    const checkGroup = await StudentGroup.findOne({ groupID: req.params.id });

    const { leader, member2, member3, member4 } = checkGroup;

    const mails = [leader.email, member2.email, member3.email, member4.email];
    const documents = await User.find({ email: { $in: mails } });

    const arr = documents.map((document) => document._id);

    const submittedDocument = await Submission.find({
      submitUserId: { $in: arr },
    });

    if (!(submittedDocument.length === 0)) {
      res.json({
        status: "success",
        document: submittedDocument,
      });
      return;
    } else {
      res.json({
        status: "This group still not submit the document",
        document: {},
      });
    }
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

//get the group details
exports.getGropudetails = async (req, res) => {
  try {
    const groupDetails = await StudentGroup.find({ groupID: req.params.id });

    res.json({
      status: "success",
      groupDetails,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

//get the topics accept by panel member
exports.getAcceptTopicsByPanelMember = async (req, res) => {
  try {
    const acceptTopics = await PanelTopic.find({
      topicStatus: "Accept",
    }).populate([{ path: "groupID" }, { path: "topicID" }]);
    res.json({
      status: "success",
      numberOfResults: acceptTopics.length,
      acceptTopics,
    });
  } catch (error) {
    res.json({
      status: "fail",
      result: error,
    });
  }
};

//create a accept topic by panel member
exports.createTopicAccept = async (req, res) => {
  try {
    const { groupID, topicStatus } = req.body;
    let topicExits = await PanelTopic.findOne({ groupID: groupID });
    if (topicExits) {
      topicExits.topicStatus = topicStatus;
      await topicExits.save();
    } else {
      topicExits = await PanelTopic.create(req.body);
    }
    res.json({
      status: "success",
      topic: topicExits,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: error,
    });
  }
};

//get the topic status
exports.getTopicStatus = async (req, res) => {
  try {
    const topicInfo = await PanelTopic.findOne({
      groupID: req.params.id,
    });

    if (topicInfo) {
      res.json({
        status: "success",
        topicInfo,
      });
      return;
    } else {
      res.json({
        status: "success",
        topicInfo: {},
      });
      return;
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: error,
    });
  }
};

//send feedback to the student
exports.senEmail = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const {
      To_whom,
      subject,
      input_message,
      Registration_Number,
      memberName,
      memberEmail,
      StudentName,
    } = req.body;
    const img =
      "https://courseweb.sliit.lk/pluginfile.php/1/theme_lambda/logo/1629135847/sliit_logo.jpg";

    const msg = {
      to: To_whom,
      from: "hasith450@gmail.com", // Use the email address or domain you verified above
      subject: subject,
      html: `
      <main style="background-color: #e0e0df;  border:2px solid black;">
       <h1> Sri lanka Institute Information Technology </h1>
      <img src=${img} alt="test image" />
      <h2> About : ${subject} </h2>
      <h4>Student Registration Number: ${Registration_Number}</h4>
      <p>Hi ${StudentName},</p>
      <p>${input_message} </P>
      <p>Thank you.</p>
      <p style="color:red;">Sender Information </P>
      <p style="font-weight: bold;">Send By:${memberName} ${memberEmail} </p>  
      <p>Copyright 2022 © SLIIT. All Rights Reserved. </p> 
      </main>
      `,
    };
    const mailResponse = await sgMail.send(msg);
    res.json({
      status: "success",
      mailResponse,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      error,
    });
  }
};
