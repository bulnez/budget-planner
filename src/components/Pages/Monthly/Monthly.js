import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Monthly/Monthly.css";
import AddExpense from "../Add Expense/Add";
import Plan from "./Plan";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Item from "../../UI/Table/Items";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Monthly = () => {
  const [expenses, setExpenses] = useState([]);
  let token = JSON.parse(localStorage.userDetails).token;
  let url = window.location.href;
  const month = url.split("/").pop();

  const errorNotification = (errorMsg) =>
    NotificationManager.error(errorMsg, "Oh, no", 1000, () => {
      alert("callback");
    });

  const successNotification = (successMsg) =>
    NotificationManager.success(successMsg, "Good job!", 1000, () => {
      alert("callback");
    });

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = monthsOfYear[month - 1];

  //Getting expenses
  useEffect(() => {
    fetch(`http://localhost:5000/plan/2017/${month}`, {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((responseData) => {
        const allExpenses = responseData.expenses;
        setExpenses(allExpenses);
      })
      .catch((error) => console.log(error.message));
  }, []);

  //Delete item
  const deleteItem = (id) => {
    var dialogBox = window.confirm("Do you want to delete your expense?");
    if (dialogBox == true) {
      fetch(`http://localhost:5000/plan/expense/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            successNotification(responseData.message);
            expenses.filter(() => {
              const arr = expenses.filter(
                (expense) => expense.id !== responseData.expense
              );
              setExpenses(arr);
            });
          } else {
            errorNotification(responseData.message);
          }
        });
    } else {
      return false;
    }
  };

  return (
    <div>
      <Navigation></Navigation>
      <h1>Monthly balance</h1>
      <div className="body-monthly">
        <Plan></Plan>
        <div className="expenses">
          <h1> {currentMonth} 2017</h1>
          <div className="row">
            <h2>Expenses</h2>
            <Link
              className="add-expense"
              to={{
                pathname: `/addexpense/${month}`,
              }}
            >
              Add expense
            </Link>
          </div>
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Payment date</th>
            </thead>
            <tbody>
              {expenses.map((el) => (
                <Item
                  name={el.name}
                  category={el.category}
                  amount={el.amount}
                  date={el.date}
                  delete={(e) => {
                    e.preventDefault();
                    deleteItem(el.id);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>
  );
};

export default Monthly;
