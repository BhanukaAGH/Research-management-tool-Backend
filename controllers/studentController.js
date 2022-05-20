const { StatusCodes } = require('http-status-codes')
const StudentGroup = require('../models/StudentGroup')
const CustomError = require('../errors')

// Register student group
const groupRegister = async (req, res) => {
  const { leader, member2, member3, member4, Panelmember } = req.body

  var value = await StudentGroup.countDocuments({})

  console.log(value)

  const groupID = value + 1

  const studentGroup = await StudentGroup.create({
    groupID,
    leader,
    member2,
    member3,
    member4,
    Panelmember,
  })

  res.status(StatusCodes.CREATED).json(studentGroup)
}
//rivindu created get student groups & update methods

// const getAllGroups = async (req, res) => {
//   const groups = await StudentGroup.find({})
//   res.status(StatusCodes.OK).json({ groups, count: groups.length })
// }

const getGroupByID = async (req, res) => {
  const group = await StudentGroup.findOne({ groupID: req.params.groupID })

  if (!group) {
    throw new CustomError.NotFoundError(
      `No group with id ${req.params.groupID}`
    )
  }
  res.status(StatusCodes.OK).json({ group })
}

//get all student groups

const getStudentgroups = async (req, res) => {
  //get all student groups
  try {
    const result = await StudentGroup.find()
    if (!result) {
      throw new CustomError.UnauthenticatedError('no student groups available')
    }
    res.json(result)
  } catch (error) {
    res.status(400)
    console.log('error in getting all groups', error)
  }
}
const getOneGroup = async (req, res) => {
  //get one group details
  try {
    const result = await StudentGroup.findOne({ _id: req.params.id })
    if (!result) {
      throw new CustomError.UnauthenticatedError('No  groups with ID In the DB')
    }
    res.json(result)
  } catch (error) {
    res.status(400)
    console.log('error in fetching one user', error)
  }
}
const Allocate = async (req, res) => {
  //patch to allocate panel members

  try {
    const filter = { _id: req.params.id }
    const oldDocument = await StudentGroup.updateOne(filter, req.body)

    res.json(oldDocument)
  } catch (error) {
    console.log('error in updating', error)
    res.status(500)
  }
}

module.exports = {
  groupRegister,
  getGroupByID,
  getStudentgroups,
  getOneGroup,
  Allocate,
}
