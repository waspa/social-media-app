//import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
//import Actions from './Actions';
/* import Footer from './footer';
import Comments from './comments'; */
import {Row,} from 'react-bootstrap'



export default function Post({ content }) {
  //const commentInput = useRef(null);
  //const handleFocus = () => commentInput.current.focus();

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  //style={{width: 'auto', height: '100rem'}}
  return (
    <>
    <Row className="mb-5">
    
    
   <div className="col" >
   <Header  username={content.username} />
   </div>
   <div>
   <Image src={content.imageSrc} caption={content.caption} />
   </div>
     
     
     

        
        
        
       
   
    </Row>
    </>
  );
}



Post.propTypes = {
  content: PropTypes.shape({ //shape because it is an object
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};

