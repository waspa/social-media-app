import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Alert, Form, Button } from "react-bootstrap";
import FirebaseContext from "../context/Firebase";
import "./Login.css";
import Logo from "../components/Logo";
import * as ROUTES from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError("Failed to Log in. Check password and email ");
    }
  };

  useEffect(() => {
    document.title = "Log In - Social App";
  }, []);

  return (
    <>
      <Logo />
      <Card>
        <Card.Body>
          <h2 className="text-center  mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                placeholder="Email Adress"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Button
              disabled={isInvalid}
              className="w-100 btn-info"
              type="submit"
            >
              Log In
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to={ROUTES.RESET_PASSWORD}>Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Create account</Link>
      </div>
    </>
  );
}
