import React from "react";
import {useAuth} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN}/>
        }}
    />
  );
}
