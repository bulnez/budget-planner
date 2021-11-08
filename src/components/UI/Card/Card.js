import React from "react";
import Classes from "../Card/Card.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Card = (props) => {
  localStorage.setItem("month", props.id);

  return (
    <div className="card">
      <h1>{props.month}</h1>
      <h3>{props.year}</h3>
      <label>Budget:</label>
      <input name="budget" placeholder={props.budget} disabled></input>
      <label>Balance:</label>
      <input name="balance" placeholder={props.balance} disabled></input>
      <label>Expenses:</label>
      <input name="expenses" placeholder={props.expenses} disabled></input>
      <Link
        to={{
          pathname: `/monthly/${props.id}`,
        }}
        className="link-button"
      >
        Details
      </Link>
    </div>
  );
};

export default Card;
