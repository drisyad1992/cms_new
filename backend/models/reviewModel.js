const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Paper',
      },
    overallScore: {
    type: Number,
    min: -2,
    max: 2,
    required: true,
  },
  reviewDetails: {
    type: String,
  },
  privateComments: {
    type: String,
  },
  isSubmitted: {
    type: Boolean,
    default: false
  },
  
},
 { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
