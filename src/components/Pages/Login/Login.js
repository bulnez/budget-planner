import React, { useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Login/Login.css";
import { useHistory } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Login = () => {
  let history = useHistory();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const errorNotification = (errorMsg) =>
    NotificationManager.error(errorMsg, "Click to hide", 2000, () => {
      alert("callback");
    });

  const successNotification = (successMsg) =>
    NotificationManager.success(successMsg, "Click to hide", 2000, () => {
      alert("callback");
    });

  const saveToken = (tokenDetails) => {
    localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postRequest = details;

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postRequest),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          saveToken(responseData);
          successNotification(responseData.message);
          setTimeout(() => {
            history.push("/");
          }, 2100);
        } else {
          errorNotification(responseData.message);
        }
      });
  };

  return (
    <div>
      <Navigation></Navigation>
      <div className="main-container">
        <h1>Login</h1>
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
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
      <NotificationContainer></NotificationContainer>
    </div>
  );
};

export default Login;
