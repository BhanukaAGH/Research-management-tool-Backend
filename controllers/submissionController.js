const Submission = require('../models/Submission')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const submitDocument = (req, res) => {
  res.status(StatusCodes.CREATED).json('Submit Document')
}

const getAllSubmissions = (req, res) => {
  res.status(StatusCodes.CREATED).json('get all Submit Documents')
}

const getStudentSubmissions = (req, res) => {
  res.status(StatusCodes.CREATED).json('get all student Submit Documents')
}

module.exports = { submitDocument, getAllSubmissions, getStudentSubmissions }
