const express = require('express')
const router = express.Router()


/*const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  deleteSelectedUsers,
} = require('../controllers/ManageUsersController')*/

const { list, find1,Update,Delete,DeleteM } = require('../controllers/ManageUsersController')


router.route('/list').get(list)
router.route('/find1/:id').get(find1)
router.route('/update1/:id').patch(Update)
router.route('/delete1/:id').delete(Delete)
router.route('/deletem/:ids').delete(DeleteM)

module.exports = router
