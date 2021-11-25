import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";
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
  NotificationManager.error(errorMsg, "Something went wrong", 1000, () => {
    alert("callback");
  });

export const alertMsg = () => {
  confirmAlert({
    title: "Confirm to submit",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => true,
      },
      {
        label: "No",
        onClick: () => false,
      },
    ],
  });
};

export const successNotification = (successMsg) =>
  NotificationManager.success(successMsg, "Success!", 1000, () => {
    alert("callback");
  });

export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth();
