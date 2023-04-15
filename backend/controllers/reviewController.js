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

  let existingReview = await Review.findOne({
    paper: req.params.id,
    user: paper.user,
    // isSubmitted: false
  })

  if (JSON.parse(req.body.isDraft) === true) {

    if (existingReview===null)
    {
  
      existingReview=false;
  
    }

    if (!existingReview) {

      const reviewFields = {
        overallScore: req.body.overallScore,
        reviewDetails: req.body.reviewDetails,
        privateComments: req.body.privateComments,
        user: paper.user,
        //name: req.user.name,
        paper: req.params.id,
        isSubmitted: false
      }
  
      existingReview = await Review.create(reviewFields)
  
    
    }
  
    existingReview.overallScore = req.body.overallScore
    existingReview.reviewDetails = req.body.reviewDetails
    existingReview.privateComments = req.body.privateComments
    existingReview.isSubmitted = false
  
    await existingReview.save()
    res.status(200).json(existingReview)
  
}
})

// submit review
const createReviewSubmit = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)

  let reviewsubmit = await Review.findOne({
    paper: req.params.id,
    user: paper.user,
    // isSubmitted: false
  })

  if (JSON.parse(req.body.isDraft) === false) {

    

    if (reviewsubmit===null)
    {

      reviewsubmit=false;

    }



  if (!reviewsubmit) {

    const reviewFields = {
      overallScore: req.body.overallScore,
      reviewDetails: req.body.reviewDetails,
      privateComments: req.body.privateComments,
      user: paper.user,
      //name: req.user.name,
      paper: req.params.id,
      isSubmitted: true
    }

    reviewsubmit = await Review.create(reviewFields)

  
  }

  reviewsubmit.overallScore = req.body.overallScore
  reviewsubmit.reviewDetails = req.body.reviewDetails
  reviewsubmit.privateComments = req.body.privateComments
  reviewsubmit.isSubmitted = true

  await reviewsubmit.save()
  res.status(200).json(reviewsubmit)

}

})

// @desc    Get reviews for a paper
// @route   GET /api/reviews/:paperId
// @access  Private
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ paper: req.params.paperId });
  res.status(200).json(reviews);
});


module.exports = {
  getReviews,
  createReviewDraft,
  createReviewSubmit
}
