import styles from "../../Styles/AddExpensePopup.module.css";
import React, { useState } from "react";
import { errorNotification, successNotification } from "../../Common/Common.js";
import "react-notifications/lib/notifications.css";
import Button from "./Button";

const date = new Date();
const today = date.getDate();
const thisMonth = date.getMonth() + 1;

const AddExpensePopup = ({ update, setUpdate, add, setAdd }) => {
  const token = JSON.parse(localStorage.userDetails).token;
  const url = window.location.href;
  const month = parseInt(url.split("/").pop());
  const [details, setDetails] = useState({
    date: 0,
    name: "",
    category: "Food and groceries",
    amount: 0,
  });

  const postExpense = () => {
    if (details.date > today && thisMonth === month) {
      errorNotification("You can't post future expenses");
      setDetails({
        ...details,
      });
    } else {
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
            setUpdate(!update);
            setDetails({
              date: 0,
              name: "",
              category: "Food and groceries",
              amount: 0,
            });
            setAdd(false);
          } else {
            errorNotification(responseData.message);
            setAdd(false);
          }
        });
    }
  };

  return (
    <div className={`${styles.container} ${add ? styles.opened : ""}`}>
      <div className={styles.addContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postExpense();
          }}
          className={styles.addForm}
        >
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
            <Button
              type="submit"
              buttonSize="medium"
              buttonStyle="primary"
              text="Submit"
            />
            <Button
              buttonSize="medium"
              buttonStyle="warning"
              text="Cancel"
              onClick={() => {
                setAdd(false);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePopup;
