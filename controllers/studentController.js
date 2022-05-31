const { StatusCodes } = require('http-status-codes')
const StudentGroup = require('../models/StudentGroup')
const User = require('../models/User')
const CustomError = require('../errors')

// Register student group
const groupRegister = async (req, res) => {
  const { leaderId, member2Id, member3Id, member4Id, Panelmember } = req.body

  if (!leaderId || !member2Id || !member3Id || !member4Id) {
    throw new CustomError.BadRequestError(
      'Please enter all group members registration numbers'
    )
  }

  var value = await StudentGroup.countDocuments({})
  const groupID = 'REC_GROUP_' + (value + 1)

  const leader = await User.findOne({ regNo: leaderId }).select(
    'name email regNo'
  )
  if (!leader) {
    throw new CustomError.BadRequestError(
      'Leader registration number is invalid'
    )
  }
  leader.groupId = groupID

  const member2 = await User.findOne({ regNo: member2Id }).select(
    'name email regNo'
  )
  if (!member2) {
    throw new CustomError.BadRequestError(
      'Leader registration number is invalid'
    )
  }
  member2.groupId = groupID

  const member3 = await User.findOne({ regNo: member3Id }).select(
    'name email regNo'
  )
  if (!member3) {
    throw new CustomError.BadRequestError(
      'Leader registration number is invalid'
    )
  }
  member3.groupId = groupID

  const member4 = await User.findOne({ regNo: member4Id }).select(
    'name email regNo'
  )
  if (!member4) {
    throw new CustomError.BadRequestError(
      'Leader registration number is invalid'
    )
  }
  member4.groupId = groupID

  await leader.save()
  await member2.save()
  await member3.save()
  await member4.save()

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

const getAllgroups = async (req, res) => {
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
  const { Name, MemberID } = req.body
  if(!Name || !MemberID){
    throw new CustomError.UnauthenticatedError('Please Provide all Values ')
  }
  const filter = { _id: req.params.id }
  try {
    const update = await StudentGroup.findByIdAndUpdate(
      filter,
      {
        $push: {
          Panelmember: { Name: Name, MemberID: MemberID },
        },
      },
      { safe: true, upsert: true, new: true }
    )
  
    res.send({msg: 'Allocated'});
    
  } catch (error) {
    console.log(error);
    res.send({msg: 'Error in Allocating'});
  }
}

const getStudentGroup = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId })
  const group = await StudentGroup.findOne({ groupID: user.groupId })

  res.status(StatusCodes.OK).json(group)
}
const UnAllocate = async (req, res) => {
  
  try {
    const filter = { _id: req.params.id }
    const update = await StudentGroup.findByIdAndUpdate(
      filter,
      {
        $set: {
          Panelmember:[],
        },
      },
      { safe: true, upsert: true, new: true }
    )
    res.send({msg: 'Un-Allocated'});
    
  } catch (error) {
    console.log(error)
    res.send({msg: 'Error in Deallocating'});
  }
}

module.exports = {
  groupRegister,
  getAllgroups,
  getStudentGroup,
  getOneGroup,
  Allocate,
  UnAllocate
}
