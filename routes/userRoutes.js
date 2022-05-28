const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const { authenticateUser } = require('../middleware/authentication')

const {
  getAllUsers,
  getSingleUserById,
  getSingleUserByRole,
  updateUser,
  deleteUserById,
  deleteUsers,
  updateProfileImage,
  getAllSupervisors,
  getAllCoSupervisors,
} = require('../controllers/ManageUsersController')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-images',
    resource_type: 'image',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp', 'svg'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
  },
})

const upload = multer({ storage: storage })

router.route('/list').get(getAllUsers)
router
  .route('/update-profile')
  .patch(authenticateUser, upload.single('image'), updateProfileImage)
router.route('/getAllSupervisors').get(authenticateUser, getAllSupervisors)
router.route('/getAllCoSupervisors').get(authenticateUser, getAllCoSupervisors)
router.route('/find1/:id').get(getSingleUserById)
router.route('/update1/:id').post(updateUser)
router.route('/delete1/:id').delete(deleteUserById)
router.route('/deletem/:ids').delete(deleteUsers)
router.route('/findby/:role').get(getSingleUserByRole)

module.exports = router
