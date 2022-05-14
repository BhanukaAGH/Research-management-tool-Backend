const express = require('express')
const router = express.Router()

const {Create,add } = require('../controllers/adminMarkSchemeController')

router.route('/create').post(Create)
router.route('/update/:id').patch(add)



module.exports = router