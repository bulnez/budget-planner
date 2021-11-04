import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Add Expense/Add.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router-dom";

const AddExpense = () => {
  let history = useHistory();
  let token = JSON.parse(localStorage.userDetails).token;
  let url = window.location.href;
  const month = url.charAt(url.length - 1);

  const errorNotification = (errorMsg) =>
    NotificationManager.error(errorMsg, "Something went wrong", 2000, () => {
      alert("callback");
    });
  const successNotification = (successMsg) =>
    NotificationManager.success(successMsg, "Good job!", 2000, () => {
      alert("callback");
    });

  const [details, setDetails] = useState({
    date: 0,
    name: "",
    category: "Food and groceries",
    amount: 0,
  });

  const postExpense = (e) => {
    e.preventDefault();

    Object.keys(details).forEach((e) => {
      if (isNaN(details[e]) === false) {
        details[e] = parseInt(details[e]);
      }
    });

    fetch(`http://localhost:5000/plan/2017/${month}/expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          successNotification(responseData.message);
          setTimeout(() => {
            history.push(`/monthly/${month}`);
          }, 2100);
          setDetails({
            date: 0,
            name: "",
            category: "Food and groceries",
            amount: 0,
          });
        } else {
          errorNotification(responseData.message);
        }
      });
  };

  return (
    <div>
      <Navigation></Navigation>
      <div className="container">
        <h1>Add Expenses</h1>
        <div className="add-container">
          <form onSubmit={postExpense} className="add-form">
            <h3>Add a new expense</h3>
            <label>Name:</label>
            <input
              id="name"
              type="text"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
            <br />
            <label>Category:</label>
            <select
              onChange={(e) =>
                setDetails({ ...details, category: e.target.value })
              }
              value={details.category}
            >
              <option value="Food and groceries" selected>
                Food and groceries
              </option>
              <option value="Apartment">Apartment</option>
              <option value="Car">Car</option>
              <option value="Travelling">Travelling</option>
              <option value="Fashion">Fashion</option>
            </select>
            <br />
            <label type>Cost:</label>
            <input
              id="cost"
              type="number"
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
              value={details.amount}
            />
            <br />
            <label>Payment date:</label>
            <input
              type="number"
              min="01"
              max="31"
              onChange={(e) => setDetails({ ...details, date: e.target.value })}
              value={details.date}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>
  );
};

export default AddExpense;
