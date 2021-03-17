import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";


export default function Update() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  /* const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef(); */
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false);
  const history = useHistory();

  const isInvalid = password === "" || email === "" || passwordConfirm === "";

  //function handleSubmit(e) {
    const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    const promises = [];
    //setLoading(true);
    setError("");
    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        //setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center  mb-4">Update Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
            
              <Form.Control
                type="email"
                placeholder="Email Adress"
                value={email}
                onChange={({target}) => setEmail(target.value)}
                
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
            
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={({target}) => setPassword(target.value)}
               
                
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password}
                onChange={({target}) => setPasswordConfirm(target.value)}
               
               
              />
            </Form.Group>
            <Button disabled={isInvalid} className={`w-100 btn-info rounded ${isInvalid}`} type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to={ROUTES.DASHBOARD}> Cancel</Link>
      </div>
    </>
  );
}
