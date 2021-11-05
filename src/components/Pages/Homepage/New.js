import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Homepage/New.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const New = () => {
  return (
    <div className="container-new">
      <h1>Welcome to the budget planner</h1>
      <h3>Create your account or login if you already have an existing one</h3>
      <div className="buttons">
        <Link
          className="link-button"
          to={{
            pathname: `/login`,
          }}
        >
          Login
        </Link>
        <Link
          className="link-button"
          to={{
            pathname: `/registration`,
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default New;
