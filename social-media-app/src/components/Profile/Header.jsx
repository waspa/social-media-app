/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from "../../context/User";
import { Button, Image, Row, Col } from "react-bootstrap";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

/*   console.log(profileUserId);
  console.log(profileUsername);
  console.log(followers); */
  console.log(user)

  return (
    <div className="border-bottom border-dark">
      <Row className="  mt-3 mb-3">
        <Col className="d-flex justify-content-center">
          {profileUsername ? (
            <Image
              alt={`${profileUsername} profile`}
              roundedCircle
              className=""
              src={`/images/avatars/${profileUsername}.jpg`}
              width="auto"
              height="80px"
            />
          ) : (
            <Image
              alt={`${user.displayName} profile`}
              roundedCircle
              className=""
              src={`/images/avatars/${profileUsername}.jpg`}
              width="auto"
              height="80px"
            />
          )}
        </Col>
        <Col className=" col-lg-10 col-md-10 ">
          <p className="font-weight-bold">{profileUsername}</p>

          <Col className=" d-flex p-0">
            <p className="font-weight-medium mr-4">
              {!fullName ? <Skeleton count={1} height={24} /> : fullName}
            </p>

            {activeBtnFollow && (
              <Button className="  " onClick={handleToggleFollow}>
                {isFollowingProfile ? "Unfriend" : "Befriend"}
              </Button>
            )}
          </Col>
          <Col className="container d-flex mt-4">
            {!followers || !following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <Row>
                  <p className="mr-5">
                    <span className="font-weight-bold">{photosCount}</span>{" "}
                    photos
                  </p>
                </Row>
                <Row>
                  <p className="mr-5">
                    <span className="font-weight-bold">{followerCount}</span>
                    {` `}
                    friended
                  </p>
                </Row>
                <Row>
                  <p className="mr-5">
                    <span className="font-weight-bold">
                      {following?.length}
                    </span>{" "}
                    {followerCount === 1 ? `friend` : `friends`}
                  </p>
                </Row>
              </>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};

