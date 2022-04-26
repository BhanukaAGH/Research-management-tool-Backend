const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  deleteSelectedUsers,
} = require('../controllers/ManageUsersController')

router.route('/list').get(getAllUsers)
router.route('/find1/:id').get(getSingleUser)
router.route('/update1/:id').patch(updateUser)
router.route('/delete1/:id').delete(deleteUser)
router.route('/deletem/:ids').delete(deleteSelectedUsers)

module.exports = router
