import React, { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import styles from "../../Styles/Dashboard.module.css";
import { monthsOfYear } from "../../Common/Common";
import Button from "../../UI/Button";

const Dashboard = () => {
  const token = JSON.parse(localStorage.userDetails).token;
  const name = JSON.parse(localStorage.userDetails).user;
  const thisMonth = new Date().getMonth() + 1;
  const [details, setDetails] = useState({ budget: 0, income: 0 });
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(thisMonth);
  const currentMonth = monthsOfYear[month - 1];

  //Get the data for the current month
  useEffect(() => {
    fetch(`http://localhost:5000/plan/2021/${month}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setDetails({
          budget: responseData.budget,
          income: responseData.income,
        });
        setExpenses(responseData.expenses);
      });
  }, [month, token]);

  //Total spent:
  const total = useMemo(() => {
    const allExpenses = expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    return allExpenses;
  }, [expenses]);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Welcome back, {name}</h1>
      <div className={styles.header}>
        <h3 className={styles.description}>Here are some stats:</h3>
        <div className={styles.picker}>
          <button
            className={styles.arrowLeft}
            onClick={() => {
              if (month > 1) {
                setMonth(month - 1);
              }
            }}
          >
            &lt;
          </button>
          <p className={styles.paragraph}>{currentMonth}</p>
          <button
            className={styles.arrowRight}
            onClick={() => {
              if (month < thisMonth) {
                setMonth(month + 1);
              }
            }}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.bigCard}>
        <div className={styles.info}>
          <p>Monthly income:</p>
          <h1>
            <CountUp end={details.income} duration={2} />
          </h1>
        </div>
        <div className={styles.info}>
          <p>Monthly budget:</p>
          <h1>
            <CountUp end={details.budget} duration={2} />
          </h1>
        </div>
        <div className={styles.info}>
          <p>You've spent:</p>
          <h1>
            <CountUp end={total} duration={2} />
          </h1>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={`${styles.smallCard} ${styles.saved}`}>
          <p>This month you saved:</p>
          <h1>
            <CountUp end={details.income - details.budget} duration={2} />
          </h1>
        </div>
        <div className={styles.smallCard}>
          <p>You have a total of:</p>
          <h1>{expenses.length}</h1>
          <p>expenses</p>
        </div>
        <div className={`${styles.smallCard} ${styles.spend}`}>
          <p>Left to spend:</p>
          <h1>
            <CountUp end={details.budget - total} duration={2} />
          </h1>
        </div>
      </div>
      <div className={styles.detailsButton}>
        <Link
          to={{
            pathname: `/2021/monthly/${month}`,
          }}
        >
          <Button
            buttonStyle="primary"
            buttonSize="medium"
            text="More details"
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
