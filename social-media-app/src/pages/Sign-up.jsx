import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/Firebase";
import "./Login.css";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import { Card, Button, Form, Alert } from "react-bootstrap";
import Logo from "../components/Logo";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    password === "" ||
    email === "" ||
    username === "" ||
    fullName === "" ||
    passwordConfirm === "";

  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // authentication
        // email & password & username (displayName in authentication firebase)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAdress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.LOGIN);
      } catch (error) {
        setFullName("");
        setEmail("");
        setPassword("");
        setUserName("");
        setError(error.message);
      }
    } else {
      setError("That username is already taken.");
      setUserName("");
      setPassword("");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Social App";
  }, []);

  return (
    <>
      <Logo />
      <Card>
        <Card.Body>
          <h2 className="text-center  mb-4">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup} method="POST">
            <Form.Group id="username">
              <Form.Control
                aria-label="Enter your username"
                type="name"
                required
                placeholder="Username"
                
                value={username}
                onChange={({ target }) => setUserName(target.value)}
              />
            </Form.Group>

            <Form.Group id="name">
              <Form.Control
                aria-label="Enter your full name"
                type="name"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
              />
            </Form.Group>

            <Form.Group id="email">
              <Form.Control
                aria-label="Enter your Email Adress"
                type="email"
                placeholder="Email Adress"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Control
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Control
                aria-label="Confirm password"
                type="password"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChange={({ target }) => setPasswordConfirm(target.value)}
                required
              />
            </Form.Group>

            <Button
              disabled={isInvalid}
              className={`w-100 btn-info rounded ${isInvalid}`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={ROUTES.LOGIN}> Log in</Link>
      </div>
    </>
  );
}

/*
          <div className="container flex center mx-auto max-w-screen-md items-center h-screen  ">
      
        <div className="flex flex-col w-2/4">
          <div className="flex flex-col items-center bg-white p-4 border border-gray-500 mb-4 ">
            <h1 className="flex justify-center w-full">
              <img src="/images/Logo.jpg" alt="" className="mt-2 w-6/12 mb-4" />
            </h1>

            {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

            <form onSubmit={handleSignup} method="POST">
              <input
                aria-label="Enter your username"
                type="name"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setUserName(target.value)}
                value={username}
              />

              <input
                aria-label="Enter your full name"
                type="name"
                placeholder="Full Name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
              />

              <input
                aria-label="Enter your Email Adress"
                type="email"
                placeholder="Email adress"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />

              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />

               <input
                aria-label="Confirm password"
                type="password"
                placeholder="Confirm password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
                //onChange={({ target }) => setPasswordConfirm(target.value)}
                //value={confirmPassword}
              /> 

              <button
                disabled={isInvalid}
                type="submit"
                className={`border border-blue-600 bg-blue-600 text-white rounded p-1 w-full ${
                  isInvalid && "opacity-50"
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="flex justify-center items-center flex-col w-full bg-white-500 p-4 border border-gray-600">
            <p className="text-sm">
              Have an account?{""}
              <Link to={ROUTES.LOGIN} className="font-bold ml-1">
                Log In
              </Link>
            </p>{" "}
          </div>
        </div>
      </div> */
