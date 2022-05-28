const Topic = require('../models/Topic')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! CREATE TOPIC
const createTopic = async (req, res) => {
  const { topicName, groupId, researchArea, studentId } = req.body
  const topic = await Topic.create({
    topicName,
    groupId,
    researchArea,
    studentId,
  })
  res.status(StatusCodes.CREATED).json({ topic })
}

//! GET ALL TOPICS
const getAllTopics = async (req, res) => {
  const topics = await Topic.find({})
  res.status(StatusCodes.OK).json({ topics, count: topics.length })
}

//! GET TOPIC BY ID
const getSingleTopic = async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ topic })
}

//! GET TOPIC BY GROUP ID
const getTopic = async (req, res) => {
  const topic = await Topic.findOne({ groupId: req.params.groupId })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json(topic)
}

//! UPDATE TOPIC
const updateTopic = async (req, res) => {
  const { id: topicId } = req.params
  const { id, status } = req.body
  let data
  if (req.user.role === 'supervisor') {
    data = { supervisor: { id, status } }
  } else if (req.user.role === 'co_supervisor') {
    data = { coSupervisor: { id, status } }
  }

  const topic = await Topic.findOneAndUpdate({ _id: topicId }, data, {
    new: true,
    runValidators: true,
  })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ topic })
}

//! DELETE TOPIC
const deleteTopic = async (req, res) => {
  const { id: topicId } = req.params
  const topic = await Topic.findOne({ _id: topicId })

  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }

  await topic.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Topic removed.' })
}

//! REQUEST SUPERVISOR
const requestSupervisor = async (req, res) => {
  const { topicId, supervisorId } = req.body
  const topic = await Topic.findOne({ _id: topicId })
  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }

  const supervisor = await User.findOne({ _id: supervisorId })
  if (!supervisor) {
    throw new CustomError.NotFoundError(
      `No supervisor with id ${req.params.id}`
    )
  }

  topic.supervisor.id = supervisorId
  await topic.save()
  res.status(StatusCodes.OK).json({ topic })
}

//! REQUEST CO-SUPERVISOR
const requestCoSupervisor = async (req, res) => {
  const { topicId, coSupervisorId } = req.body
  const topic = await Topic.findOne({ _id: topicId })
  if (!topic) {
    throw new CustomError.NotFoundError(`No topic with id ${req.params.id}`)
  }

  const coSupervisor = await User.findOne({ _id: coSupervisorId })
  if (!coSupervisor) {
    throw new CustomError.NotFoundError(
      `No co-supervisor with id ${req.params.id}`
    )
  }

  topic.coSupervisor.id = coSupervisorId
  await topic.save()
  res.status(StatusCodes.OK).json({ topic })
}

module.exports = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  getTopic,
  updateTopic,
  deleteTopic,
  requestSupervisor,
  requestCoSupervisor,
}
