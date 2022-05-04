const { StatusCodes } = require('http-status-codes')
const StudentGroup = require('../models/StudentGroup')

// Register student group
const groupRegister = async (req, res) => {
  const { leader, member2, member3, member4 } = req.body

  var value = await StudentGroup.countDocuments({})

  console.log(value)

  const groupID = value + 1

  const studentGroup = await StudentGroup.create({
    groupID,
    leader,
    member2,
    member3,
    member4,
  })

  res.status(StatusCodes.CREATED).json(studentGroup)
}

const getAllGroups = async (req, res) => {
  const groups = await StudentGroup.find({})
  res.status(StatusCodes.OK).json({ groups, count: groups.length })
}

const getGroupByID = async (req, res) => {
  const group = await StudentGroup.findOne({ groupID: req.params.groupID })

  if (!group) {
    throw new CustomError.NotFoundError(
      `No group with id ${req.params.groupID}`
    )
  }
  res.status(StatusCodes.OK).json({ group })
}

module.exports = { groupRegister, getAllGroups, getGroupByID }
