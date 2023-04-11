const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Paper = require('../models/paperModel')
const User = require('../models/userModel')
const createReview = asyncHandler(async (req, res) => {

    const reviewDraft = await Review.create({
        overallScore: req.body.overallScore,
        reviewDetails: req.body.reviewDetails,
        privateComments: req.body.privateComments,
        paper: req.paper.id

    })
    res.status(200).json(reviewDraft)
    res.status(201).json({ message: 'Review draft saved successfully!'});

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