//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Image } from "react-bootstrap";

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    
      <div className="d-grid col-11 ">
      <Link to={`/p/${username}`} >
        <Image
          alt={`${username} profile`}
          roundedCircle
          className=""
          src={`/images/avatars/${username}.jpg`}
          width="auto"
          height="100px"
        ></Image>
        </Link>
        <p className="mb-0 col font-weight-bold">{username}</p>
        <p className="col">{fullName}</p>
      </div>
      
      
    
  );

export default User;

/* User.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired
}; */
