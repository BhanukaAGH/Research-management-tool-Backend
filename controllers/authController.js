const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, createJWT } = require('../utils')
const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId({
  length: 8,
  dictionary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
})

//! REGISTER USER CONTROLLER
const register = async (req, res) => {
  const { name, password, userRole } = req.body

  if (!name || !password) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  var regNo
  var email

  while (true) {
    if (userRole === 'supervisor') {
      regNo = 'SU' + uid()
      email = regNo.toLowerCase() + '@my.sliit.lk'
    }

    if (userRole === 'student') {
      regNo = 'IT' + uid()
      email = regNo.toLowerCase() + '@my.sliit.lk'
    }

    if (userRole === 'co_supervisor') {
      regNo = 'CS' + uid()
      email = regNo.toLowerCase() + '@my.sliit.lk'
    }

    if (userRole === 'panel_member') {
      regNo = 'PA' + uid()
      email = regNo.toLowerCase() + '@my.sliit.lk'
    }

    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
      continue
    }
    break
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments()) === 0
  const role = isFirstAccount ? 'admin' : userRole

  const user = await User.create({ name, regNo, email, password, role })

  const tokenUser = createTokenUser(user)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

//! LOGIN USER CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const tokenUser = createTokenUser(user)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

module.exports = { login, register }
