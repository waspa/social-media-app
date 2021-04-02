/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/User';
import {Button, Image,  Row, Col} from 'react-bootstrap'

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
    username: profileUsername
  }
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!isFollowing);
    };
   
    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);
  console.log(profileUserId)
  console.log(profileUsername)

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
      <Row className="d-grid col-6">
      <p className="font-weight-bold">{profileUsername}</p>
        <Col className=" d-flex items-center">
        <p className="font-weight-medium mr-4">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
          
         
          
          {activeBtnFollow && (
            <Button
              className="  "
             
              onClick={handleToggleFollow}
             
            >
              {isFollowingProfile ? 'Unfriend' : 'Befriend'}
            </Button>
          )}
        </Col>
        <Col className="container d-flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-2">
                <span className="font-weight-bold">{photosCount}</span> photos
              </p>
              <p className="mr-2">
                <span className="font-weight-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `friends` : `befriended`}
              </p>
              <p className="mr-2">
                <span className="font-weight-bold">{following?.length}</span> friended
              </p>
            </>
          )}
        </Col>
        
      </Row>
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
    following: PropTypes.array
  }).isRequired
};

 /*  <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          /> */


          /*  <img
            className="rounded-full h-40 w-40 flex"
            alt={"Karl Hadwen's profile picture"}
            src="/images/avatars/ernesto.jpg"
          /> */