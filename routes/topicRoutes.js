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
  getTopic,
  updateTopic,
  deleteTopic,
  requestSupervisor,
  requestCoSupervisor,
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
router.route('/group/:groupId').get(getTopic)
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

router
  .route('/request/supervisor')
  .post(
    [authenticateUser, authorizePermissions('admin', 'student')],
    requestSupervisor
  )

router
  .route('/request/co-supervisor')
  .post(
    [authenticateUser, authorizePermissions('admin', 'student')],
    requestCoSupervisor
  )

module.exports = router
