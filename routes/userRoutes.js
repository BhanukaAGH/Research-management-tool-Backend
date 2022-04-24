const express = require('express')
const router = express.Router()

const list=require('../controllers/ManageUsersController') // For Admin manage user (RIVINDU)

router.route('/list').get(list)

module.exports = router