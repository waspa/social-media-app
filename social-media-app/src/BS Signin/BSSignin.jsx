import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button, Form} from 'react-bootstrap'

export default function Sigin() {
    
    
    return (
        <>
          <Card className="">
              <Card.Body>
                  <h2 className="text-center mb-4">Log in</h2>
                  <Form>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  required />
                      </Form.Group>
                      <Form.Group id="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  required />
                      </Form.Group>
                      <Button className="w-100" type="submit">Sign Up</Button>
                  </Form>
              </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
          <Link to="/registeraccount">Already have an account? Log in</Link> 
              
          </div>
        </>
    )
}
