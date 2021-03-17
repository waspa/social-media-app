
import React, {useEffect, useState} from 'react'
import { Card, Button, Alert } from "react-bootstrap";
import {useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes'
import firebase from 'firebase'



export default function Dashboard() {
    const history = useHistory()
    const [error, setError] = useState((''))

    function handleSignout() {
        // [START auth_sign_out]
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          history.push(ROUTES.LOGIN)
        }).catch((error) => {
          // An error happened.
          setError(error)
        });
        // [END auth_sign_out]
      }

    useEffect(() => {
        document.title = 'Dashboard'
      
    }, [])

    return (
        <>
        <Card>
            <Card.Body>
                <h1>Welcome User to the Dashboard</h1> 
                {error && <Alert variant="danger">{error}</Alert>}
            </Card.Body>
            <Button className="btn-info w-100" onClick={handleSignout}>
                Log Out
            </Button>
        </Card>

            
        </>
    )
}
