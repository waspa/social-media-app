import React, { useContext, useEffect, useReducer, createContext } from "react";
import { db, FieldValue } from "../lib/Firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const readIds = async (collection, ids) => {
    const reads = ids.map((id) => collection.doc(id).get());
    const result = await Promise.all(reads);
    return result.map((item) => item.data());
  };

  const fetchFriends = async () => {
    console.log(
      "currentUser userId, uid ",
      currentUser.userId,
      currentUser.uid
    );
    // return await db
    //   .collection("users")
    //   .doc(currentUser.uid)
    //   .get()
    //   .then((snapshot) => {
    //     console.log("snapshot is ", snapshot);
    //     const users = readIds(
    //       db.collection("users"),
    //       snapshot && snapshot.friends
    //     );
    //     const all_users = [];
    //     users.forEach((doc) => {
    //       all_users.push(doc);
    //     });
    //   })
    //   .catch((errors) => {
    //     return errors;
    //   });
    return await db.collection("users").get();
    // return await db.collection("users").doc(currentUser.uid).get();

    // add a field to already existing doc
    // var cityRef = await db.collection("users").doc(currentUser.uid);

    // var setWithMerge = cityRef.set(
    //   {
    //     results: [],
    //   },
    //   { merge: true }
    // );

    // return setWithMerge;

    // return await db
    //   .collection("users")
    //   .doc(currentUser.uid)
    //   .update({
    //     followers: FieldValue.arrayUnion("Rgew0I00LeVxIz5RgK5BU5eN5bQ2"),
    //   });
  };

  /*
  "Rgew0I00LeVxIz5RgK5BU5eN5bQ2"//
  "ekMr5v6AtfUakneN8AgwCgzFPMR2"
  "kVfSE0EagUZw1D2H7kDujanVCvv1"
  */

  const fetchFriendsPosts = (userId) => {
    return db.collection("posts").where("postedBy", "==", userId).get();
  };

  const chatWithFriend = (message, userId) => {
    // add currentUser
    return db.collection("chats").add({
      createdAt: FieldValue.serverTimestamp(),
      postedBy: userId,
      message: message,
    });
  };

  const fetchChats = (userId) => {
    // get currentUser
    return db
      .collection("chats")
      .where("postedBy", "==", userId)
      .where("addressedTo", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .get();
  };

  const addPost = (message) => {
    // add currentUser
    return db.collection("posts").add({
      createdAt: FieldValue.serverTimestamp(),
      postedBy: currentUser,
      message: message,
      likes: [],
      loves: [],
      comments: [],
    });
  };

  const fetchPosts = (userId) => {
    return db.collection("posts").get();
  };

  const addComment = (postId, message) => {
    // add currentUser
    return db
      .collection("posts")
      .doc(postId)
      .update({
        comments: FieldValue.arrayUnion({
          createdAt: FieldValue.serverTimestamp(),
          createdBy: currentUser,
          message: message,
        }),
      });
  };

  const lovePost = (messageId) => {
    // add currentUser
    return db
      .collection("posts")
      .doc(messageId)
      .update({
        love: FieldValue.arrayUnion(currentUser),
      });
  };

  const likePost = (messageId) => {
    return db
      .collection("posts")
      .doc(messageId)
      .update({
        likes: FieldValue.arrayUnion(currentUser),
      });
  };

  // friend request => { userId, requests: Array of UserIds }
  const fetchFriendRequests = () => {
    return db
      .collection("requests")
      .where("userId", "==", currentUser)
      .get()
      .then((snapshot) => {
        return readIds(db.collection("users"), snapshot && snapshot.requests);
      })
      .catch((errors) =>
        console.log("errors occured on fetchFriendRequests ", errors)
      );
  };

  const sendFriendRequest = (userId) => {
    // get currentUser
    return db
      .collection("requests")
      .where("userId", "==", userId)
      .update({ requests: FieldValue.arrayUnion(currentUser) });
  };

  const acceptFriendRequest = (userId, requestId) => {
    // get currentUser
    return db
      .collection("requests")
      .doc(requestId)
      .update({
        requests: FieldValue.arrayRemove(userId),
      })
      .then(() => {
        return db
          .collection("users")
          .doc(currentUser)
          .update({ friends: FieldValue.arrayUnion(userId) })
          .get();
      });
  };

  const searchFriends = (search) => {
    // return db.collection("users").where("fullName", "==", search).get();
    return db
      .collection("users")
      .whereGreaterThanOrEqualTo("fullName", search)
      .get();
  };

  const value = {
    fetchFriends,
    fetchFriendsPosts,
    chatWithFriend,
    fetchChats,
    addPost,
    fetchPosts,
    addComment,
    lovePost,
    likePost,
    fetchFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    searchFriends,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
