import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
 
import { streamUserPosts,  updatePost, getUserById } from "../services/firebase";
import {  useParams } from "react-router-dom"

export default function FriendProfile() {
 
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
 
    const { uid } = useParams()

    // console.log(params)
    // const handleCreatePost = useCallback(
    //     (post) => {
    //         createPost({
    //             ...post,
    //             userId: currentUser.uid,
    //             username: currentUser.displayName,
    //         })
    //             .then((docRef) => {
    //                 console.log("Document written with ID: ", docRef.id);
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding document: ", error);
    //             });
    //     },
    //     [uid]
    // );

    const buildPost = useCallback(
        (post, key) =>
            post[key]?.find((id) => id === uid)
                ? {
                    ...post,
                    [key]:
                        post[key]?.filter((userId) => userId !== uid) || [],
                }
                : {
                    ...post,
                    [key]: post[key]
                        ? [...post[key], uid]
                        : [uid],
                },
        [uid]
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

    useEffect(()=> {
        if(uid){
            getUserById(uid)
            .then(value=> {
                
                console.log(value.data())
            }).then(error => console.log(error))
        }
    },[uid])

    useEffect(() => {
        document.title = "Dashboard - Social App";

        const unsubscribe = streamUserPosts(uid, {
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
    }, [posts, uid]);

    return (
        <Layout>
            {/* <Row>
                <Col>
                    <CommentForm onSubmit={handleCreatePost} />
                </Col>
            </Row> */}
            {posts.map((post, index) => (
                <Feed
                    key={post.id}
                    post={post}
                    onTapHeartIcon={onTapHeartIcon}
                    onTapLikeIcon={onTapLikeIcon}
                    showCommentBtn={false}
                />
            ))}

       </Layout>
    );
}
