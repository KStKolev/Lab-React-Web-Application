import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalStyleConfig } from "@/interfaces/modalStyles";
import closeIcon from "@/assets/images/icons/close.svg";
import modalRoot from "../../elementIds";
import * as styles from "./modal.m.scss";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  modalTitle?: string;
  enableScroll?: boolean;
  customStyles?: ModalStyleConfig;
}

export default function Modal(props: ModalProps) {
  const root = document.getElementById(modalRoot.modalRoot);
  if (!root) {
    return null;
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const overlayStyles: React.CSSProperties = {
    backgroundColor: props.customStyles?.overlay?.backgroundColor,
  };

  const wrapperStyles: React.CSSProperties = {
    width: props.customStyles?.wrapper?.width,
  };

  const modalTitleStyles: React.CSSProperties = {
    fontSize: props.customStyles?.title?.fontSize,
    margin: props.customStyles?.title?.margin,
  };

  return ReactDOM.createPortal(
    <section className={styles.modalOverlay} style={overlayStyles}>
      <div className={`${styles.modalContent} ${props.enableScroll ? styles.scrollable : ""}`} style={wrapperStyles}>
        <div className={styles.modalHeader}>
          <h1 className={`${styles.modalTitle}`} style={modalTitleStyles}>
            {props.modalTitle}
          </h1>
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
