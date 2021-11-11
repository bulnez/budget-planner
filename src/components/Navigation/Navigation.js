import React from "react";
import classes from "../Navigation/Navigation.css";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = () => {
  let history = useHistory();

  const logout = () => {
    const dialogBox = window.confirm("Are you sure you want to logout?");
    if (dialogBox == true) {
      localStorage.removeItem("userDetails");
      history.push("/");
    } else {
      return false;
    }
  };

  const d = new Date();
  let month = d.getMonth();

  return (
    <div>
      <div className="navigation">
        <div className="menu">
          {"userDetails" in localStorage ? (
            ""
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
          {"userDetails" in localStorage ? (
            ""
          ) : (
            <Link to="/registration" className="link">
              Registration
            </Link>
          )}
          {"userDetails" in localStorage ? (
            <Link to={`/dashboard`} className="link">
              Dashboard
            </Link>
          ) : (
            ""
          )}
          {"userDetails" in localStorage ? (
            <Link to={`/monthly/${month + 1}`} className="link">
              Monthly Balance
            </Link>
          ) : (
            ""
          )}
          {"userDetails" in localStorage ? (
            <Link to="/yearly" className="link">
              Yearly Balance
            </Link>
          ) : (
            ""
          )}
        </div>
        {"userDetails" in localStorage ? (
          <button onClick={logout} className="logout">
            {" "}
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navigation;
