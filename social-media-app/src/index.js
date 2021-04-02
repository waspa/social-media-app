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

