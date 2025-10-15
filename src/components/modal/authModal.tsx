import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/images/icons/close.svg";
import * as styles from "./authModal.m.scss";
import modalRoot from "../../elementIds";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  modalTitle?: string;
}

export default function AuthModal(props: ModalProps) {
  const root = document.getElementById(modalRoot.modalRoot);
  if (!root) {
    return null;
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>{props.modalTitle}</h1>
          <button type="button" className={styles.closeButton} onClick={props.onClose}>
            <img className={styles.closeIcon} src={closeIcon} alt="closeIcon" draggable={false} />
          </button>
        </div>
        {props.children}
      </div>
    </section>,
    root,
  );
}
