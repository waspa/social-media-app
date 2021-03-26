import React, { useEffect } from "react";
import Logo from '../components/Logo'

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found! - Social App";
  }, []);

  return (
    <>
    <Logo />
    <div className="">
      <div className="d-grid">
        <h1 className="text-center">404</h1>
        <p className="text-center">The page you have requested was not found</p>
      </div>
    </div>
    </>
  );
}
