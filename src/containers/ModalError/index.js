import React from "react";
import styles from "./index.module.css";
import WarningIcon from "../../assets/icon/warning.png";
export default function ModalError({onClose,reTry = null,...props}){
    return (
        <div className={styles.bigWrap} onClick={onClose}>
            <div className={`${styles.errModal} shadow-sm p-3 rounded`}>
                <div className={`${styles.exit} fw-bold text-danger`}>X</div>
                <div className={"col-12 text-center fs-4 fw-bold text-warning"}>Something Went Wrong</div>
                <div className={`${styles.warningIcon} text-center mt-3`}>
                    <img src={WarningIcon} alt={"WARNING"}/>
                </div>
                <div className={"col-12 text-center fs-6 text-warning"}>
                    Sorry for the interruption, there was a problem with the server, please try again.
                </div>
                <div className={"col-12 mt-3 d-flex justify-content-center gap-3"}>
                    {reTry &&  <button onClick={reTry} className={"btn btn-secondary"}>Try Again</button>}
                    <button onClick={onClose} className={"btn btn-danger"}>Close</button>
                </div>
            </div>
        </div>
    );
}