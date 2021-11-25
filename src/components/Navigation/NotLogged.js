import React from "react";
import styles from "../Styles/Navigation.module.css";
import { Link } from "react-router-dom";

const NotLogged = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.menu}>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <Link to="/registration" className={styles.link}>
          Registration
        </Link>
      </div>
    </div>
  );
};

export default NotLogged;
