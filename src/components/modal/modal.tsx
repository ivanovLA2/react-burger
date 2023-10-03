import React from 'react';
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root")!;

type Props = { onClose: () => void; title: string; children: React.ReactNode; isModalActive: boolean };

export default function Modal(props: Props) {
  const {onClose, title, children, isModalActive} = props;

  const handleCloseButtonClick = () => {
    onClose();
  }

  return (
      (isModalActive ?
          createPortal(<>
            <ModalOverlay onClose={onClose}>
              <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
                <div className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
                  <p className="text text_type_main-medium">
                    {title}
                  </p>
                  <button
                      type="button"
                      onClick={handleCloseButtonClick}
                      className={styles.closeModal}
                  >
                    <CloseIcon type="secondary"/>
                  </button>
                </div>
                {children}
              </div>
            </ModalOverlay>
          </>, modalRoot)
          : null)
  );
}
