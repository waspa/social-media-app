import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button, Form} from 'react-bootstrap'
import './RegisterAccount.css'

export default function Sigin() {
    
    
    return (
        <>
          <Card className="container centered2 col-lg-5">
              <Card.Body>
                  <h2 className="text-center mb-4">Log in</h2>
                  <Form>
                      <Form.Group id="email">
                        
                        <Form.Control type="email"  required placeholder="Email adress" className="mb-3"/>
                      </Form.Group>
                      <Form.Group id="password" className="mb-3">
                      
                        <Form.Control type="password"  required placeholder="Password" className="mb-3"/>
                      </Form.Group>
                      <Button className="w-100" type="submit">Sign Up</Button>
                  </Form>
              </Card.Body>
              <div className="w-100 text-center mt-2">
          <Link to="/registeraccount">Already have an account? Log in</Link> 
              
          </div>
          </Card> 
         
        </>
    )
}
