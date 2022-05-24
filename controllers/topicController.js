const Topic = require('../models/Topic')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createTopic = async (req, res) => {
  const { topicName, groupId, researchArea, studentId, supervisorName } =
    req.body
  const topic = await Topic.create({
    topicName,
    groupId,
    researchArea,
    studentId,
    supervisorName,
  })
  res.status(StatusCodes.CREATED).json({ topic })
}

const getAllTopics = async (req, res) => {
  const topics = await Topic.find({})
  res.status(StatusCodes.OK).json({ topics, count: topics.length })
}

const getSingleTopic = async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ topic })
}

const getTopic = async (req, res) => {
  const topic = await Topic.findOne({ groupId: req.params.groupId })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json(topic)
}

const updateTopic = async (req, res) => {
  const { id: topicId } = req.params
  const topic = await Topic.findOneAndUpdate({ _id: topicId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ topic })
}

const deleteTopic = async (req, res) => {
  const { id: topicId } = req.params
  const topic = await Topic.findOne({ _id: topicId })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }

  await topic.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Topic removed.' })
}

module.exports = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  getTopic,
  updateTopic,
  deleteTopic,
}
