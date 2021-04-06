import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/Firebase";
import UserContext from "../../context/User";
import { Button } from "react-bootstrap";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    //setComments([ { displayName, comment },  ...comments]);
    setComments([...comments, { displayName, comment }   ]);
    setComment("");

    //give a new array []
    //put the new comment in there
    //add the old comment
    //now we have a new array with the new comment and the older comments



    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className=" mt-2 w-100 ">
      <form
        className="d-flex justify-between "
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="pl-0 col "
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <Button
          className={""}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </Button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
