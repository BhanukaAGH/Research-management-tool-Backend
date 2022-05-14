const express = require('express')
const router = express.Router()

const {
  createEvaluation,
  getEvaluation,
} = require('../controllers/evaluationController')

router.route('/').post(createEvaluation)
router.route('/:id/:evaluationType').get(getEvaluation)

module.exports = router
