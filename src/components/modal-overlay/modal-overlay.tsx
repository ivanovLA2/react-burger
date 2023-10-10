import React, {ForwardedRef} from "react";
import styles from "./modal-overlay.module.css"

type Props = { children: React.ReactNode; };

export const ModalOverlay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const {children} = props;

  return (<div className={styles.modalOverlay} ref={ref}>
    {children}
  </div>)
})
