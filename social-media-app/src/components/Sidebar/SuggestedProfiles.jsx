import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfiles({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    //  2 services created in services/firebase.js
    // update the following array of the logged in user (in this case, my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }


  return !followed ? (
    <Container>
      <Row className="mb-3 ">
        <Col>
          <Link to={`/p/${username}`}>
            <Image
              roundedCircle
              className=""
              src={`/images/avatars/${username}.jpg`}
              alt=""
              width="40px"
              height="37px"
            ></Image>
          </Link>
          <Col className="font-weight-bold row">{username}</Col>
        </Col>

        <Col className="p-0">
          <Button variant="primary" size="sm"
          onClick={handleFollowUser}>
            Befriend
          </Button>
        </Col>
      </Row>
    </Container>
  ) : null;
}

SuggestedProfiles.propTypes = {
  spDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string
};
