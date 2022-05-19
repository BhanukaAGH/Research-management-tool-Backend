const { StatusCodes } = require('http-status-codes')
const Supervisor = require('../models/Supervisor')

const addSupervisor = async (req, res) => {
  const { supervisorName, researchArea } = req.body

  const supervisor = await Supervisor.create({
    supervisorName,
    researchArea,
  })

  res.status(StatusCodes.CREATED).json(supervisor)
}

const getAllSupervisors = async (req, res) => {
  const supervisors = await Supervisor.find({})
  res.status(StatusCodes.OK).json({ supervisors, count: supervisors.length })
}

const getOneSupervisor = async (req, res) => {
  const supervisor = await Supervisor.findOne({ _id: req.params.id })

  if (!supervisor) {
    throw new CustomError.NotFoundError(
      `No supervisor with id ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ supervisor })
}

module.exports = { addSupervisor, getAllSupervisors, getOneSupervisor }
