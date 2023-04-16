import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsbyId } from '../features/reviews/reviewSlice';
import Spinner from '../components/Spinner'

const ViewReview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(state => state.review);

  useEffect(() => {
    dispatch(getReviewsbyId(id));
  }, [dispatch]);

  if (loading) {
    return <Spinner />
  }
  return (
    <>
    <section className='heading' >
        {/* <h1>Welcome {user && user.name}</h1> */}
        <h2 style={{fontFamily: "Georgia, serif" }}>Reviews to the Paper</h2>
      </section>
      {loading && <div>Loading reviews...</div>}
      {error && <div>Error fetching reviews: {error}</div>}
      {!loading && !error && reviews.length === 0 && <div>No reviews found</div>}
      {!loading && !error && reviews.length > 0 &&
        <table className="table  table-striped table-bordered table-hover table-sm" style={{textAlign: "left"}}>
          <thead>
            <tr class="danger">
              <th  style={{paddingLeft: "10px",width: "10%"}}>Author Name</th>
              <th  style={{paddingLeft: "10px",width: "10%"}}>Overall Score</th>
              <th  style={{paddingLeft: "10px",width: "10%"}}>Review Details</th>
              <th  style={{paddingLeft: "10px",width: "10%"}}>Private Comments</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id}>
                <td>{review.username}</td>
                <td>{review.overallScore}</td>
                <td>{review.reviewDetails}</td>
                <td>{review.privateComments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default ViewReview;
