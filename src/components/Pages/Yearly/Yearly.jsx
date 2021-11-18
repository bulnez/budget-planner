import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Card from "../../UI/Card/Card";
import styles from "../../Styles/Yearly.module.css";
import { monthsOfYear } from "../../Common/Common";

const Yearly = () => {
  const token = JSON.parse(localStorage.userDetails).token;
  const [months, setMonths] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/plan/2021", {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((responseData) => {
        const keys = Object.values(responseData);
        const newKeys = keys.map((el, i) => ({
          ...el,
          expenses: el.budget - el.balance,
          month: monthsOfYear[i],
          year: 2021,
          id: i + 1,
        }));
        setMonths(newKeys);
      });
  }, [token]);

  return (
    <div>
      <h1 className={styles.heading}>Yearly Balance</h1>
      <div className={styles.yearlyContainer}>
        {months.map((el) => (
          <Card
            month={el.month}
            year={el.year}
            budget={el.budget}
            balance={el.balance}
            id={el.id}
            expenses={el.expenses}
          />
        ))}
      </div>
    </div>
  );
};

export default Yearly;
