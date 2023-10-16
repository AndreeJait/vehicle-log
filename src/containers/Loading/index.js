import React from "react";
import styles from "./index.module.css"
import LoadingIcon from "../../assets/icon/loading.gif";

export default function Loading() {
    return (<div className={`${styles.loadingWrap}`}>
        <div className={styles.loadingWrapImage}>
            <img src={LoadingIcon} alt={"ICON"}/>
        </div>
    </div>);
}