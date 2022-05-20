const express = require('express')
const router = express.Router()

const { Create ,Remove,list,findbyname,findbydate,Update} = require('../controllers/adminSbmissionsController')



router.route('/create').post(Create)
router.route('/:id').delete(Remove)
router.route('/list').get(list)
router.route('/findbyname/:name').get(findbyname)
router.route('/findbydate/:date').get(findbydate)
router.route('/update/:id').patch(Update)

module.exports = router