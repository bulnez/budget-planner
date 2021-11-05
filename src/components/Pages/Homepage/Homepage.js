import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Homepage/Homepage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logged from "./Logged";
import New from "./New";

const Homepage = () => {
  return (
    <div>
      <Navigation />
      {"userDetails" in localStorage ? <Logged /> : <New />}
    </div>
  );
};

export default Homepage;
