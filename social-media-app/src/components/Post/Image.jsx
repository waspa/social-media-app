//import {Image, Row, Col, Container} from 'react-bootstrap'
import PropTypes from "prop-types";


export default function Image({ src, caption }) {
  return (
    <>
  
    <img className="img-thumbnail" src={src} alt={caption}/>
    </>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
