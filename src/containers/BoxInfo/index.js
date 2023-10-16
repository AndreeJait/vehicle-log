import React from "react";
import styles from "./index.module.css"
import {useQuery} from "@apollo/client";
import {GET_REPORT_LOGGED} from "../../gql";
export default function BoxInfo ({name, quantity,value,...props}){
    return(
        <div className={`${styles.boxInfo} bg-secondary shadow-sm text-white p-2 d-flex flex-column justify-content-center`}>
            <div className={"text-center fs-6"}>
                {name}
            </div>
            <div className={"text-center fs-4"}>
                {value} / {quantity}
            </div>
        </div>
    )
}
