import React from "react";
import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";
import {Container} from 'react-bootstrap'

export default function Sidebar() {
  const { 
      user: {fullName, username, emailAdress, userId} } = useUser()
      //user === docId, email, following, fullname, userId, username

 

  return (
    <>
    <Container>
   
      <User username={username} fullName={fullName} emailAdress={emailAdress} />
      <Suggestions userId={userId} />
    </Container>
    
    </>
  );
}
