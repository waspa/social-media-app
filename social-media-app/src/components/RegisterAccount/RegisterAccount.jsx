import React from "react";
import { Link } from "react-router-dom";
import "./RegisterAccount.css";

function RegisterAccount() {
  return (
      <>
      <div>
          <h1 className="centered2">Super Awesome app</h1>
      </div>
    <div className="container col-4 centered">
      <div className=" ">
        <div className="d-flex justify-content-center">
    
          <h5 className="">Register new account</h5>
        </div>

        <form className="border">
          <form>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="exampleInputUser1"
                aria-describedby="emailHelp"
                placeholder="Username"
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Email adress"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword2"
                placeholder="Confirm Password"
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Agree to policy and stuff
              </label>
            </div>
            <Link to="/">
              <button type="submit" class="btn btn-primary">
                Register
              </button>
            </Link>
          </form>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegisterAccount;
