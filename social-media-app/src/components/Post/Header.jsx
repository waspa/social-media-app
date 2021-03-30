import PropTypes from 'prop-types';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    <Col className="d-flex border border-secondary  p-4">
      <div className="d-flex justify-content-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <Image
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </Col>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};