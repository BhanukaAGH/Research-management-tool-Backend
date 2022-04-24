const express = require('express')
const router = express.Router()

const {list,find1,Update,Delete}=require('../controllers/ManageUsersController') // For Admin manage user (RIVINDU)

router.route('/list').get(list)
router.route('/find1/:id').get(find1)
router.route('/update1/:id').patch(Update)
router.route('/delete1/:id').delete(Delete)

module.exports = router