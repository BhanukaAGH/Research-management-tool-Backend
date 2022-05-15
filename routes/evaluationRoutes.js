const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  // authorizePermissions,
} = require('../middleware/authentication')

const {
  createEvaluation,
  getEvaluation,
} = require('../controllers/evaluationController')

router.route('/').post(authenticateUser, createEvaluation)
router.route('/:id/:evaluationType').get(authenticateUser, getEvaluation)

module.exports = router
