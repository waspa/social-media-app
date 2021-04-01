import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

export default function Footer({ caption, username }) {
  return (
    <div className=" mb-3 pl-0 border-bottom w-100">
      <span className="font-weight-bold pr-1">{username} </span>
      <span> {caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
