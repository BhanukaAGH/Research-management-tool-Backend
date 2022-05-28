const CustomError = require('../errors')
const markScheme = require('../models/markScheme')
const { StatusCodes } = require('http-status-codes')

const Create = async (req, res) => {
  //create marckscheme
  const { markSchemeName, Description, schemeType } = req.body

  if (!markSchemeName) {
    throw new CustomError.BadRequestError('Please provide name')
  }

  const check = await markScheme.findOne({ markSchemeName })
  if (check) {
    throw new CustomError.UnauthenticatedError(
      'Markscheme with name already exists'
    )
  }

  const create = await markScheme.create({
    markSchemeName,
    Description,
    schemeType,
  })
  if (create) {
    console.log('MS created successfully')
    res.send({ msg: 'Marks Schem  created successfully' })
  } else {
    console.log('failed to create')
    res.send({ message: 'Failed to create' })
  }
  res.json(create)
}

const add = async (req, res) => {
  //add more criteria
  const { criteria, allocatedMark } = req.body

  if(!criteria || !allocatedMark){
    throw new CustomError.UnauthenticatedError('Please Provide all Values ')
  }
  const filter = { _id: req.params.id }
  try {
    const update = await markScheme.findByIdAndUpdate(
      filter,
      {
        $push: {
          markScheme: { criteria: criteria, allocatedMark: allocatedMark },
        },
      },
      { safe: true, upsert: true, new: true }
    )
  
    res.send({msg: 'Crieteria & Marks Added'});
    
  } catch (error) {
    res.send({msg: 'Error in Adding Crieteria & Marks'});
  }

  
  
}
const remove = async (req, res) => {
  //remove criteria method
  const filter = { _id: req.params.id }

  const objID = req.body
try {
  const update = await markScheme.findByIdAndUpdate(
    filter,
    { $pull: { markScheme: { _id: objID } } },
    { safe: true, multi: false }
  )
  res.send({msg: 'Criteria Removed'});
  
} catch (error) {
  res.send({msg: 'Error In removing'});
}
}

const getAll = async (req, res) => {
  //get all markschemes

  const marckschemes = await markScheme.find({})

  if (!marckschemes) {
    throw new CustomError.UnauthenticatedError('No markSchems In the DB')
  }
  res.json(marckschemes)
}
const del = async (req, res) => {
  //delete making scheme
try {
  const Document = await markScheme.deleteOne({ _id: req.params.id })
  res.send({msg: 'MarkScheme Deleted successfully'});
} catch (error) {
  res.send({msg: "error in deleting MarkScheme"});
}
  

  if (Document.acknowledged) {
    console.log('Delete successfull')
  } else {
    console.log('Delete Failed')
  }
  res.json({ Document })
}

const getOne = async (req, res) => {
  //get one markscheme details

  const marckscheme = await markScheme.findOne({ _id: req.params.id })

  if (!marckscheme) {
    res.status(401)
    throw new CustomError.UnauthenticatedError('No markSchem In the DB')
  }
  res.json(marckscheme)
}

module.exports = { Create, add, remove, getAll, del, getOne }
