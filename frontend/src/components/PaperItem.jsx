import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewList from './ReviewList';

function PaperItem({ paper }) {
  const navigate = useNavigate();
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(`/api/reviews/${paper._id}`);

        if (response.ok) {
          const reviewData = await response.json();
            console.log(reviewData);

            for (let i = 0; i < reviewData.length; i++) {

          setHasSubmittedReview(reviewData[i].paper === paper._id && reviewData[i].isSubmitted == true);
            }

        } else {
          throw new Error('Failed to fetch review data');
        }
      } catch (error) {
        console.error(error);
        setHasSubmittedReview(false);
      }
    };

    fetchReviewData();
  }, [paper._id]);

  const handleReviewClick = () => {
    navigate(`/review/${paper._id}`);
  };
  const handleViewReview = () => {
    navigate(`/review/view/${paper._id}`);
  };

  return (
    <tr class="info" style={{ height: '20px' }}>
      <td style={{ align: 'left' }}>{paper.paper_title}</td>
      <td style={{ align: 'left' }}>{paper.authors}</td>
      <td>{paper.keywords}</td>
      <td style={{ align: 'left', maxWidth: '300px' }}>
      <div style={{ overflowX: 'auto', maxHeight: '200px', textAlign: 'justify' }}>
         {paper.abstract}</div>
      </td>
      <td>
        <a href={paper.pdf_attachment} target="_blank">
          View Paper
        </a>
      </td>
      <td>{paper.submitted_by_author}</td>
      <td>
        {hasSubmittedReview ? (
          <button className= 'button1' onClick={handleViewReview}>View Review</button>
          ) : (
          <button className= 'button1'onClick={handleReviewClick}>Review</button>
        )}
      </td>
    </tr>
  );
}

export default PaperItem;
