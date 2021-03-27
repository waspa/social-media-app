import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign-up";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
//import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./constants/PrivateRoute";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import "./styles/app.css";
import Dashboard2 from "./pages/Dasboard2";

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <>
      <AuthProvider>
        <Container>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute
                  exact
                  path={ROUTES.DASHBOARD}
                  component={Dashboard2}
                />
                <div className="align-items-center justify-content-center center">
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
                </div>
              </Switch>
            </AuthProvider>

            {/*        </FirebaseContext.Provider> */}
          </Router>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
/* className="d-flex align-items-center justify-content-center"
style={{ minHeight: "100vh" }}
<div className="w-100" style={{ maxWidth: "400px" }}></div> */
