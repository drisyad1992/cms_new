// import { useState, useEffect } from 'react';

// function ReviewList({ paperId }) {
//   const [reviewData, setReviewData] = useState(null);

//   useEffect(() => {
//     const fetchReviewData = async () => {
//       try {
//         const response = await fetch(`/api/reviews/${paperId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setReviewData(data);
//         } else {
//           throw new Error('Failed to fetch review data');
//         }
//       } catch (error) {
//         console.error(error);
//         setReviewData(null);
//       }
//     };
  
//     fetchReviewData();
//   }, [paperId]);

//   if (reviewData) {
//     return (
//       <div>
//         <h3>Reviews for {paperId}</h3>
//         <ul>
//           {reviewData.map((review) => (
//             <li key={review._id}>
              
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         No review data found.
//       </div>
//     );
//   }
// }

// export default ReviewList;
