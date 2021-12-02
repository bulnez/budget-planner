import React from "react";
import styles from "../../Styles/Items.module.css";
import Button from "../Button";

const Item = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.date}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>
        <Button
          buttonStyle="warning"
          buttonSize="small"
          onClick={() => props.setPopup(true)}
          text="Delete"
        />
      </td>
    </tr>
  );
};

export default Item;
