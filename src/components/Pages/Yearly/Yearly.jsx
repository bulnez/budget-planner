import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Card from "../../UI/Card/Card";
import styles from "../../Styles/Yearly.module.css";
import { monthsOfYear } from "../../Common/Common";

const Yearly = () => {
  const token = JSON.parse(localStorage.userDetails).token;
  const [months, setMonths] = useState([]);
  const [year, setYear] = useState(2021);

  useEffect(() => {
    if (year === 2021) {
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
    }
  }, [token, year]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Yearly Balance</h1>
      <div className={styles.year}>
        <button
          className={styles.arrowLeft}
          onClick={() => {
            year <= 2021 ? setYear(year - 1) : setYear(year);
          }}
        >
          &lt;
        </button>
        <p>{year}</p>
        <button
          className={styles.arrowLeft}
          onClick={() => {
            year < 2021 ? setYear(year + 1) : setYear(year);
          }}
        >
          &gt;
        </button>
      </div>
      {year === 2021 ? (
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
      ) : (
        <div className={styles.empty}>
          <p>Sorry, you don't have access to this data.</p>
        </div>
      )}
    </div>
  );
};

export default Yearly;
