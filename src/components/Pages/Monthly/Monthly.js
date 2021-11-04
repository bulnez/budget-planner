import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Classes from "../Monthly/Monthly.css";
import AddExpense from "../Add Expense/Add";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Item from "../../UI/Table/Items";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Monthly = () => {
  const [expenses, setExpenses] = useState([]);
  const [money, setMoney] = useState({ income: 0, budget: 0 });
  let token = JSON.parse(localStorage.userDetails).token;
  let url = window.location.href;
  const month = url.split("/").pop();

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

  Object.keys(money).forEach((e) => {
    money[e] = parseInt(money[e]);
  });

  const errorNotification = (errorMsg) =>
    NotificationManager.error(errorMsg, "Oh, no", 1000, () => {
      alert("callback");
    });

  const successNotification = (successMsg) =>
    NotificationManager.success(successMsg, "Good job!", 1000, () => {
      alert("callback");
    });

  //Posting balance and budget
  const postData = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/plan/2017/${month}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(money),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          successNotification(responseData.message);
        } else {
          errorNotification(responseData.message);
        }
      });
  };

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
  };

  return (
    <div>
      <Navigation></Navigation>
      <h1>Monthly balance</h1>
      <div className="body-monthly">
        <div className="planner">
          <h1>Planner</h1>
          <form onSubmit={postData} className="planner-form">
            <label>Income</label>
            <input
              type="number"
              onChange={(e) => setMoney({ ...money, income: e.target.value })}
              value={money.income}
            />
            <label>Budget:</label>
            <input
              type="number"
              onChange={(e) => setMoney({ ...money, budget: e.target.value })}
              value={money.budget}
            />
            <button type="submit">Save</button>
          </form>
        </div>
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
