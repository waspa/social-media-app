import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign-up";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import FriendsPage from "./pages/FriendsPage";
import RequestsPage from "./pages/RequestsPage";
// import ChatRoom from "./pages/ChatRoom";

import FriendProfile from "./pages/FriendProfile";

import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./constants/PrivateRoute";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <>
      <AuthProvider>
          <Router>

            <AuthProvider>
              <ChatProvider>
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
                <PrivateRoute
                  exact
                  path={ROUTES.FRIENDS_PAGE}
                  component={FriendsPage}
                />
                <PrivateRoute
                  exact
                  path={ROUTES.REQUESTS_PAGE}
                  component={RequestsPage}
                />
                {/*<PrivateRoute
                  exact
                  path={`${ROUTES.CHAT_ROOM}/:id`}
                  component={ChatRoom}
                />*/}
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
              </ChatProvider>
            </AuthProvider>

            {/*        </FirebaseContext.Provider> */}
          </Router>
 

      </AuthProvider>
    </>
  );
}

export default App;
