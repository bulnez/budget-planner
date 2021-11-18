import React, { useState } from "react";
import Navigation from "../../Navigation/Navigation";
import { useHistory } from "react-router-dom";
import { errorNotification, successNotification } from "../../Common/Common";
import styles from "../../Styles/Register.module.css";

const Registration = () => {
  const history = useHistory();
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
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
    <div className={styles.mainContainer}>
      <h1>Registration</h1>
      <div className={styles.regContainer}>
        <form className={styles.regForm} onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />{" "}
          <label>E-mail</label>
          <input
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />{" "}
          <label>Password</label>
          <input
            type="password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />{" "}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
