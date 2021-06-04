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
