import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root")!;

type Props = { onClose: () => void; title: string; children: React.ReactNode; };

export default function Modal(props: Props) {
    const {onClose, title, children} = props;
    const [isVisible, setVisible] = React.useState(false)

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleClose: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            onClose();
        }, [onClose]);


    return (
        (isVisible
                ? createPortal(<>
                    <ModalOverlay onClose={onClose}>
                        <div className={styles.modal}>
                            <div className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
                                <p className="text text_type_main-medium">
                                    {title}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className={styles.closeModal}
                                >
                                    <CloseIcon type="secondary"/>
                                </button>
                            </div>
                            {children}
                        </div>
                    </ModalOverlay>
                </>, modalRoot)
                : null
        )
    );
}
