const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Paper = require('../models/paperModel')

// create or update review draft
const createReviewDraft = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)
  if (!paper) {
    res.status(400)
    throw new Error('Paper not found')
  }

  const existingReview = await Review.findOne({
    paper: req.params.id,
    user: req.user.id,
    isSubmitted: false
  })

  const reviewFields = {
    overallScore: req.body.overallScore,
    reviewDetails: req.body.reviewDetails,
    privateComments: req.body.privateComments,
    user: req.user.id,
    name: req.user.name,
    paper: req.params.id,
    isSubmitted: false
  }

  let review
  if (existingReview) {
    review = await Review.findByIdAndUpdate(existingReview._id, reviewFields, {
      new: true,
      runValidators: true
    })
  } else {
    review = await Review.create(reviewFields)
  }

  res.status(200).json(review)
})

// submit review
const createReviewSubmit = asyncHandler(async (req, res) => {
  const review = await Review.findOne({
    paper: req.params.id,
    user: req.user.id,
    isSubmitted: false
  })

  if (!review) {
    res.status(400)
    throw new Error('Review not found')
  }

  review.overallScore = req.body.overallScore
  review.reviewDetails = req.body.reviewDetails
  review.privateComments = req.body.privateComments
  review.isSubmitted = true

  await review.save()

  res.status(200).json(review)
})

module.exports = {
  createReviewDraft,
  createReviewSubmit
}
