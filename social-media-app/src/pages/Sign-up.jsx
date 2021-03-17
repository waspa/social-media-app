import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import  {useAuth} from "../context/AuthContext";
import FirebaseContext from '../context/Firebase'
import "./Login.css";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import { Card, Button, Form, Alert } from "react-bootstrap";
import Logo from "../components/Logo";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const {signup} = useAuth()
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
        const createdUserResult = await signup(email, password);

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
        setPasswordConfirm("")
        setError(error.message);
      }
    } else {
      setError("That username is already taken.");
      setUserName("");
      setPassword("");
      setPasswordConfirm("")
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

