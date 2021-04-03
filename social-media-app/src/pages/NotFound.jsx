import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NotFoundHeader from "../components/NotFoundHeader";
import { Button } from "react-bootstrap";
import * as ROUTES from "../constants/routes";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found! - Social App";
  }, []);

  return (
    <>
      <div className="">
        <NotFoundHeader />
        <div className="d-grid mt-5">
          <h1 className="text-center">404</h1>
          <p className="text-center">
            The page you have requested was not found
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <Button className=" mt-2 ">
            <Link to={ROUTES.LOGIN} className="text-white col">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
