const express = require('express')
const router = express.Router()
const {
    createReviewDraft,
    createReviewSubmit,
    getReviews
} = require('../controllers/reviewController')

//const { protect } = require('../middleware/authMiddleware')

router.route('/draft/:id').post(createReviewDraft)
router.route('/submit/:id').post(createReviewSubmit)
router.route('/review/view/:id').get( getReviews);


module.exports = router
