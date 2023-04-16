const express = require('express')
const router = express.Router()
const {
    createReviewDraft,
    createReviewSubmit,
    getReviews,
    getReviewsbyid
} = require('../controllers/reviewController')

//const { protect } = require('../middleware/authMiddleware')

router.route('/draft/:id').post(createReviewDraft)
router.route('/submit/:id').post(createReviewSubmit)
router.route('/:id').get( getReviews);
router.route('/view/:id').get(getReviewsbyid);


module.exports = router
