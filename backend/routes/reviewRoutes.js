const express = require('express')
const router = express.Router()
const {
    createReviewDraft,
    createReviewSubmit
} = require('../controllers/reviewController')

//const { protect } = require('../middleware/authMiddleware')

router.route('/draft/:id').post(createReviewDraft)
router.route('/submit/:id').post(createReviewSubmit)

module.exports = router
