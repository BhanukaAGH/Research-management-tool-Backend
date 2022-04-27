const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  createTopic,
  getAllTopics,
  getSingleTopic,
  updateTopic,
  deleteTopic,
} = require('../controllers/topicController')

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions('admin', 'student')],
    createTopic
  )

router
  .route('/')
  .get(
    [
      authenticateUser,
      authorizePermissions(
        'admin',
        'supervisor',
        'co_supervisor',
        'panel_member'
      ),
    ],
    getAllTopics
  )

router.route('/:id').get(authenticateUser, getSingleTopic)
router.route('/:id').patch(authenticateUser, updateTopic)

router
  .route('/:id')
  .delete(
    [
      authenticateUser,
      authorizePermissions(
        'admin',
        'student',
        'supervisor',
        'co_supervisor',
        'panel_member'
      ),
    ],
    deleteTopic
  )

module.exports = router
