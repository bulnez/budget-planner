import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import styles from "../Styles/Savings.module.css";
import CountUp from "react-countup";

const Savings = () => {
  const token = JSON.parse(localStorage.userDetails).token;
  const thisMonth = new Date().getMonth() + 1;
  let yearlySaved = 0;
  let yearlyIncome = 0;

  const [month, setMonth] = useState(thisMonth);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [monthlySavingsPercent, setMonthlySavingsPercent] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(yearlySaved);
  const [yearlySavingsPercent, setYearlySavingsPercent] = useState(0);

  //Monthly Savings
  useEffect(() => {
    fetch(`http://localhost:5000/plan/2021/${month}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setMonthlySavings(responseData.income - responseData.budget);
        setMonthlySavingsPercent(
          Math.round((monthlySavings / responseData.income) * 100) + "%"
        );
      });
  }, [month, monthlySavings]);

  //Yearly Savings
  useEffect(() => {
    for (let i = 1; i <= 12; i++) {
      fetch(`http://localhost:5000/plan/2021/${i}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          let savings = responseData.income - responseData.budget;
          yearlyIncome += responseData.income;
          yearlySaved += savings;
          setYearlySavingsPercent(
            Math.round((yearlySaved / yearlyIncome) * 100) + "%"
          );
          setYearlySavings(yearlySaved);
        });
    }
  }, []);

  return (
    <div className={styles.savingsContainer}>
      <h1>Savings</h1>
      <div className={styles.boxesContainer}>
        <div className={styles.innerBoxes}>
          <div className={styles.bigBox}>
            <p>This month you saved:</p>
            <h1>
              <CountUp end={monthlySavings} duration={1.5} />
            </h1>
          </div>
          <div className={styles.smallBox}>
            <p>Or {monthlySavingsPercent} of your monthly income</p>
          </div>
        </div>
        <div className={styles.innerBoxes}>
          <div className={styles.bigBox}>
            <p>In 2021 you saved:</p>
            <h1>
              <CountUp end={yearlySavings} duration={1.5} />
            </h1>
          </div>
          <div className={styles.smallBox}>
            <p>Or {yearlySavingsPercent} of your yearly income</p>
          </div>
          <p className={styles.joke}>
            and enough to buy {yearlySavings / 5} duners
          </p>
        </div>
      </div>
    </div>
  );
};

export default Savings;
