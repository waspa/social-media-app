import { useState } from "react";
import PropTypes from "prop-types";
//import { formatDistance } from "date-fns"; //changes the unix dateCreated to normal date
import { Link } from "react-router-dom";
import AddComment from "./AddComments";
import { Col } from "react-bootstrap";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);


  
  return (
    <>
    <div className="border-bottom w-100">
      <Col className=" col-12">
      
      {comments.length >= 6 && (
          <p role="button" className="sm-text font-weight-light mb-1">
            View all comments
          </p>
        )}
        {comments.map((item) => ( ///{comments.slice(0,5).map.....}
           
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-weight-bold text-dark">
                {item.displayName}
              </span>
            </Link>
            <span>{item.comment}</span>
            
          </p>
          
        ))}
        {/* <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p> */}
      </Col>
        </div>
        
<AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
          commentInput={commentInput}
          
        />

        
    
      
    </>
  );
  
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
