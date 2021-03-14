import Signup from "./components/Signup/Signup";
import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route  path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
