import React from "react";
import Classes from "../Table/Items.css";

const Item = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.amount}</td>
      <td>{props.category}</td>
      <td>{props.date}</td>
      <td>
        <button className="button-delete" onClick={props.delete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Item;
