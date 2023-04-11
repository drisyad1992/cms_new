const express = require('express')
const router = express.Router()
const {
    createReview,
    createReviewSubmit
} = require('../controllers/reviewController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createReview)
router.route('/').post(protect, createReviewSubmit)

module.exports = router