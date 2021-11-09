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
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

const Th = styled.th`
  :hover {
    cursor: pointer;
  }
`;

const Select = styled.select`
  background-color: grey;
  color: var(--white-color);
  height: 25px;
  width: 150px;
`;

const Monthly = () => {
  let history = useHistory();
  const [balance, setBalance] = useState(0);
  const [sort, setSort] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  let token = JSON.parse(localStorage.userDetails).token;
  let url = window.location.href;
  const month = url.split("/").pop();
  let totalAmount = 0;

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

  const selectMonth = (value) => {
    history.push(`/monthly/${value}`);
    window.location.reload(false);
  };

  //Getting expenses
  useEffect(() => {
    fetch(`http://localhost:5000/plan/2021/${month}`, {
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

  //Set total
  useEffect(() => {
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        totalAmount += expense.amount;
        setTotal(totalAmount);
      });
    } else {
      setTotal(0);
    }
  }, [expenses]);

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

  //Getting the balance
  useEffect(() => {
    fetch(`http://localhost:5000/plan/2021`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setBalance(responseData[month].balance);
      });
  }, [expenses]);

  //Sort by amount
  const sortExpenses = () => {
    const sortedExpenses = [...expenses].sort((a, b) => {
      return a.amount - b.amount;
    });
    setExpenses(sortedExpenses);
    console.log(expenses);
  };

  const sortExpenses2 = () => {
    const sortedExpenses = [...expenses].sort((a, b) => {
      return b.amount - a.amount;
    });
    setExpenses(sortedExpenses);
    console.log(expenses);
  };

  return (
    <div>
      <Navigation></Navigation>
      <h1>Monthly balance</h1>
      <div className="body-monthly">
        <Plan></Plan>
        <div className="expenses">
          <h1> {currentMonth} 2021</h1>
          <Select
            defaultValue={month}
            onChange={(e) => selectMonth(e.target.value)}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
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
              <Th
                onClick={() => {
                  if (sort) {
                    sortExpenses2();
                    setSort(false);
                  } else {
                    sortExpenses();
                    setSort(true);
                  }
                }}
              >
                Cost
              </Th>
              <th>Category</th>
              <th>Payment date</th>
              <th></th>
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
              <th>Total spent:</th>
              <th>{total}</th>
              <th></th>
              <th>Balance:</th>
              <th>{balance}</th>
            </tbody>
          </table>
        </div>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>
  );
};

export default Monthly;
