import React from "react";
import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";
import { Container } from "react-bootstrap";

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();
  //user === docId, email, following, fullname, userId, username

  

  return (
    <>
      <Container>
        <User
          username={username}
          fullName={fullName}
        
        />
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
      </Container>
    </>
  );
}
