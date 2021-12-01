import React from "react";
import styles from "../../Styles/Card.module.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <h1>{props.month}</h1>
      <h3>{props.year}</h3>
      <label>Income:</label>
      <input name="income" placeholder={props.income} disabled></input>
      <label>Budget:</label>
      <input name="expenses" placeholder={props.budget} disabled></input>
      <label>Balance:</label>
      <input name="balance" placeholder={props.balance} disabled></input>

      <Link
        to={{
          pathname: `/2021/monthly/${props.id}`,
        }}
        className={styles.linkBtn}
      >
        Details
      </Link>
    </div>
  );
};

export default Card;
