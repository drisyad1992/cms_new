const express = require('express')
const router = express.Router()
const {
    createReviewDraft,
    createReviewSubmit
} = require('../controllers/reviewController')

const { protect } = require('../middleware/authMiddleware')

router.route('/draft/:id').post(protect, createReviewDraft)
router.route('/submit/:id').post(protect, createReviewSubmit)

module.exports = router