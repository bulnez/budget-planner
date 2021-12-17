import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import Button from "../../UI/UIs/Button";
import Popup from "../../UI/UIs/Popup";
import { PopupPortal } from "../../Common/Common";
import styles from "../../Styles/Monthly.module.css";
import Plan from "./Plan";
import Item from "../../UI/Table/Items";
import { errorNotification, successNotification } from "../../Common/Common";
import Picker from "../../UI/Picker/Picker";
import AddExpensePopup from "../../UI/UIs/AddExpensePopup";
import { MdAddCircle } from "react-icons/md";

const Monthly = () => {
  const token = JSON.parse(localStorage.userDetails).token;

  const { month } = useParams();
  const { currYear } = useParams();
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({
    budget: 0,
    income: 0,
    expenses: [],
  });
  const [sort, setSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [popup, setPopup] = useState({ open: false, id: "" });

  //Get the current data
  useEffect(() => {
    if (parseInt(currYear) === 2021) {
      fetch(`http://localhost:5000/plan/2021/${month}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData({
            budget: responseData.budget,
            income: responseData.income,
            expenses: responseData.expenses,
          });
        });
    }
  }, [token, month, currYear, update]);

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
  }, [data.budget, data.expenses]);

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
    <div className={add || popup.open ? styles.blurred : ""}>
      <h1 className={styles.heading}>Monthly balance</h1>
      <div className={styles.innerBody}>
        <Plan
          balance={balance}
          month={parseInt(month)}
          disabled={false}
          data={data}
          setData={setData}
        />
        <div className={styles.expensesCard}>
          <Picker month={month} setOpen={setOpen} open={open} year={currYear} />
          <div className={`${styles.row} ${open ? styles.blur : ""}`}>
            <h2>Expenses</h2>

            <Button
              buttonSize="medium"
              buttonStyle={data.budget === 0 ? "inactive" : "primary"}
              text={
                <div className={styles.addBtn}>
                  <MdAddCircle className={styles.icon} />
                  Add expense
                </div>
              }
              onClick={() => {
                if (data.budget === 0) {
                  return errorNotification(
                    "You have to add income and budget first"
                  );
                } else {
                  setAdd(true);
                }
              }}
            />
          </div>
          {data.expenses.length > 0 ? (
            <div
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
                    date={el.date + "." + month + ".2021"}
                    id={el.id}
                    setPopup={() => setPopup({ open: true, id: el.id })}
                  />
                ))}
                <th></th>
                <th></th>
                <th>Total spent:</th>
                <th>{total}</th>
                <th></th>
              </tbody>
            </div>
          ) : (
            <p className={styles.empty}>You still don't have any expenses</p>
          )}
        </div>
      </div>
      <PopupPortal
        component={
          <Popup
            message={"Are you sure you want to delete this expense?"}
            popup={popup}
            setPopup={setPopup}
            deleteItem={deleteItem}
          />
        }
      />
      <PopupPortal
        component={
          <AddExpensePopup
            setUpdate={setUpdate}
            update={update}
            add={add}
            setAdd={setAdd}
          />
        }
      />
    </div>
  );
};

export default Monthly;
