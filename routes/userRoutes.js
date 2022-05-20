const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authentication')

const {
  getAllUsers,
  getSingleUserById,
  getSingleUserByRole,
  updateUser,
  deleteUserById,
  deleteUsers,
  updateProfileImage,
} = require('../controllers/ManageUsersController')

router.route('/list').get(getAllUsers)
router.route('/update-profile').patch(authenticateUser, updateProfileImage)
router.route('/find1/:id').get(getSingleUserById)
router.route('/update1/:id').post(updateUser)
router.route('/delete1/:id').delete(deleteUserById)
router.route('/deletem/:ids').delete(deleteUsers)
router.route('/findby/:role').get(getSingleUserByRole)

module.exports = router
