import React, { useState } from "react";
import Button from "../Button";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "../../Styles/Items.module.css";

const Item = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.date}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td className={styles.btns}>
        <Button
          buttonStyle="warning"
          buttonSize="small"
          onClick={() => props.setPopup()}
          text={<FaRegTrashAlt />}
        />
      </td>
    </tr>
  );
};

export default Item;
