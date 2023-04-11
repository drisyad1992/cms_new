const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Paper',
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String
      },
    overallScore: {
    type: Number,
    min: -2,
    max: 2,
    required: true
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
