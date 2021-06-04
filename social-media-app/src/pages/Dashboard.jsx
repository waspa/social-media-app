// import React, { useEffect, useState } from "react";
// import { Card, Button, Alert, Container } from "react-bootstrap";
// import { useHistory, Link } from "react-router-dom";
// import * as ROUTES from "../constants/routes";
// import { useAuth } from "../context/AuthContext";

// export default function Dashboard() {
//   const history = useHistory();
//   const [error, setError] = useState("");
//   const { currentUser, logout } = useAuth();

//   console.log(currentUser);

//   async function handleSignout() {
//     setError("");

//     try {
//       await logout();
//       history.push("/login");
//     } catch {
//       setError("Failed to log out");
//     }
//   }

//   useEffect(() => {
//     document.title = "Dashboard - Social App";
//   }, []);

//   return (
    {/*<Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center  mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <span className="d-block">
              <strong>Name:</strong> {currentUser.displayName}
            </span>
            <span className="d-block">
              <strong>Email:</strong> {currentUser.email}
            </span>
            <Link
              to={ROUTES.UPDATE_PROFILE}
              className="btn btn-primary w-100 mt-3"
            >
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button className="btn-info" onClick={handleSignout}>
            Log Out
          </Button>
        </div>
      </div>
    </Container>*/}

import React, { useEffect, useState, useCallback } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import Feed from "../components/Feed";
import Layout from "../components/Layout";
import { FaMicrophone } from "react-icons/fa";
import styles from "./dashboard.module.css";
import { streamPosts, updatePost } from "../services/firebase";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  console.log(currentUser.uid);
  const buildPost = useCallback(
    (post, key) =>
      post[key]?.find((id) => id === currentUser.uid)
        ? {
            ...post,
            [key]:
              post[key]?.filter((userId) => userId !== currentUser.uid) || [],
          }
        : {
            ...post,
            [key]: post[key]
              ? [...post[key], currentUser.uid]
              : [currentUser.uid],
          },
    [currentUser.uid]
  );

  const onTapHeartIcon = useCallback(
    (post) => {
      let postTemp = buildPost(post, "hearts");
      updatePost(postTemp).catch((error) => {
        console.error("Error updating document: ", error);
      });
    },
    [buildPost]
  );

  const onTapLikeIcon = useCallback(
    (post) => {
      let postTemp = buildPost(post, "likes");
      updatePost(postTemp).catch((error) => {
        console.error("Error updating document: ", error);
      });
    },
    [buildPost]
  );

  useEffect(() => {
    document.title = "Dashboard - Social App";

    const unsubscribe = streamPosts({
      next: (query) => {
        const feeds = query.docs.map((docSnapshot) => {
          return { ...docSnapshot.data(), id: docSnapshot.id };
        });

        if (posts.length !== feeds.length) {
          setPosts(feeds);
        }
      },
      error: (error) => console.log("Error occured ", error),
      completed: () => console.log("Done"),
    });

    return unsubscribe;
  }, [posts]);

  return (
    <Layout>
      <Form inline className={styles.form}>
        <div className={styles.searchContainer}>
          <InputGroup>
            <FormControl type="text" placeholder="Search a friend" />
            <InputGroup.Append>
              <InputGroup.Text>
                <FaMicrophone />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Form>
      {posts.map((post, index) => (
        <Feed
          key={post.id}
          post={post}
          onTapHeartIcon={onTapHeartIcon}
          onTapLikeIcon={onTapLikeIcon}
        />
      ))}
    </Layout>
  );
}
