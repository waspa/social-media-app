import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import Button from "./components/Button";
//import {useAuthState} from "react-firebase-hooks"
//import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  
    apiKey: "AIzaSyCJQRkB5maw1x8dLtcb-Oso4g7JiwsBCCs",
    authDomain: "chat-e311e.firebaseapp.com",
    projectId: "chat-e311e",
    storageBucket: "chat-e311e.appspot.com",
    messagingSenderId: "910294452169",
    appId: "1:910294452169:web:f398df70678076ca714a18"
  });

//this is a chat app
function App() {
 const [User, setUser] = useState(()=> auth.currentUser);
 useEffect(()=>{
   const unsubscribe =auth.onAuthStateChanged( user =>{// state changes if the user is logged on or not
     if(user){
       setUser(user);
     }else {
       setUser(null);
     }

     if(initializing){
       setInitializing(false);
     }
   });
   return unsubscribe;// cleanup subscription
 },[]);

 
  const signInWithGoogle = async () => {
   //Retrieve google provider object

   const provider = new firebase.auth.GoogleAuthProvider();
   //set language to the default browser preference
   auth.useDeviceLanguage();
   //start sign in process

   try{
     await auth.signInWithPopup(provider);
   } catch(error){
     console.error(error)
   }
  };

  const signOut = async () =>{
    try{
      await firebase.auth().signout();
    }catch(error){
      console.log(error.message);
    }
  };
   if(initializing) return "Loading....";
  return (
    <div>
      {user ? (
        <>
        <Button onclick = {signout}>sign out</Button>
        <p>welcome to social App</p>
        </>
      ) : (
        <Button onclick = {signInWithGoogle}>sign in with Google</Button>
      
      )}
    
    </div>
  );
}

export default App;
