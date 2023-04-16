const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Paper = require('../models/paperModel')
const UserDetails = require('../models/userModel')
// const userdetails = require('../models/UserModel')


// create or update review draft
const createReviewDraft = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)
  if (!paper) {
    res.status(400)
    throw new Error('Paper not found')
  }
  const user = await UserDetails.findById(paper.user)


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
        username: user.name,
        paper: req.params.id,
        isSubmitted: false,
        paper_identifier: paper.paper_identifier
      }
      

      existingReview = await Review.create(reviewFields)
  
    
    }
  
    existingReview.overallScore = req.body.overallScore
    existingReview.reviewDetails = req.body.reviewDetails
    existingReview.privateComments = req.body.privateComments
    existingReview.paper_identifier= paper.paper_identifier
    existingReview.username = user.name
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

  const user = await UserDetails.findById(paper.user)


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
      username: user.name,
      paper: req.params.id,
      paper_identifier: paper.paper_identifier,
      isSubmitted: true
      

    }

    reviewsubmit = await Review.create(reviewFields)

  
  }
  reviewsubmit.overallScore = req.body.overallScore
  reviewsubmit.reviewDetails = req.body.reviewDetails
  reviewsubmit.privateComments = req.body.privateComments
  reviewsubmit.paper_identifier= paper.paper_identifier
  reviewsubmit.username = user.name
  reviewsubmit.isSubmitted = true

  await reviewsubmit.save()
  res.status(200).json(reviewsubmit)

}

})

// @desc    Get reviews for a paper
// @route   GET /api/reviews/:paperId
// @access  Private
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ paper: req.params.id });
  res.status(200).json(reviews);
});

// @desc    Get reviews for a paper
// @route   GET /api/reviews/view/:paperId
// @access  Private

const getReviewsbyid = asyncHandler(async (
  req, res) => {
    try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
    return res.status(404).json({ error: "Paper not found" });
    }
    const reviews = await Review.find({ paper_identifier: paper.paper_identifier });
    res.status(200).json(reviews);
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
    }
    });



//@desc    Get papers by id
// @route   GET /api/papers/:id
// @access  Private

const getPaperById = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)

  if (!paper) {
    res.status(404)
    throw new Error('Paper not found')
  }

  res.status(200).json(paper)
})


module.exports = {
  getReviews,
  createReviewDraft,
  createReviewSubmit,
  getPaperById,
  getReviewsbyid
}
