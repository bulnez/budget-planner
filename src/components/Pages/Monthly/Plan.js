import React, { useEffect, useState } from "react";
import { errorNotification, successNotification } from "../../Common/Common";
import styles from "../../Styles/Plan.module.css";
import Button from "../../UI/Button";

const Plan = ({ setData, balance, month, year, disabled }) => {
  const [money, setMoney] = useState({ budget: 0, income: 0 });
  const [edit, setEdit] = useState(false);
  const token = JSON.parse(localStorage.userDetails).token;

  //Getting the current income and budget data
  useEffect(() => {
    if (year === 2021) {
      fetch(`http://localhost:5000/plan/2021/${month}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setMoney({
            budget: responseData.budget,
            income: responseData.income,
          });
          setData({
            budget: responseData.budget,
            income: responseData.income,
            expenses: responseData.expenses,
          });
        });
    }
  }, [edit, token, month]);

  //Setting the new income and budget data
  const postData = () => {
    Object.keys(money).forEach((e) => {
      money[e] = parseInt(money[e]);
    });
    fetch(`http://localhost:5000/plan/2021/${month}`, {
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

  return (
    <div className={`${styles.planBody} ${disabled ? styles.disabled : ""}`}>
      <h1>Planner</h1>
      <form className={styles.planForm}>
        <label>Income</label>
        <input
          type="number"
          onChange={(e) => setMoney({ ...money, income: e.target.value })}
          value={money.income}
          disabled={edit ? false : true}
          className={edit ? styles.activeInput : styles.inactiveInput}
        />
        <label>Budget:</label>
        <input
          type="number"
          onChange={(e) => setMoney({ ...money, budget: e.target.value })}
          value={money.budget}
          disabled={edit ? false : true}
          className={edit ? styles.activeInput : styles.inactiveInput}
        />
        <label>Balance</label>
        <input
          type="number"
          className={styles.inactiveInput}
          value={balance}
          disabled
        />
        <div className={styles.buttons}>
          {edit ? (
            <div className={styles.btns}>
              <Button
                buttonStyle="primary"
                buttonSize="small"
                text="Save"
                onClick={() => {
                  if (money.budget > money.income) {
                    errorNotification(
                      "Your budget can't be higher than your income."
                    );
                    setEdit(true);
                  } else {
                    postData();
                    setEdit(false);
                  }
                }}
              />
              <Button
                buttonStyle="warning"
                buttonSize="small"
                text="Cancel"
                onClick={() => {
                  setEdit(false);
                }}
              />
            </div>
          ) : (
            <Button
              className={styles.editBtn}
              buttonStyle="primary"
              buttonSize="small"
              text="Edit details"
              onClick={() => (disabled ? "" : setEdit(true))}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Plan;
