import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from "../../Styles/Picker.module.css";
import { monthsOfYear, currentMonth } from "../../Common/Common";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Picker = ({ month, setOpen, open }) => {
  const monthName = monthsOfYear[month - 1];

  return (
    <div className={styles.picker}>
      <div className={styles.heading}>
        <h1 className={styles.monthName}>{monthName}</h1>
        <p onClick={() => setOpen(!open)}>&#9660;</p>
      </div>
      <div className={`${styles.table} ${open ? styles.active : ""}`}>
        {monthsOfYear.map((m, i) => (
          <Link
            className={`${styles.month} ${
              i === month - 1 ? styles.activeMonth : ""
            }`}
            to={`/monthly/${i + 1}`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {m}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Picker;
