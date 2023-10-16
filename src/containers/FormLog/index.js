import React, {useState} from "react";
import styles from "./index.module.css";
import {useMutation} from "@apollo/client";
import {LOG_IN, LOG_OUT} from "../../gql";
import SelectTypeFilter from "../SelectTypeFilter";
import ModalError from "../ModalError";

export default function FormLog({setResult, townCode, typesTitle, types, ...props}) {
    const [selectedType, setSelectedType] = useState("-");
    const [plateNumber, setPlateNumber] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [showError, setShowError] = useState(false);
    const handleOnChangeSelect = (event) => {
        const {value} = event.currentTarget;
        setSelectedType(value);
    }

    const handleOnChangePlateNumber = (event) => {
        const {value} = event.currentTarget;
        let chartValue = value.split("")
        let currentIndex = 0;
        let newValue = "";
        for (let i = 0; i < chartValue.length; i++) {
            if (i > 0) {
                if (chartValue[i] === " ") {
                    currentIndex += 1;
                }
                if (currentIndex === 0 && isNaN(chartValue[i - 1]) && !isNaN(chartValue[i])) {
                    newValue += " " + chartValue[i];
                    currentIndex += 1;
                    continue;
                }

                if (currentIndex === 1 && !isNaN(chartValue[i - 1]) && isNaN(chartValue[i])) {
                    newValue += " " + chartValue[i];
                    currentIndex += 1;
                    continue;
                }
                if (currentIndex === 2 && isNaN(chartValue[i - 1]) && !isNaN(chartValue[i])) {
                    newValue = plateNumber;
                    break;
                }
            }
            if (currentIndex === 0 && !isNaN(chartValue[i])) {
                newValue = chartValue.slice(0, i).join("")
                break;
            } else {
                newValue += chartValue[i];
            }

        }
        setPlateNumber(newValue.toUpperCase());
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoadingSubmit(true);
        if (types === "checkin") {
            await logInProcess();
        } else if (types === "checkout") {
            await logOutProcess();
        }
    }

    const [logInProcess] = useMutation(LOG_IN, {
        variables: {
            input: {
                "PlatNumber": plateNumber,
                "TownCode": townCode,
                "VehicleType": selectedType
            }
        },
        onError: () => {
            setShowError(true);
        },
        onCompleted: (data) => {
            setLoadingSubmit(false);
            setPlateNumber("");
            setSelectedType("-");
        },
    });

    const [logOutProcess] = useMutation(LOG_OUT, {
        variables: {
            input: {
                "PlatNumber": plateNumber,
                "TownCode": townCode,
                "VehicleType": selectedType
            }
        },
        onError: () => {
            setShowError(true);
        },
        onCompleted: (data) => {
            setLoadingSubmit(false);
            setPlateNumber("");
            setSelectedType("-");
            setResult(data.LogOut);
        },
    });

    const handleOnClose = () => {
        setShowError(false);
    }


    return (<div className={`col-12 shadow-sm rounded ${styles.formLog}`}>
        {showError && <ModalError onClose={handleOnClose}/>}
        <form method="post" onSubmit={handleOnSubmit}>
            <div className={"p-3"}>
                <h4>{typesTitle}</h4>

                <div className={"form-group mt-3"}>
                    <label className={"form-label"} htmlFor={"vehicle-type"}>Vehicle Type</label>
                    <SelectTypeFilter disable={loadingSubmit} onChange={handleOnChangeSelect} value={selectedType}/>
                </div>
                <div className={"form-group mt-3"}>
                    <label className={"form-label"} htmlFor={"plat_number"}>Plate Number</label>
                    <input disabled={loadingSubmit} onChange={handleOnChangePlateNumber} value={plateNumber}
                           type={"text"}
                           className={"form-control"} name={"plat_number"} placeholder={"BK 12341 KZN"}/>
                </div>
                <div className={"form-group mt-3 col-12"}>
                    <button disabled={loadingSubmit} type={"submit"}
                            className={`col-12 btn ${loadingSubmit ?
                                'btn-secondary' : types === "checkin" ?
                                    'btn-success' : 'btn-danger'}`}>{!loadingSubmit ? typesTitle : "Loading..."}</button>
                </div>
            </div>
        </form>
    </div>)
}