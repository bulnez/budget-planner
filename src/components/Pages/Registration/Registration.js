import React, { useState } from "react";
import Navigation from "../../Navigation/Navigation";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory } from "react-router-dom";
import styles from "../../Styles/Register.module.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const errorNotification = (errorMsg) =>
    NotificationManager.error(errorMsg, "Click to hide", 3000, () => {
      alert("callback");
    });

  const successNotification = (successMsg) =>
    NotificationManager.success(successMsg, "Click to hide", 3000, () => {
      alert("callback");
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const postRequest = { name, email, password };

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postRequest),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          successNotification(responseData.message);
          setTimeout(() => {
            history.push("/login");
          }, 3100);
        } else {
          errorNotification(responseData.message);
        }
      });
  };

  return (
    <div>
      <Navigation></Navigation>
      <div className={styles.mainContainer}>
        <h1>Registration</h1>
        <div className={styles.regContainer}>
          <form className={styles.regForm} onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br />
            <label for="new-email">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <label for="new-password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>
  );
};

export default Registration;
