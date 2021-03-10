import React from "react";
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/registeraccount">
            <RegisterAccount />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
