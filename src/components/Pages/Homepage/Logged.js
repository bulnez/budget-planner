import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Homepage/Logged.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Logged = () => {
  return (
    <div className="container-logged">
      <h1>Welcome to your personal budget planner</h1>
      <h3>Check your...</h3>
      <div className="buttons">
        <Link
          className="link-button"
          to={{
            pathname: `/yearly/2017`,
          }}
        >
          Yearly balance
        </Link>
        <Link
          className="link-button"
          to={{
            pathname: `/monthly/1`,
          }}
        >
          Monthly balance
        </Link>
      </div>
    </div>
  );
};

export default Logged;
