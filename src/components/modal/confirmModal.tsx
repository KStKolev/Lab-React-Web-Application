import Modal from "./modal";
import * as styles from "./confirmModal.m.scss";

interface ConfirmModalProps {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal
      onClose={props.onCancel}
      modalTitle="Confirm Delete"
      customStyles={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        wrapper: { width: "50%" },
        title: { fontSize: "1.8rem" },
      }}
    >
      <div className={styles.confirmModalContent}>
        <p className={styles.confirmMessage}>Are you sure you want to delete the product {props.productName}?</p>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={props.onConfirm}>
            Yes
          </button>
          <button type="button" className={styles.button} onClick={props.onCancel}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
