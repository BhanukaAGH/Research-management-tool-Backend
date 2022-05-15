const express = require('express')
const router = express.Router()

const {Create,add,remove } = require('../controllers/adminMarkSchemeController')

router.route('/create').post(Create)
router.route('/update/:id').patch(add)
router.route('/remove/:id').delete(remove)//remove criteria



module.exports = router