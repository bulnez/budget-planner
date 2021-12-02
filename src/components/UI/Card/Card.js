import React from "react";
import styles from "../../Styles/Card.module.css";
import Button from "../Button";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <h1>{props.month}</h1>
      <label>Income:</label>
      <input name="income" placeholder={props.income} disabled></input>
      <label>Budget:</label>
      <input name="expenses" placeholder={props.budget} disabled></input>
      <label>Balance:</label>
      <input name="balance" placeholder={props.balance} disabled></input>
      <Link
        className={styles.link}
        to={{
          pathname: `/2021/monthly/${props.id}`,
        }}
      >
        <Button buttonStyle="primary" buttonSize="small" text="Details" />
      </Link>
    </div>
  );
};

export default Card;
