import styles from "../Styles/PopupLogout.module.css";
import { useHistory } from "react-router-dom";

const Popup = ({ message, setPopup, popup }) => {
  const history = useHistory();

  return (
    <div className={`${styles.container} ${popup ? styles.active : ""}`}>
      <h2>{message}</h2>
      <div className={styles.buttons}>
        <button
          className={styles.btnYes}
          onClick={() => {
            localStorage.removeItem("userDetails");
            history.push("/login");
            window.location.reload(false);
          }}
        >
          Yes
        </button>
        <button className={styles.btnNo} onClick={() => setPopup(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default Popup;
