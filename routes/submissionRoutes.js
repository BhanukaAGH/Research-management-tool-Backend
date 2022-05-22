const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  fileUpload,
  submitDocument,
  getSubmission,
  getAllSubmissions,
  getStudentSubmissions,
} = require('../controllers/submissionController')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'submit-documents',
    resource_type: 'raw',
  },
})

const upload = multer({ storage: storage })

router
  .route('/')
  .post(
    authenticateUser,
    authorizePermissions('admin', 'student'),
    submitDocument
  )

router
  .route('/')
  .get(
    authenticateUser,
    authorizePermissions(
      'admin',
      'supervisor',
      'co_supervisor',
      'panel_member'
    ),
    getAllSubmissions
  )

router
  .route('/file-upload')
  .post(
    authenticateUser,
    authorizePermissions('admin', 'student'),
    upload.single('document'),
    fileUpload
  )

router
  .route('/:userId')
  .get(
    authenticateUser,
    authorizePermissions('admin', 'student'),
    getStudentSubmissions
  )

router
  .route('/:submissionId/:userId')
  .get(
    authenticateUser,
    authorizePermissions('admin', 'student'),
    getSubmission
  )

module.exports = router
