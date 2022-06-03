const Submission = require('../models/Submission')
const SubmissionTypes = require('../models/SubmissionTypes')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! SUBMIT DOCUMENT
const fileUpload = async (req, res) => {
  if (!req.file) {
    throw new CustomError.BadRequestError('Please upload document')
  }

  res.status(StatusCodes.OK).json({
    submitFileName: req.file.originalname,
    submitDocumentUrl: req.file.path,
  })
}

const submitDocument = async (req, res) => {
  const {
    submissionId,
    submissionName,
    submissionDescription,
    submissionType,
    submitFileName,
    submitDocumentUrl,
  } = req.body

  if (
    !submissionId ||
    !submissionName ||
    !submissionDescription ||
    !submissionType ||
    !submitFileName ||
    !submitDocumentUrl
  ) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  const alreadySubmit = await Submission.findOne({
    submitUserId: req.user.userId,
    submissionId,
  })

  if (alreadySubmit) {
    alreadySubmit.submitFileName = submitFileName
    alreadySubmit.submitDocumentUrl = submitDocumentUrl

    await alreadySubmit.save()
    return res.status(StatusCodes.CREATED).json(alreadySubmit)
  }

  const submissionData = {
    submitUserId: req.user.userId,
    submissionId,
    submissionName,
    submissionDescription,
    submissionType,
    submitFileName,
    submitDocumentUrl,
  }
  const submissionTypes = await SubmissionTypes.findOne({ _id: submissionId })
  submissionTypes.submitUsers.unshift({ user: req.user.userId })
  await submissionTypes.save()

  const submission = await Submission.create(submissionData)
  res.status(StatusCodes.CREATED).json(submission)
}

//! GET ALL SUBMISSIONS
const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find({})
  res.status(StatusCodes.OK).json(submissions)
}

//! GET STUDENT SUBMISSIONS
const getStudentSubmissions = async (req, res) => {
  const studentSubmissions = await Submission.find({
    submitUserId: req.params.userId,
  })

  res.status(StatusCodes.OK).json(studentSubmissions)
}

//! GET SUBMISSION
const getSubmission = async (req, res) => {
  const { submissionId, userId } = req.params
  const submission = await Submission.findOne({
    submissionId,
    submitUserId: userId,
  })

  res.status(StatusCodes.OK).json(submission)
}

module.exports = {
  fileUpload,
  submitDocument,
  getSubmission,
  getAllSubmissions,
  getStudentSubmissions,
}
