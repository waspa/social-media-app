import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  createContext,
} from "react";
import { db, FieldValue, firebase } from "../lib/Firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser, currentUserId, currentUserDetails } = useContext(
    AuthContext
  );
  const [chatRecipient, setChatRecipient] = useState();

  const readIds = async (collection, ids) => {
    const reads = ids.map((id) => collection.doc(id).get());
    const result = await Promise.all(reads);
    return result.map((item) => item);
  };

  const fetchFriends = async () => {
    return await db
      .collection("users")
      .doc(currentUserId)
      .get()
      .then(async (snapshot) => {
        let users = [];

        if (snapshot.data() && snapshot.data().followers) {
          users = await readIds(
            db.collection("users"),
            snapshot.data().followers
          );
        }

        let all_users = [];
        users.forEach((doc) => {
          all_users.push(doc);
        });
        return all_users;
      });

    // working ...
    // var cityRef = await db.collection("users").doc(userId);
    // var setWithMerge = cityRef.set(
    //   {
    //     followers: ["9nenbRrcB5iJSOpNtPct", "FGGUkbL9EOMiKloyHo8F"],
    //   },
    //   { merge: true }
    // );

    // return setWithMerge;

    // working ...
    // return await db
    //   .collection("users")
    //   .doc(userId)
    //   .update({
    //     followers: FieldValue.arrayUnion("Rgew0I00LeVxIz5RgK5BU5eN5bQ2"),
    //   });
  };

  const fetchFriendsPosts = (userId) => {
    return db.collection("posts").where("postedBy", "==", userId).get();
  };

  /********** Chats ********/
  /*
   *    {
   *      id: 'documentId'
   *      messages:
   *        [
   *          {
   *            id: 'chatId',
   *            text: '',
   *            photoUrl: '',
   *            videoUrl: '',
   *            postedBy: '',
   *            createdAt: '',
   *          }
   *        ]
   *      createdAt: ''
   *     }
   * store documentId in under users document for both parties involved in chat ...
   * users document { ..., rooms: [ {roomId: 'documentId', friend: 'friendId'} ] }
   */
  const createPrivateRoom = async (userId) => {
    const docRef = await db.collection("rooms").add({
      createdAt: FieldValue.serverTimestamp(),
      messages: [],
    });

    const roomRef = await db
      .collection("users")
      .doc(userId)
      .update({
        rooms: FieldValue.arrayUnion({
          roomId: docRef.id,
          friend: currentUserId,
        }),
      });

    await db
      .collection("users")
      .doc(currentUserId)
      .update({
        rooms: FieldValue.arrayUnion({
          roomId: docRef.id,
          friend: userId,
        }),
      });

    return docRef.id;
  };

  const getUserDetails = async (id) => {
    const user = await db.collection("users").doc(id).get();
    return user;
  };

  const getChatRoomId = async (userId) => {
    const user = currentUserDetails.data();
    const rooms = user && user.rooms;
    let roomId = null;
    if (rooms) {
      rooms.map((room) => {
        if (room.friend === userId) {
          roomId = room.roomId;
          return;
        }
      });
    } else {
      roomId = await createPrivateRoom();
    }

    return roomId;
  };

  const postChat = async (message, photoUrl, videoUrl, roomId) => {
    return await db
      .collection("rooms")
      .doc(roomId)
      .update({
        messages: FieldValue.arrayUnion({
          createdAt: firebase.firestore.Timestamp.now(),
          postedBy: currentUserId,
          text: message,
          photoUrl: photoUrl,
          videoUrl: videoUrl,
        }),
      });
  };

  const fetchChats = (roomId) => {
    return db.collection("rooms").doc(roomId);
  };

  const fetchAllChats = async () => {
    return await db
      .collection("rooms")
      .get()
      .then((items) => {
        items.docs.map((item) => {
          console.log("chat item is  ", item.data());
        });
      });
  };

  const setFriendDetails = (user) => {
    setChatRecipient(user);
  };

  const fetchLastChatMessage = async (userId) => {
    return await db
      .collection("chats")
      .where("sender", "==", userId)
      // .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        const allMsgs = [];
        let lastMessage = "";
        snapshot.docs.map((item) => {
          if (item.data()) allMsgs.push(item.data);
        });

        if (allMsgs.length > 0) lastMessage = allMsgs[allMsgs.length - 1];
        return lastMessage;
      });
  };

  const addPost = (message) => {
    // add currentUser
    return db.collection("posts").add({
      createdAt: FieldValue.serverTimestamp(),
      postedBy: currentUserId,
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
    // add currentUserId
    return db
      .collection("posts")
      .doc(postId)
      .update({
        comments: FieldValue.arrayUnion({
          createdAt: FieldValue.serverTimestamp(),
          createdBy: currentUserId,
          message: message,
        }),
      });
  };

  const lovePost = (messageId) => {
    // add currentUserId
    return db
      .collection("posts")
      .doc(messageId)
      .update({
        love: FieldValue.arrayUnion(currentUserId),
      });
  };

  const likePost = (messageId) => {
    return db
      .collection("posts")
      .doc(messageId)
      .update({
        likes: FieldValue.arrayUnion(currentUserId),
      });
  };

  const getRequestRoomId = async () => {
    // check if the user already has a request room
    return await db
      .collection("requests")
      .where("userId", "==", currentUserId)
      .get()
      .then((snapshot) => {
        return snapshot.docs[0].data();
      })
      .catch(async (err) => {
        console.log(" the request room Id did not exist and error is ", err);
      });
  };

  const fetchFriendRequests = () => {
    return db
      .collection("requests")
      .where("userId", "==", currentUserId)
      .get()
      .then((snapshot) => {
        return readIds(db.collection("users"), snapshot && snapshot.requests);
      })
      .catch((errors) =>
        console.log("errors occured on fetchFriendRequests ", errors)
      );
  };

  const fetchRequests = () => {
    return db.collection("requests").where("userId", "==", currentUserId);
  };

  const sendFriendRequest = async (userId) => {
    return await db
      .collection("requests")
      .where("userId", "==", userId)
      .get()
      .then(async (snapshot) => {
        let userId = snapshot && snapshot.docs[0] && snapshot.docs[0].id;
        let results = await db
          .collection("requests")
          .doc(userId)
          .update({
            requests: FieldValue.arrayUnion(currentUserId),
          });
      })
      .catch((err) => {
        console.log("sendFriendRequest error is ", err);
      });
  };

  const acceptFriendRequest = async (userId, requestId) => {
    return await db
      .collection("requests")
      .doc(requestId)
      .update({
        requests: FieldValue.arrayRemove(userId),
      })
      .then(async () => {
        // add userId as follower to current user
        await db
          .collection("users")
          .doc(currentUserId)
          .update({ followers: FieldValue.arrayUnion(userId) });

        // add current user as follower to userId
        return await db
          .collection("users")
          .doc(userId)
          .update({ followers: FieldValue.arrayUnion(currentUserId) });
      });
  };

  const declineFriendRequest = async (userId, requestId) => {
    return await db
      .collection("requests")
      .doc(requestId)
      .update({
        requests: FieldValue.arrayRemove(userId),
      });
  };

  const searchFriends = (search) => {
    return db
      .collection("users")
      .whereGreaterThanOrEqualTo("fullName", search)
      .get();
  };

  const getUserId = async (uid) => {
    var cityRef = await db.collection("users").where("userId", "==", uid).get();
    console.log("cityRef[0]", cityRef.docs[0].data());
  };

  const fetchAllUsers = async () => {
    const results = await db.collection("users").get();
    results.docs.map((user) =>
      console.log("user object is ", user.id, user.data())
    );
    return null;
  };

  const fetchUsers = () => {
    return db.collection("users");
  };

  const value = {
    fetchFriends,
    fetchFriendsPosts,
    createPrivateRoom,
    getChatRoomId,
    postChat,
    setFriendDetails,
    fetchChats,
    fetchLastChatMessage,
    addPost,
    fetchPosts,
    addComment,
    lovePost,
    likePost,
    getRequestRoomId,
    fetchFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    searchFriends,
    fetchAllUsers,
    chatRecipient,
    fetchAllChats,
    fetchUsers,
    fetchRequests,
    readIds,
    getUserDetails,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
