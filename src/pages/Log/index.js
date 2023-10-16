import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./index.module.css"
import BoxReport from "../../containers/BoxReport";
import FormLog from "../../containers/FormLog";
import TableHistory from "../../containers/TableHistory";
import DetailLogOut from "../../containers/DetailLogOut";

export default function Log({...props}) {
    const {townCode, types} = useParams()
    const [resultLogOut, setResultLogOut] = useState(null);
    let typesAfter = types.replace("c", "C").split("in")[0] + " In";
    if (types === "checkout") {
        typesAfter = types.replace("c", "C").split("out")[0] + " Out"
    }
    let interval = useRef(null);


    useEffect(() => {
        if (resultLogOut !== null) {
            interval.current = setInterval(() => {
                setResultLogOut(null);
            }, 6000);
        }
        return () => {
            if(interval.current !== null){
                clearInterval(interval.current);
            }
        }
    }, [resultLogOut]);
    return (
        <>
            <div className={`${styles.wrapLog}`}>

                <div className={"text-center mb-5 pt-5"}>
                    <h2 className={"fs-2"}>{typesAfter.toLocaleUpperCase()}</h2>
                </div>
                <div className={"col-12 px-4"}>
                    <div
                        className={"d-flex flex-md-row flex-sm-column-reverse align-content-center justify-content-center"}>
                        <div className={"col-lg-8 col-md-7 col-12 p-3"}>
                            <BoxReport townCode={townCode}/>
                            <div className={`${styles.wrapTable} mt-5 `}>
                                <TableHistory townCode={townCode}
                                              headers={["#", "Plate Number", "Date In", "Date Out", "Status"]}/>
                            </div>
                        </div>
                        <div className={"col-lg-4 col-md-5"}>
                            <FormLog setResult={setResultLogOut} townCode={townCode} types={types}
                                     typesTitle={typesAfter}/>
                            {resultLogOut !== null && <div className={"col-12 mt-5"}>
                                <DetailLogOut data={resultLogOut}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}