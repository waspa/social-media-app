import React, {useRef} from 'react'
import {Card, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    return (
        <>
          <Card className="container">
              <Card.Body>
                  <h2 className="text-center  mb-4">Sign Up</h2>
                  <Form>
                      <Form.Group id="email" className="mb-3">
                        
                        <Form.Control type="email" ref={emailRef} required placeholder="Email"/>
                      </Form.Group>
                      <Form.Group id="password" className="mb-3">
                      
                        <Form.Control type="password" ref={passwordRef} required placeholder="Password" />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                       
                        <Form.Control type="password" ref={passwordConfirmRef} required className="mb-3" placeholder="Confirm password" />
                      </Form.Group>
                      <Link to="/">
                      <Button className="w-100" type="submit">Sign Up</Button>
              </Link>
                      
                  </Form>
              </Card.Body>
          </Card> 
          
        </>
    )
}
