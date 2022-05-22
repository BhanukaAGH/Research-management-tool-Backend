const express = require('express')
const router = express.Router()

const {
  groupRegister,
  getAllgroups,
  getStudentGroup,
  getOneGroup,
  Allocate,
} = require('../controllers/studentController')

router.route('/groupRegister').post(groupRegister)
router.route('/getgroups').get(getAllgroups) //get all student groups
router.route('/:userId').get(getStudentGroup)
router.route('/getgroups/:id').get(getOneGroup) //get one specific group
router.route('/update/:id').patch(Allocate) //update group(allocate panel mememer)

module.exports = router
