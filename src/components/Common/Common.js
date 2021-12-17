import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";
import ReactDOM from "react-dom";

import "react-confirm-alert/src/react-confirm-alert.css";

export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthsOfYearShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const errorNotification = (errorMsg) =>
  NotificationManager.error(errorMsg, "Something went wrong", 3000, () => {
    alert("callback");
  });

export const successNotification = (successMsg) =>
  NotificationManager.success(successMsg, "Success!", 3000, () => {
    alert("callback");
  });

export const PopupPortal = ({ component }) =>
  ReactDOM.createPortal(component, document.body);

export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth();
