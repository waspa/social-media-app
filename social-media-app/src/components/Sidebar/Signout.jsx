import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Row } from "react-bootstrap";
import * as ROUTES from "../../constants/routes";

import "../../styles/global.css";
import { HomeButton, SignOutButton } from "../Buttons";

import { useAuth } from "../../context/AuthContext";

export default function Signout() {
  const history = useHistory();

  const { logout } = useAuth();

  async function handleSignout() {
    await logout();
    history.push("/login");
  }

  return (
    <div>
      <Row className="mb-4 ">
        <Link to={ROUTES.DASHBOARD} className="ml-4 mr-4">
          <HomeButton />
        </Link>
        <p>Dashboard</p>
      </Row>

      <Row className=" mr-4">
        <div onClick={handleSignout} className="ml-4 mr-4">
          <SignOutButton />
        </div>
        <p>Sign out</p>
      </Row>
    </div>
  );
}
