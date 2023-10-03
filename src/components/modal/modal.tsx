import React, {useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

type Props = { onClose: () => void; title: string; children: React.ReactNode; isModalActive: boolean };

export default function Modal(props: Props) {
  const {onClose, title, children, isModalActive} = props;

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClose();
  }

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const {target} = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  return (
      (isModalActive && modalRoot ?
          createPortal(<>
            <ModalOverlay ref={rootRef}>
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
