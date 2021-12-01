import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import styles from "../../Styles/Yearly.module.css";
import { monthsOfYear } from "../../Common/Common";

const func = async (token) => {
  let incomes = [];
  for (let i = 1; i <= 12; i++) {
    const result = await fetch(`http://localhost:5000/plan/2021/${i}`, {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
    });
    const data = await result.json();
    incomes.push(data.income);
  }

  const result = await fetch("http://localhost:5000/plan/2021", {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  });
  const data = await result.json();
  const keys = Object.values(data);
  const newKeys = keys.map((el, i) => ({
    ...el,
    budget: el.budget,
    balance: el.balance,
    income: incomes[i],
    expenses: el.budget - el.balance,
    month: monthsOfYear[i],
    id: i + 1,
  }));
  return newKeys;
};

const Yearly = () => {
  const token = JSON.parse(localStorage.userDetails).token;
  const [months, setMonths] = useState([
    { expenses: 0, income: 0, month: "", year: 2021, id: 0 },
  ]);
  const [year, setYear] = useState(2021);

  useEffect(() => {
    func(token).then((data) => setMonths(data));
  }, [token]);

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
              income={el.income}
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
