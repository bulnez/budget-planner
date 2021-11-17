import React, { useState } from "react";
import Navigation from "../../Navigation/Navigation";
import { useHistory } from "react-router-dom";
import { errorNotification, successNotification } from "../../Common/Common";
import styles from "../../Styles/Login.module.css";

const Login = () => {
  const history = useHistory();
  const [details, setDetails] = useState({ email: "", password: "" });

  const saveToken = (tokenDetails) => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        token: tokenDetails.token,
        user: tokenDetails.user.name,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          saveToken(responseData);
          successNotification(responseData.message);
          setTimeout(() => {
            history.push("/dashboard");
          }, 2100);
        } else {
          errorNotification(responseData.message);
        }
      });
  };

  return (
    <div>
      <Navigation />
      <div className={styles.mainContainer}>
        <h1>Login</h1>
        <div className={styles.loginContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label for="email">E-mail</label>
            <input
              id="email"
              type="text"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />{" "}
            <br />
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
