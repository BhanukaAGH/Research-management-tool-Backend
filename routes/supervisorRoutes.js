const express = require('express')
const router = express.Router()

const {
  addSupervisor,
  getAllSupervisors,
  getOneSupervisor,
} = require('../controllers/supervisorController')

router.route('/add').post(addSupervisor)

router.route('/').get(getAllSupervisors)

router.route('/:supervisorID').get(getOneSupervisor)

module.exports = router
