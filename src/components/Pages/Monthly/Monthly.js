import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import styles from "../../Styles/Monthly.module.css";
import Plan from "./Plan";
import Item from "../../UI/Table/Items";
import { currentYear, currentMonth } from "../../Common/Common";
import { errorNotification, successNotification } from "../../Common/Common";
import Picker from "../../UI/Picker/Picker";

const Monthly = () => {
  const [sort, setSort] = useState(false);
  const [data, setData] = useState({ budget: 0, balance: 0, expenses: [] });
  const [open, setOpen] = useState(false);
  const { month } = useParams();
  const token = JSON.parse(localStorage.userDetails).token;

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

  return (
    <div className={styles.monthlyBody}>
      <h1 className={styles.heading}>Monthly balance</h1>
      <div className={styles.innerBody}>
        <Plan month={month} setData={setData} balance={balance} month={month} />
        <div className={styles.expensesCard}>
          <Picker month={month} setOpen={setOpen} open={open} />
          <div className={`${styles.row} ${open ? styles.blur : ""}`}>
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
          {data.expenses.length > 0 ? (
            <table
              className={`${styles.tableExpenses} ${open ? styles.blur : ""}`}
            >
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
                    date={el.month + "." + month + ".2021"}
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
          ) : (
            <p className={styles.empty}>You still don't have any expenses</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monthly;
