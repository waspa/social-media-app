import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css'

import ReactDOM from "react-dom";
import App from "./App";

import FirebaseContext from './context/Firebase';
import {firebase, FieldValue} from './lib/Firebase';



ReactDOM.render(
  
  <FirebaseContext.Provider value={{firebase, FieldValue}}>
  <App />
  </FirebaseContext.Provider>,
 
  document.getElementById("root")
  
  
);

//client side rendered app: react (cra)
  // -> database which is Firebase
  // -> react-loading-skeleton
  // Bootstrap instead of Tailwind CSS

// Folder structure
  // src
    // -> components,
    // -> constants,
    // -> context,
    // -> helpers,
    // -> pages,
    // -> hooks, 
    // -> lib (firebase if going to live here),
    // -> services (firebase functions in here),
    // -> stles (tailwind's folder app/tailwind)