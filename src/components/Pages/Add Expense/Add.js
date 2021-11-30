import React, { useState } from "react";
import styles from "../../Styles/Add.module.css";
import { errorNotification, successNotification } from "../../Common/Common";
import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router-dom";

const AddExpense = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.userDetails).token;
  const url = window.location.href;
  const month = url.split("/").pop();
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

    fetch(`http://localhost:5000/plan/2021/${month}/expense`, {
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
            history.push(`/2021/monthly/${month}`);
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
    <div className={styles.container}>
      <h1>Add Expenses</h1>
      <div className={styles.addContainer}>
        <form onSubmit={postExpense} className={styles.addForm}>
          <h3>Add a new expense</h3>
          <label>Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
            className={styles.addForminput}
          />
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
          <label type>Cost:</label>
          <input
            id="cost"
            type="number"
            onChange={(e) => setDetails({ ...details, amount: e.target.value })}
            value={details.amount}
            className={styles.addForminput}
          />
          <label>Payment date:</label>
          <input
            type="number"
            min="01"
            max="31"
            onChange={(e) => setDetails({ ...details, date: e.target.value })}
            value={details.date}
            className={styles.addForminput}
          />
          <div className={styles.btnContainer}>
            <button type="submit">Submit</button>
            <button
              className={styles.cancel}
              onClick={() => {
                history.push(`/2021/monthly/${month}`);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
