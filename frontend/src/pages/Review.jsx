import React,{ useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewDraft, createReviewSubmit } from '../features/reviews/reviewSlice';
import { getPapersbyid } from '../features/papers/paperSlice';
import { useEffect } from 'react';
function Review(){
  const navigate = useNavigate();

  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { review} = useSelector((state) => state.review);
  const [overallScore, setOverallScore] = useState(review?.overallScore || 0);
  const [reviewDetails, setReviewDetails] = useState(review?.reviewDetails || '');
  const [privateComments, setPrivateComments] = useState(review?.privateComments || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [paperData, setPaper] = useState(null); // state to hold paper details



  // const fetchPaperDetails = async () => {
  //   try {
  //     const response = await fetch(`/api/papers/${id}`);
  //     if (response.ok) {
  //       const { paper_identifier } = await response.json();
  //       setData({ ...data, paper_identifier });
  //     } else {
  //       throw new Error('Failed to fetch paper details');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  
  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        const response = await fetch(`/api/papers/${id}`);

        if (response.ok) {
          const paperData = await response.json();
          setPaper(paperData);
        } else {
          throw new Error('Failed to fetch paper data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaperData();
  }, [id]);

  const handleBack = () => {
    navigate(`/`);
  };


  const handleDraftSubmit = (e) => {
    e.preventDefault();
      if (!overallScore && !reviewDetails && !privateComments) {
        alert('Please fill atleast one field');
        return;
      } 
    const data = { overallScore, reviewDetails, privateComments,isDraft:true };
    dispatch(createReviewDraft(id, data,paperData.paper_identifier,{username: user.name}));
    alert('Thank You!! Your draft has been saved');
    setIsSubmitted(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewDetails || !privateComments) {
      alert('Please fill all the fields');
      return;
    }
    const data = { overallScore, reviewDetails, privateComments,isDraft:false };
    dispatch(createReviewSubmit(id, data,paperData.paper_identifier,{username: user.name}));
    alert('Review submitted! You cannot make any further changes');
    setIsSubmitted(true);
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
      {!isSubmitted && <button className='button1' type="button" onClick={handleSubmit}>Submit</button>}
      {!isSubmitted && <button className='button1' type="button" onClick={handleBack}>Go Back</button>}

      {isSubmitted && <p>Review has been submitted.</p>}
    </div>

  </form>
);
};
export default Review;
