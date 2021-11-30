import React, { useEffect, useMemo, useState } from "react";
import styles from "../../Styles/Picker.module.css";
import { monthsOfYear } from "../../Common/Common";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Picker = ({ month, setOpen, open, year }) => {
  const [yr, setYr] = useState(parseInt(year));
  let monthName = monthsOfYear[month - 1];

  return (
    <div className={styles.picker}>
      <div className={styles.heading}>
        <h1 className={styles.monthName}>{monthName}</h1>
        <h1 className={styles.monthName}>{year}</h1>
        <p onClick={() => setOpen(!open)}>&#9660;</p>
      </div>
      <div className={`${styles.container} ${open ? styles.active : ""}`}>
        <div className={styles.table}>
          <div className={styles.year}>
            <button
              className={styles.arrowLeft}
              onClick={() => {
                yr > 2000 ? setYr(yr - 1) : setYr(yr);
              }}
            >
              &lt;
            </button>
            <p>{yr}</p>
            <button
              className={styles.arrowLeft}
              onClick={() => {
                yr < 2021 ? setYr(yr + 1) : setYr(yr);
              }}
            >
              &gt;
            </button>
          </div>
          {monthsOfYear.map((m, i) => (
            <Link
              className={`${styles.month} ${
                i === month - 1 ? styles.activeMonth : ""
              }`}
              to={
                yr === 2021
                  ? `/2021/monthly/${i + 1}`
                  : `/${yr}/no-data/${i + 1}`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              {m}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Picker;
