import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.css"
import Loading from "../Loading";
import TableInfo from "../TableInfo";
import IconCar from "../../assets/icon/car.png";
import IconBus from "../../assets/icon/bus.png";
import IconMiniBus from "../../assets/icon/mini-bus.png";
import IconMotorcycle from "../../assets/icon/motorcyle.png";
import SelectTypeFilter from "../SelectTypeFilter";
import {useQuery} from "@apollo/client";
import {GET_ALL_VEHICLE_IN_TOWN} from "../../gql";
import ModalError from "../ModalError";

export default function TableHistory({townCode, headers = [], ...props}) {
    const mappingStatus = {
        "in": "Inside",
        "out": "Already out"
    };
    const mappingIcon = {
        "Car": IconCar,
        "Bus": IconBus,
        "Mini Bus": IconMiniBus,
        "Motorcycle": IconMotorcycle,
    }

    const [plateNumber, setPlateNumber] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [showError, setShowError] = useState(false);
    const handleOnChangePlateNumber = async (event) => {
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
                newValue = chartValue.slice(0, i)
                break;
            } else {
                newValue += chartValue[i];
            }

        }
        setPlateNumber(newValue.toUpperCase());
        await refetch();
    }

    const handleOnChangeSelect = async (event) => {
        const {value} = event.currentTarget;
        setSelectedType(value);
        await refetch();
    }

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

    const {data, loading, error, refetch} = useQuery(GET_ALL_VEHICLE_IN_TOWN, {
        variables: {
            filter: {
                TownCode: townCode,
                PlatNumber: plateNumber,
                VehicleType: selectedType,
            }
        },
    });

    const handleCloseModal = () => {
        setShowError(false);
    }

    const handleReTry = async () => {
        await refetch();
        setShowError(false);
    }


    return (<div className={styles.tableHistory}>
        {loading && <Loading/>}
        {(error || showError) && <ModalError onClose={handleCloseModal} reTry={handleReTry}/>}
        <div className={styles.filter}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <input value={plateNumber} onChange={handleOnChangePlateNumber} name={"plat_number"}
                           placeholder={"Plate number"}
                           className={"form-control"}/>
                </div>
                <div className={"col-4"}>
                    <SelectTypeFilter disabledOption={false} value={selectedType} onChange={handleOnChangeSelect}/>
                </div>
            </div>
        </div>
        <div className={`${styles.wrapTableHistory} rounded`}>
            <table className={styles.table}>
                {headers.length > 0 && (<thead className={"bg-secondary text-white"}>
                <tr>
                    {headers.map((v, index) => (
                        <th key={`header-${index}`}>{v}</th>
                    ))}
                </tr>
                </thead>)}
                <tbody>
                {!loading && data.GetVehicleInTown.length > 0 && data.GetVehicleInTown.map((item, index) => (
                    <tr key={`table-${index}`} className={"bg-secondary-subtle text-dark"}>
                        <td><TableInfo icon={mappingIcon[item.VehicleType]}/></td>
                        <td><TableInfo value={item.PlatNumber}/></td>
                        <td><TableInfo value={`${item.DateCheckIn} ${item.TimeCheckIn}`}/></td>
                        <td><TableInfo value={`${item.DateCheckOut} ${item.TimeCheckOut}`}/></td>
                        <td><TableInfo value={mappingStatus[item.DateCheckOut === "-" ? "in" : "out"]}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>)
}