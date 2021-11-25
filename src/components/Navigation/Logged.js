import React, { useState } from "react";
import PopupLogout from "../Navigation/PopupLogout";
import styles from "../Styles/Navigation.module.css";
import { Link } from "react-router-dom";

const Logged = () => {
  const [popup, setPopup] = useState(false);
  const date = new Date();
  const month = date.getMonth();
  const username = JSON.parse(localStorage.userDetails).user;

  return (
    <div>
      <div className={styles.navigation}>
        <div className={styles.menu}>
          <Link to={`/dashboard`} className={styles.link}>
            Dashboard
          </Link>
          <Link to={`/monthly/${month + 1}`} className={styles.link}>
            Monthly Balance
          </Link>
          <Link to="/yearly" className={styles.link}>
            Yearly Balance
          </Link>
          <Link to="/savings" className={styles.link}>
            Savings
          </Link>
        </div>
        <div className={styles.leftSide}>
          <p>Hello, {username}</p>
          <button
            onClick={() => {
              setPopup(true);
            }}
            className={styles.logout}
          >
            Logout
          </button>
        </div>
      </div>
      <PopupLogout
        message={"Are you sure you want to logout?"}
        popup={popup}
        setPopup={setPopup}
      />
    </div>
  );
};

export default Logged;
