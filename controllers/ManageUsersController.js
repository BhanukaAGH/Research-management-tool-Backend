const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId({
  length: 8,
  dictionary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
})

//! GET ALL USERS
const getAllUsers = async (req, res) => {
  const user = await User.find({})
  if (!user) {
    throw new CustomError.UnauthenticatedError('No Users In the DB')
  }
  res.status(StatusCodes.OK).json(user)
}

//! GET USER BY ID
const getSingleUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    throw new CustomError.UnauthenticatedError('No  Users with ID In the DB')
  }
  res.status(StatusCodes.OK).json(user)
}

//! GET USER BY ROLE
const getSingleUserByRole = async (req, res) => {
  const users = await User.find({ role: req.params.role })
  if (!users) {
    throw new CustomError.UnauthenticatedError('No  Users with ID In the DB')
  }
  res.status(StatusCodes.OK).json(users)
}

//! UPDATE USER BY ID
const updateUser = async (req, res) => {
  const { name, role } = req.body
  const filter = { _id: req.params.id }

  const user = await User.findOne(filter)
  var regNo
  var email
  var update = { name, role }

  if (user.role !== role) {
    while (true) {
      if (role === 'supervisor') {
        regNo = 'SU' + uid()
        email = regNo.toLowerCase() + '@my.sliit.lk'
      }

      if (role === 'student') {
        regNo = 'IT' + uid()
        email = regNo.toLowerCase() + '@my.sliit.lk'
      }

      if (role === 'co_supervisor') {
        regNo = 'CS' + uid()
        email = regNo.toLowerCase() + '@my.sliit.lk'
      }

      if (role === 'panel_member') {
        regNo = 'PA' + uid()
        email = regNo.toLowerCase() + '@my.sliit.lk'
      }

      const emailAlreadyExists = await User.findOne({ email })
      if (emailAlreadyExists) {
        continue
      }
      break
    }

    update = { name, regNo, email, role }
  }

  console.log(update)

  const oldDocument = await User.updateOne(filter, update)
  res.status(StatusCodes.OK).json({ oldDocument })
}

//! DELETE USER BY ID
const deleteUserById = async (req, res) => {
  const Document = await User.deleteOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ Document })
}

//! DELETE USERS
const deleteUsers = async (req, res) => {
  const arr = req.params.ids.split(',')
  const Document = await User.deleteMany({ _id: { $in: arr } })
  res.status(StatusCodes.OK).json(Document)
}

//! UPDATE USER PROFILE IMAGE
const updateProfileImage = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  if (!req.file) {
    throw new CustomError.BadRequestError('Please upload valid image')
  }

  if (req.file.mimetype.split('/')[0] !== 'image') {
    throw new CustomError.BadRequestError('Please upload Image')
  }

  user.photoUrl = req.file.path
  await user.save()
  res.status(StatusCodes.OK).json(user)
}

module.exports = {
  getAllUsers,
  getSingleUserById,
  getSingleUserByRole,
  updateUser,
  deleteUserById,
  deleteUsers,
  updateProfileImage,
}
