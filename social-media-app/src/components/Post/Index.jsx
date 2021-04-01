import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

import { Row } from "react-bootstrap";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  // components
  // -> header, image, actions (like & comment icons), footer, comments

  return (
    <>
      <Row className="mb-5 col-md-10 col-lg-8 bg-light p-0">
        <Header username={content.username} />

        <Image src={content.imageSrc} caption={content.caption} />

        <Actions
          docId={content.docId}
          totalLikes={content.likes.length}
          likedPhoto={content.userLikedPhoto}
          handleFocus={handleFocus}
        />

        <Footer caption={content.caption} username={content.username} />

        <Comments
          docId={content.docId}
          comments={content.comments}
          posted={content.dateCreated}
          commentInput={commentInput}
        />
      </Row>
    </>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    //shape because it is an object
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
