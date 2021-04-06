import usePhotos from "../hooks/use-photos";
import { Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Post from "./Post/Index";
import CreatePost from "./Post/CreatePost";
//import LoggedInUserContext from '../context/LoggedInUser';
//import { useContext } from 'react';

export default function Timeline() {
  //we get the logged in user's photos (custom hooks)
  const { photos } = usePhotos();
  //const { user } = useContext(LoggedInUserContext);

  //if there are photos, render them (create a post)
  // if the user has no photos, tell them to create some photos

  

  return (
    <>
     <Col>
            <CreatePost />
            </Col>
      <Col className="mb-4">
        {!photos ? (
          <Skeleton count={4} height={500} className="mb-4" />
        ) : photos?.length > 0 ? (
          
          photos.map((content) => <Post key={content.docId} content={content}/>)
        ) : (
          <p>Befriend people to see photos!</p>
        )}
      </Col>
     
    </>
  );
}




/* import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/LoggedInUser';
import usePhotos from '../hooks/use-photos';
import Post from './Post/Index';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
} */















