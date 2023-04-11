import {useNavigate} from 'react-router-dom' ;

function PaperItem({ paper }) {
  
  const navigate = useNavigate();

  const reviewForm = () => {
    navigate('/review');
  }
  return (
    // <div className='paper'>
    //   <div>{new Date(paper.createdAt).toLocaleString('en-US')}</div>
    //   <h2>{paper.text}</h2>
    //   <button onClick={() => dispatch(deletePaper(paper._id))} className='close'>
    //     X
    //   </button>
    // </div>
    <tr class="info" style={{ height:'20px' }}>

                           <td style={{align: "left"}}> {paper.paper_title}</td>
                            <td style={{ align: "left"}}>{paper.authors}</td>
                            <td>{paper.keywords}</td>
                            <td>{paper.abstract}</td>
                            <td ><a href={paper.pdf_attachment} target="_blank">View Paper</a></td>
                            
                            <td >{paper.submitted_by_author}</td>
                            <td><button onClick={reviewForm}>Review</button></td>
                    </tr>
  )
}

export default PaperItem