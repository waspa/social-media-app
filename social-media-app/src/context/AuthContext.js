import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db, FieldValue } from "../lib/Firebase";
import { ChatContext } from "./ChatContext";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUserDetails, setCurrentUserDetails] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function getCurrentUserId(uid) {
    var userRef = await db.collection("users").where("userId", "==", uid).get();

    return userRef.docs.map((item) => {
      return item.id;
    });
  }

  async function getCurrentUserDetails(id) {
    var user = await db.collection("users").doc(id).get();
    return user;
  }

  // I highly suggest to instead use createRequestRoom under signup
  // here am calling getRequestRoomId so if it does not exist then we create it, otherwise createRequestRoom is best choice
  const getRequestRoomId = async (userId) => {
    // check if the user already has a request room
    if (userId) {
      return await db
        .collection("requests")
        .where("userId", "==", userId)
        .get()
        .then((snapshot) => {
          console.log("snapshot.docs[0].data()", snapshot.docs[0].data());
          return snapshot.docs[0].data();
        })
        .catch(async (err) => {
          console.log(" the request room Id did not exist and error is ", err);
          console.log(" the request room Id did not exist");
          // create a request room for the user...
          const results = await createRequestRoom(userId);
          return getRequestRoomId(userId);
        });
    } else {
      console.log("Get request room Id!!!");
    }
  };

  // friend request => { userId, requests: Array of UserIds }
  const createRequestRoom = async (userId) => {
    return await db.collection("requests").add({
      createdAt: FieldValue.serverTimestamp(),
      userId: userId,
      requests: [],
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const userIds = await getCurrentUserId(user && user.uid);
      const userDetails = await getCurrentUserDetails(userIds[0]);
      setCurrentUserDetails(userDetails);
      setCurrentUserId(userIds[0]);
      setCurrentUser(user);

      // set up the request room, but this would be best as a one time on signup...
      getRequestRoomId(userIds[0]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserId,
    currentUserDetails,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getRequestRoomId,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
