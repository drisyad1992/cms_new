import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getReviews } from '../features/reviews/reviewSlice'

function ViewReview() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { review, isLoading, isError, message } = useSelector(
      (state) => state.review
    )
  
    useEffect(() => {
      if (isError) {
        console.log(message)
      }})
  
    if (isLoading) {
      return <Spinner />
    }
    dispatch(getReviews())
  
    return (
      <>
        <section className='heading' >
          {/* <h1>Welcome {user && user.name}</h1> */}
          <h2 style={{fontFamily: "Georgia, serif" }}>All Reviewers' Comments</h2>
        </section>
  
        {/* <PaperForm /> */}
  
          {review.length > 0 ? (
            <div >
              {/* {papers.map((paper) => (
                <PaperItem key={paper._id} paper={paper} />
              ))} */}
              <br></br>
        {/* table-striped  table-bordered*/}
  <table className="table  table-striped table-bordered table-hover table-sm" style={{textAlign: "left"}} >
      <thead>
          <tr class="danger">
              <th style={{paddingLeft: "10px",width: "10%"}}>Overall Score</th>
              <th style={{paddingLeft: "10px" ,width: "10%"}}>Review Details</th>
              <th style={{paddingLeft: "10px" ,width: "10%"}}>Private Comments</th>
              <th style={{paddingLeft: "10px" ,width: "10%"}}>Reviewed By</th>
  
          </tr>
      </thead>
      <tbody>
      {Array.isArray(review) &&
  review.map((review) => <PaperItem key={review.paper} review={review} />)}
  
  </tbody>
     
  </table>
            </div>
          ) : (
            <h3>You have not assigned any papers</h3>
          )}
      </>
    )
  }
  
  export default ViewReview