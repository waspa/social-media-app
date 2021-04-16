import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign-up";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import FriendsPage from "./pages/FriendsPage";
import ChatRoom from "./pages/ChatRoom";
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
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
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
                      exact
                      path={ROUTES.FRIENDS_PAGE}
                      component={FriendsPage}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.CHAT_ROOM}
                      component={ChatRoom}
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
                </ChatProvider>
              </AuthProvider>

              {/*        </FirebaseContext.Provider> */}
            </Router>
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
