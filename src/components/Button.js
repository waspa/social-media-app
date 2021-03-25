import React from "react";

const Button = ({ onclick = null, children = null}) => (
 <button onClick = { onClick} >{children}</button>
);


export default Button;