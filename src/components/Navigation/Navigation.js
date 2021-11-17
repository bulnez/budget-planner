import React from "react";
import Logged from "./Logged";
import NotLogged from "./NotLogged";

const Navigation = () => {
  return (
    <div>{"userDetails" in localStorage ? <Logged /> : <NotLogged />}</div>
  );
};

export default Navigation;
