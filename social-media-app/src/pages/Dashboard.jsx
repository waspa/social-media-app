
import React, {useEffect, useState} from 'react'
import { Card, Button, Alert } from "react-bootstrap";
import {useHistory, Link } from "react-router-dom";
import * as ROUTES from '../constants/routes'
import {useAuth} from '../context/AuthContext'



export default function Dashboard() {
    const history = useHistory()
    const [error, setError] = useState((''))
    const {currentUser, logout} = useAuth()

    console.log(currentUser)

    async function handleSignout () {
        setError('')
    
        try{
          await logout()
          history.push('/login')
    
        }catch{
          setError('Failed to log out')
        }
      };

    useEffect(() => {
        document.title = 'Home - Social App'
      
    }, [])

    return (
        <>
        <Card>
        <Card.Body>
          <h2 className="text-center  mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <span className="d-block"><strong>Name:</strong> {currentUser.displayName}</span>
          <span className="d-block"><strong>Email:</strong> {currentUser.email}</span>
          <Link
            to={ROUTES.UPDATE_PROFILE}
            className="btn btn-primary w-100 mt-3"
          >Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button  className="btn-info" onClick={handleSignout}>
          Log Out
        </Button>
      </div>

            
        </>
    )
}
