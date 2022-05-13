const express = require('express')
const router = express.Router()

const { groupRegister,getStudentgroups,getOneGroup,Allocate } = require('../controllers/studentController')

router.route('/groupRegister').post(groupRegister)
router.route('/getgroups').get(getStudentgroups)//get all student groups
router.route('/getgroups/:id').get(getOneGroup)//get one specific group
router.route('/update/:id').patch(Allocate)//update group(allocate panel mememer)

module.exports = router
