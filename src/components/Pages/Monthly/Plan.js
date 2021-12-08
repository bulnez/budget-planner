import React, { useState } from "react";
import { errorNotification, successNotification } from "../../Common/Common";
import styles from "../../Styles/Plan.module.css";
import Button from "../../UI/Button";

const Plan = ({ month, disabled, data, setData, balance }) => {
  const [edit, setEdit] = useState(false);
  const token = JSON.parse(localStorage.userDetails).token;

  //Setting the new income and budget data
  const postData = () => {
    const newData = { budget: data.budget, income: data.income };

    Object.keys(newData).forEach((e) => {
      newData[e] = parseInt(newData[e]);
    });
    fetch(`http://localhost:5000/plan/2021/${month}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(newData),
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
          onChange={(e) => setData({ ...data, income: e.target.value })}
          value={data.income}
          disabled={edit ? false : true}
          className={edit ? styles.activeInput : styles.inactiveInput}
        />
        <label>Budget:</label>
        <input
          type="number"
          onChange={(e) => setData({ ...data, budget: e.target.value })}
          value={data.budget}
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
                  if (data.budget > data.income) {
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
              disabled={disabled ? "disabled" : ""}
              onClick={() => (disabled ? "" : setEdit(true))}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Plan;
