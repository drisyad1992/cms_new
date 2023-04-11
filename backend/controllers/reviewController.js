const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Paper = require('../models/paperModel')
const createReview = asyncHandler(async (req, res) => {
        if (!req.body.overallScore) {
          res.status(400)
          throw new Error('Please add a text field')
        }
      
        const paper = await Paper.findById(req.params.id)
      
        if (!paper) {
          res.status(400)
          throw new Error('Paper not found')
        }
        
        const createReview = await Review.create({
          overallScore: req.body.overallScore,
          reviewDetails: req.body.reviewDetails,
          privateComments: req.body.privateComments,
          user: req.user.id,
          name: req.user.name,
          paper: req.params.id,
        })
      
        res.status(200).json(createReview)
      })

// submit review
const createReviewSubmit = asyncHandler(async (req, res) => {

    const reviewSubmit = await Review.create({
        overallScore: req.body.overallScore,
        reviewDetails: req.body.reviewDetails,
        privateComments: req.body.privateComments,
        paper: req.paper.id,
        isSubmitted: true
    })
    await reviewSubmit.save();
  
    res.status(200).json(reviewSubmit)
    res.status(201).json({ message: 'Review submitted successfully!' });
});


module.exports = {
    createReview,
    createReviewSubmit
}