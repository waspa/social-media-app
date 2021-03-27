//Listen if user logs in or log out/ is logged in or out
import {useState, useEffect, useContext} from 'react'
import FirebaseContext from '../context/Firebase';


export default function useAuthListener() {
    //currentUser, setCurrentUser
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            //We have a user and can therefore store the user in localstorage
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }else {
                //Wedon't have an authUser, clear the localstorage
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        return () => listener()
      
    }, [firebase])

    return {user} //currentUser
}

//have to stringufy when saving to localstorage