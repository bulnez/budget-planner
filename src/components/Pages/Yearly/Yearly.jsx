import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import Card from "../../UI/Card/Card";
import Classes from "../Yearly/Yearly.css";

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Yearly = () => {
  const [months, setMonths] = useState([]);

  let token = JSON.parse(localStorage.userDetails).token;

  useEffect(() => {
    fetch("http://localhost:5000/plan/2017", {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const keys = Object.values(responseData);
        const newKeys = keys.map((el, i) => ({
          ...el,
          expenses: el.budget - el.balance,
          month: monthsOfYear[i],
          year: 2017,
          id: i + 1,
        }));
        console.log(newKeys);
        setMonths(newKeys);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <h1>Yearly Balance</h1>
      <div className="yearly">
        {months.map((el) => (
          <Card
            month={el.month}
            year={el.year}
            budget={el.budget}
            balance={el.balance}
            id={el.id}
            expenses={el.expenses}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Yearly;
