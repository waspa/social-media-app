import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign-up";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import FriendProfile from "./pages/FriendProfile";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./constants/PrivateRoute";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <>
      <AuthProvider>
       

          <Router>

            <AuthProvider>
              <Switch>
                <PrivateRoute
                  exact
                  path={ROUTES.DASHBOARD}
                  component={Dashboard}
                />
                <PrivateRoute
               
                  path={ROUTES.FRIENDS_PROFILE}
                  component={FriendProfile}
                />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.SIGN_UP} component={Signup} />
                <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                <Route
                  path={ROUTES.RESET_PASSWORD}
                  component={ResetPassword}
                />
                <Route
                  path={ROUTES.UPDATE_PROFILE}
                  component={UpdateProfile}
                />
              </Switch>
            </AuthProvider>

            {/*        </FirebaseContext.Provider> */}
          </Router>
 
      </AuthProvider>
    </>
  );
}

export default App;
