import React, {useEffect, useRef} from "react";
import styles from "./modal-overlay.module.css"

type Props = { onClose: () => void; children: React.ReactNode;};

export default function ModalOverlay(props: Props) {
    const {onClose, children} = props;
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWrapperClick = (event: MouseEvent) => {
            const { target } = event;

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
    return <div className={styles.modalOverlay} ref={rootRef}>
        {children}
    </div>
}