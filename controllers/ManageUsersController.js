const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.status(StatusCodes.OK).json({ users, count: users.length })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`)
  }

  await user.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! User removed.' })
}

const deleteSelectedUsers = async (req, res) => {
  let arr = req.params.ids.split(',')
  const Document = await User.deleteMany({ _id: { $in: arr } })
  res.json(Document)
  if (Document.acknowledged) {
    console.log('Delete successfull')
  } else {
    console.log('Delete Failed')
  }
}
module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  deleteSelectedUsers,
}
