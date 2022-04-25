const { StatusCodes } = require('http-status-codes')
const StudentGroup = require('../models/StudentGroup')

// Register student group
const groupRegister = async (req, res) => {
  const { leader, member2, member3, member4 } = req.body

  const studentGroup = await StudentGroup.create({
    leader,
    member2,
    member3,
    member4,
  })

  res.status(StatusCodes.CREATED).json(studentGroup)
}

module.exports = { groupRegister }
