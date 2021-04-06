import React, { useState} from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import Skeleton from "react-loading-skeleton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Col, Row, Form, Container, Button, Image } from "react-bootstrap";

import { storage, db, FieldValue } from "../../lib/Firebase";
import firebase from "firebase";



export default function CreatePost() {
  const [caption, setCaption] = useState("");
 
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const {
    user: { username, userId },
  } = useUser();

  const handleChange = (e) => {
      e.preventDefault();
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
          var src1 = URL.createObjectURL(e.target.files[0]);
          var preview1 = document.getElementById("image-1-preview");
          preview1.src = src1;
          preview1.style.display = "block";
        } 
  };

  const handleUpload = (e) => {
    e.preventDefault();
     if (image) {
      const uploadTask = storage.ref(`image/${image.name}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // get download urls and upload complete function/ post info
         storage
            .ref("images")
            .child(`${image.name}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              FieldValue.collection("posts").doc(image).set({
                
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageSrc: imageUrl,
                userId: userId,
                likes: [],
              
                username: username.toLowerCase(),
                /* userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4", */
              
              })
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    } 
  };

  /*   console.log("Fullname", fullName);
  console.log("username", username);
  console.log("userId", userId);
  console.log("following", following);
  console.log("docId", docId); */

  return (
    <>
      <Container className="col-8 bg-light mt-3">
        <Form>
          {username ? (
            <Col className="p-0">
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className=" "
              >
                <Form.Label>
                  <h4 className="m-0 p-0">Create a post</h4>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="create a post"
                  rows={2}
                  value={caption}
                  placeholder="Caption..."
                  onChange={(e) => setCaption(e.target.value)}
                />
              </Form.Group>
              <Col className="imagePreview ">
                <Image
                  //onClick={() => removeImage()}
                  id="image-1-preview"
                  alt="preview"
                  className="col-3 m-0 p-0"
                  rounded
                  
                />
                {/* {progress === 0 ? (
                  <></>
                ) : (
                  <CircularProgress
                    className="circularProgress"
                    variant="determinate"
                    value={progress}
                  />
                )} */}
              </Col> 
              <Row className=" d-flex justify-content-between mr-0 ml-0">
                <div className="createPost_imageUpload">
                  <label htmlFor="fileInput">
                    <div type="button" className="">
                      <AddAPhotoIcon />
                    </div>
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    onChange={handleChange}
                    accept="image/*"
                    id="fileInput"
                  />
                </div>
                <Button className="btn-sm" onClick={handleUpload}>
                  {`Upload ${progress !== 0 ? progress : ""}`}
                </Button>
              </Row>
            </Col>
          ) : (
            <div>
              <p className="font-weight-medium mr-4">
                <Skeleton count={1} height={150} />
              </p>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}

CreatePost.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};
