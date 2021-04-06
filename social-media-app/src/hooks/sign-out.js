import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Col,} from "react-bootstrap";
import * as ROUTES from "../constants/routes";

import "../styles/global.css";
import {HomeButton, SignOutButton} from './Buttons'

//Instagram Clone  
//import  { useContext } from "react";
//import FirebaseContext from "../context/Firebase"; //gives info on user logging out
//import UserContext from "../context/User";

////////////////////////////

///Web Dev
import { useAuth } from "../context/AuthContext";

////////////////////////////

export default function Signout() {
  ///////////////Instagram Clone
  //const { firebase } = useContext(FirebaseContext);
  /* const { user } = useContext(UserContext); //currentUser


  console.log(user); */

  ///////////////////////

  //////////////Web Dev
  const history = useHistory();

  const { logout } = useAuth();

  //console.log(currentUser);

  async function handleSignout() {
   

   
      await logout();
      history.push("/login");
    } 
      
 

  return (
    <div >
    
      
            <Col>
              <Link to={ROUTES.DASHBOARD}>
                <HomeButton />
              </Link>
            </Col>
            <Col>
              <div onClick={handleSignout}>
                <SignOutButton />
              
              </div>
            </Col>
          
    
    </div>
  );
}