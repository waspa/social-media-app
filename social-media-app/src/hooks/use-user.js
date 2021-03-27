import {useState, useEffect, useContext} from 'react'
import userContext from '../context/User'
import {getUserByUserId} from '../services/firebase'

export default function useUser() {

    const [activeUser, setActiveUser] = useState({})
    const {user} = useContext(userContext)

    useEffect(() => {
        async function getUserObjByUserId() {
            //Wee need a function that we can call (firebase service) that gets the suer data based on the id.
            const [response] = await getUserByUserId(user.uid)
            setActiveUser(response)
             
        }
        
    if (user?.uid) {
        getUserObjByUserId()
    }
       
    }, [user])

    return {user: activeUser}
   
}
