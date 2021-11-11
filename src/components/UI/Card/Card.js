import React from "react";
import styles from "../../Styles/Card.module.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Card = (props) => {
  localStorage.setItem("month", props.id);

  return (
    <div className={styles.card}>
      <h1>{props.month}</h1>
      <h3>{props.year}</h3>
      <label>Budget:</label>
      <input name="budget" placeholder={props.budget} disabled></input>
      <label>Expenses:</label>
      <input name="expenses" placeholder={props.expenses} disabled></input>
      <label>Balance:</label>
      <input name="balance" placeholder={props.balance} disabled></input>

      <Link
        to={{
          pathname: `/monthly/${props.id}`,
        }}
        className={styles.linkBtn}
      >
        Details
      </Link>
    </div>
  );
};

export default Card;
