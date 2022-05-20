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
  if (!req.files) {
    throw new CustomError.BadRequestError('Please upload valid image')
  }

  const profileImage = req.files.image
  if (!profileImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload Image')
  }

  const maxSize = 2 * 1024 * 1024
  if (profileImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 2MB'
    )
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'profile-images',
      resource_type: 'image',
      allowedFormats: ['jpeg', 'png', 'jpg', 'webp', 'svg'],
      transformation: [{ width: 500, height: 500, crop: 'fill' }],
    }
  )

  fs.unlinkSync(req.files.image.tempFilePath)

  user.photoUrl = result.secure_url
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
