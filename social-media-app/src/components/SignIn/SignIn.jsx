import React from "react";

import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="text-center centered">
      <main className="form-signin">
        <form>
          <img
            className="mb-4"
            src="https://via.placeholder.com/72x57.png?text=REA"
            alt="logo"
          />
          <h1 className="h3 mb-3">Sign in</h1>
          <label for="inputEmail" className="visually-hidden"></label>
          <input
            type="username"
            id="inputEmail"
            className="form-control"
            placeholder="Username"
            required
            autofocus
          />
          <label for="inputPassword" className="visually-hidden">
            Password
          </label>

          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" className="me-2" />
              <span>Remember Me</span>
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
      <nav>
        <Link to="/registeraccount">No acount? Create account here</Link>
      </nav>
    </div>
  );
}

export default SignIn;
