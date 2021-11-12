import React from "react";
import styles from "../Styles/Navigation.module.css";

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
      <div className={styles.navigation}>
        <div className={styles.menu}>
          {"userDetails" in localStorage ? (
            ""
          ) : (
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          )}
          {"userDetails" in localStorage ? (
            ""
          ) : (
            <Link to="/registration" className={styles.link}>
              Registration
            </Link>
          )}
          {"userDetails" in localStorage ? (
            <Link to={`/dashboard`} className={styles.link}>
              Dashboard
            </Link>
          ) : (
            ""
          )}
          {"userDetails" in localStorage ? (
            <Link to={`/monthly/${month + 1}`} className={styles.link}>
              Monthly Balance
            </Link>
          ) : (
            ""
          )}
          {"userDetails" in localStorage ? (
            <Link to="/yearly" className={styles.link}>
              Yearly Balance
            </Link>
          ) : (
            ""
          )}
          {"userDetails" in localStorage ? (
            <Link to="/savings" className={styles.link}>
              Savings
            </Link>
          ) : (
            ""
          )}
        </div>
        {"userDetails" in localStorage ? (
          <button onClick={logout} className={styles.logout}>
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
