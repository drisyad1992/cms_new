import React,{ useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewDraft, createReviewSubmit } from '../features/reviews/reviewSlice';

function Review(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.review);
  const [overallScore, setOverallScore] = useState(0);
  const [reviewDetails, setReviewDetails] = useState('');
  const [privateComments, setPrivateComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDraftSubmit = (e) => {
    e.preventDefault();
    const data = { overallScore, reviewDetails, privateComments };
    console.log(data);
    dispatch(createReviewDraft(id, data));
    setIsSubmitted(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(review && !review.isSubmitted){
      const data = { overallScore, reviewDetails, privateComments };
      console.log(data);
      dispatch(createReviewSubmit(id, data));
      setIsSubmitted(true);
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
      {!isSubmitted && <button className='button1' type="button" onClick={handleDraftSubmit}>Save as Draft</button>}
      {!isSubmitted && <button className='button' type="button" onClick={handleSubmit}>Submit</button>}
      {isSubmitted && <p>Review has been submitted.</p>}
    </div>

  </form>
);
};
export default Review;

