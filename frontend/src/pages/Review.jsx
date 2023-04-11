import { useState } from 'react';
import axios from 'axios';

const API_URL ='api/reviews'
function Review(){
  const [overallScore, setOverallScore] = useState(0);
  const [reviewDetails, setReviewDetails] = useState('');
  const [privateComments, setPrivateComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const saveDraft = async () => {
    if (!overallScore && !reviewDetails && !privateComments) {
      alert('Please fill at least one field');
      return;
    }
    try {
      await axios.post(API_URL, {
        overallScore,
        reviewDetails,
        privateComments,
      });
      alert('Thank You!! Your draft has been saved');
    } catch (error) {
      console.error(error);
    }
  };

  const submitReview = async () => {
    // Validate input
    if (!overallScore || !reviewDetails || !privateComments) {
      alert('Please fill all the fields');
      return;
    }

    try {
      await axios.post(API_URL, {
        overallScore,
        reviewDetails,
        privateComments,
      });
      setIsSubmitted(true);
      alert('Review submitted! You cannot make any further changes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="review-form">
      <label className='label'>Overall Score:</label>
      <div className="slider-labels-container">
         <div className="slider-label">Very Bad</div>
         <div className="slider-label">Bad</div>
         <div className="slider-label">Average</div>
         <div className="slider-label">Good</div>
         <div className="slider-label">Excellent</div>
      </div>
      
      <input
        type="range"
        min="-2"
        max="2"
        step="1"
        value={overallScore}
        onChange={(e) => setOverallScore(e.target.value)}
        disabled={isSubmitted}
      />
      <div className="slider-legend-container">
        <div className="slider-legend">-2</div>
        <div className="slider-legend">-1</div>
        <div className="slider-legend">0</div>
        <div className="slider-legend">1</div>
        <div className="slider-legend">2</div>
      </div>

      <br />
      <label className='label'>Review Details:</label>
        <textarea
          required
          value={reviewDetails}
          onChange={(e) => setReviewDetails(e.target.value)}
          disabled={isSubmitted}
        />
      
      <br />
      <label className='label'>Private Comments:</label>
        <textarea
          value={privateComments}
          onChange={(e) => setPrivateComments(e.target.value)}
          disabled={isSubmitted}
        />
      
      <br />
      <div className="button-container">
        {!isSubmitted && <button className='button1' type="button" onClick={saveDraft}>Save as Draft</button>}
        {!isSubmitted && <button className='button' type="button" onClick={submitReview}>Submit</button>}
        {isSubmitted && <p>Review has been submitted.</p>}
      </div>

    </form>
  );
};

export default Review;
