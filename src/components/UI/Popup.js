import styles from "../Styles/Popup.module.css";

const Popup = ({ popup, setPopup, message, deleteItem }) => {
  return (
    <div className={`${styles.container} ${popup.open ? styles.active : ""}`}>
      <h2>{message}</h2>
      <div className={styles.buttons}>
        <button
          className={styles.btnYes}
          onClick={() => {
            deleteItem(popup.id);
            setPopup({ open: false });
          }}
        >
          Yes
        </button>
        <button
          className={styles.btnNo}
          onClick={() => setPopup({ open: false })}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Popup;
