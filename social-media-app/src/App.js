import React from 'react'
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from './pages/Sign-up'
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard';
import * as ROUTES from './constants/routes'


if(module.hot){
  module.hot.accept()
}

function App() {
  return (
    <>
       <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
           {/*  <FirebaseContext.Provider> */}
              <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={Signup} />
              <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
              <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                {/* 
                <Route  path="/update-profile" component={UpdateProfile} />
               
                 */}
              </Switch>
     {/*        </FirebaseContext.Provider> */}
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
