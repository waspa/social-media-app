import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Here i want to import seed file


const config = {
    apiKey: "AIzaSyDSrMDZ0RRwKzCHDFirE4ZIvzaQte3QXS8",
    authDomain: "auth-development-9a7de.firebaseapp.com",
    projectId: "auth-development-9a7de",
    storageBucket: "auth-development-9a7de.appspot.com",
    messagingSenderId: "522012302449",
    appId: "1:522012302449:web:4c09c5880ee262a0f68fd0"
}

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore;




// Here is where I want to call the seed file (only once)



export {firebase, FieldValue}