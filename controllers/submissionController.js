const Submission = require('../models/Submission')
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
    submitFileName,
    submitDocumentUrl,
  } = req.body

  if (
    !submissionId ||
    !submissionName ||
    !submissionDescription ||
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
    submitFileName,
    submitDocumentUrl,
  }

  const submission = await Submission.create(submissionData)
  res.status(StatusCodes.CREATED).json(submission)
}

//! GET ALL SUBMISSIONS
const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find({})
  res.status(StatusCodes.CREATED).json(submissions)
}

//! GET STUDENT SUBMISSIONS
const getStudentSubmissions = async (req, res) => {
  const studentSubmissions = await Submission.find({
    submitUserId: req.params.userId,
  })

  res.status(StatusCodes.CREATED).json(studentSubmissions)
}

module.exports = {
  fileUpload,
  submitDocument,
  getAllSubmissions,
  getStudentSubmissions,
}
