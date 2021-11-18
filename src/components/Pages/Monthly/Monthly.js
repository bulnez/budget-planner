import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../../Styles/Monthly.module.css";
import Navigation from "../../Navigation/Navigation";
import Plan from "./Plan";
import Item from "../../UI/Table/Items";
import { monthsOfYear } from "../../Common/Common";
import { errorNotification, successNotification } from "../../Common/Common";

const Monthly = () => {
  const history = useHistory();
  const [sort, setSort] = useState(false);
  const [data, setData] = useState({ budget: 0, balance: 0, expenses: [] });
  const token = JSON.parse(localStorage.userDetails).token;
  const url = window.location.href;
  const month = url.split("/").pop();
  const currentMonth = monthsOfYear[month - 1];

  //Pick a month
  const selectMonth = (value) => {
    history.push(`/monthly/${value}`);
    window.location.reload(false);
  };

  //Set total
  const total = useMemo(() => {
    if (data.expenses.length > 0) {
      const totalExpenses = data.expenses.reduce((acc, expense) => {
        return acc + expense.amount;
      }, 0);
      return totalExpenses;
    } else {
      return 0;
    }
  }, [data]);

  //Set balance
  const balance = useMemo(() => {
    return data.budget - total;
  }, [data]);

  //Delete item
  const deleteItem = (id) => {
    const dialogBox = window.confirm("Do you want to delete your expense?");
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
            data.expenses.filter(() => {
              const arr = data.expenses.filter(
                (expense) => expense.id !== responseData.expense
              );
              setData({ ...data, expenses: arr });
            });
          } else {
            errorNotification(responseData.message);
          }
        });
    }
  };

  //Sort by amount
  const sortExpenses = () => {
    const sortedExpenses = [...data.expenses].sort((a, b) => {
      if (sort) {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setData({ ...data, expenses: sortedExpenses });
    setSort(!sort);
  };

  const num = 5;

  return (
    <div className={styles.monthlyBody}>
      <h1 className={styles.heading}>Monthly balance</h1>
      <div className={styles.innerBody}>
        <Plan setData={setData} nomer={balance} />
        <div className={styles.expensesCard}>
          <h1> {currentMonth} 2021</h1>
          <select
            className={styles.selectMonth}
            defaultValue={month}
            onChange={(e) => selectMonth(e.target.value)}
          >
            {monthsOfYear.map((el, i) => (
              <option value={i + 1}>{el}</option>
            ))}
          </select>
          <div className={styles.row}>
            <h2>Expenses</h2>
            <Link
              className={styles.addExpense}
              to={{
                pathname: `/addexpense/${month}`,
              }}
            >
              Add expense
            </Link>
          </div>
          <table className={styles.tableExpenses}>
            <thead>
              <th>Name</th>
              <th>Payment date</th>
              <th>Category</th>
              <th className={styles.thFilter} onClick={sortExpenses}>
                Cost
                {sort ? <p>▲</p> : <p>▼</p>}
              </th>
              <th></th>
            </thead>
            <tbody className={styles.expensesBody}>
              {data.expenses.map((el) => (
                <Item
                  name={el.name}
                  category={el.category}
                  amount={el.amount}
                  date={el.date + "." + month + ".2021"}
                  delete={(e) => {
                    e.preventDefault();
                    deleteItem(el.id);
                  }}
                />
              ))}
              <th></th>
              <th></th>
              <th>Total spent:</th>
              <th>{total}</th>
              <th></th>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Monthly;
