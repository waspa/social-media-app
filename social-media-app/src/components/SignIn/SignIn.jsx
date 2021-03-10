import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="text-center centered signin">
      <main className="form-signin">
        <form>
          <img
            className="mb-4"
            src="https://via.placeholder.com/72x57.png?text=REA"
            alt="logo"
          />
          <h1 className="h3 mb-3">Sign in</h1>

          <input
            type="username"
            required
            className="form-control"
            placeholder="Username"
          />
          <input
            type="password"
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
        <Link to="/registeraccount">Create a new account here </Link>
        {/* <Link to="/forgotpassword">Forgot your password?</Link> */}
        <div>
          <em>Forgot your password?</em>
        </div>
      </nav>
    </div>
  );
}

export default SignIn;
