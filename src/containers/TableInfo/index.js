import React from "react";
import styles from "./index.module.css";

export default function TableInfo({icon, value, ...props}) {
    return (<div className={styles.tableInfo}>
        {(!icon && icon !== "") ? (<span>{value}</span>) : (<img src={icon} alt="ICON"/>)}
    </div>)
}