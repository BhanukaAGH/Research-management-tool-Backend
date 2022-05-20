const express = require('express')
const router = express.Router()

const {Create,add,remove,getAll,del,getOne } = require('../controllers/adminMarkSchemeController')

router.route('/create').post(Create)
router.route('/update/:id').patch(add)
router.route('/remove/:id').patch(remove)//remove criteria
router.route('/get').get(getAll)
router.route('/del/:id').delete(del)//delete markscheme entirely
router.route('/getOne/:id').get(getOne)//get one markscheme



module.exports = router