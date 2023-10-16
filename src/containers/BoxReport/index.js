import React, {Fragment, useEffect, useRef, useState} from "react";
import styles from "./index.module.css";
import BoxInfo from "../BoxInfo";
import Loading from "../Loading";
import {useQuery} from "@apollo/client";
import {GET_REPORT_LOGGED} from "../../gql";
import ModalError from "../ModalError";

export default function BoxReport({townCode, ...props}) {
    const [showError, setShowError] = useState(false);
    const {data, loading, error, refetch} = useQuery(GET_REPORT_LOGGED, {
        variables: {
            filter: {
                TownCode: townCode
            }
        },
    });
    let interval = useRef(null);
    useEffect(() => {
        interval.current = setInterval(async () => {
            if (refetch) {
                await refetch();
            }
        }, 3000);

        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        }
    }, []);

    const handleOnClose = ()=>{
        setShowError(false);
    }

    const handleReTry = async ()=>{
        setShowError(false);
        await refetch();
    }


    return (
        <div className={`${styles.wrapBoxReport}`}>
            {loading && <Loading/>}
            {(showError || error) && <ModalError onClose={handleOnClose} reTry={handleReTry}/>}
            <div className={"d-flex justify-content-center flex-row flex-wrap align-items-center gap-5 p-3"}>
                {loading && (<Fragment>
                    <BoxInfo name={"-"} quantity={100} value={100}/>
                    <BoxInfo name={"-"} quantity={100} value={100}/>
                </Fragment>)}
                {!loading && data.ReportLogged.map((item, index) => (
                    <BoxInfo
                        key={index}
                        name={item.VehicleType}
                        quantity={item.Quantity}
                        value={item.TotalLogged}/>
                ))}
            </div>
        </div>
    );
}