import React from "react";
import styles from "../../Styles/Items.module.css";

const Item = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.amount}</td>
      <td>{props.category}</td>
      <td>{props.date}</td>
      <td>
        <button className={styles.buttonDelete} onClick={props.delete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Item;
