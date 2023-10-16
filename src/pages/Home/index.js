import React, {useState} from "react";
import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_TOWN_QUERY} from "../../gql";
import ModalError from "../../containers/ModalError";
import Loading from "../../containers/Loading";

export default function Home(props) {
    const {data, loading, error, refetch} = useQuery(GET_ALL_TOWN_QUERY);
    const navigator = useNavigate();
    const [showError, setShowError] = useState(false);
    const [selectedTown, setSelectedTown] = useState("-");

    let towns = [];

    if (!loading && !error) {
        towns = [...data.GetAllTown.map(item => ({
            "id": item.Id,
            "town_name": item.TownName,
            "town_code": item.TownCode
        }))];

    }

    const handleOnClickMenu = (event) => {
        let target = event.currentTarget.dataset.path;
        if (selectedTown !== "-") {
            navigator(`/log${target}/${selectedTown}`)
        }
    }

    const handleOnChange = (event) => {
        const {value} = event.currentTarget;
        if (value !== "-") {
            setSelectedTown(value);
        }
    }

    const handleCloseModal = () => {
        setShowError(false);
    }

    const handleReTry = async () => {
        await refetch();
        setShowError(false);
    }

    return (<>
        {(error || showError) && <ModalError onClose={handleCloseModal} reTry={handleReTry}/>}
        {loading && <Loading/>}
        <div className={`${styles.homeWrapper} shadow-sm rounded py-3 px-3`}>
            <div>
                <h1 className={"fs-3 text-center"}>Vehicle Log</h1>
            </div>
            <div className={"mb-3"}>
                <select onChange={handleOnChange} className={"form-control"} value={selectedTown}>
                    <option disabled={true} value={"-"}>Select Building</option>
                    {towns.length > 0 && towns.map((item, index) => (
                        <option key={`town-${index}`} value={item.town_code}>{item.town_name}</option>
                    ))}
                </select>
            </div>
            <div className={`d-flex justify-content-center flex-column`}>
                <div data-path={"/checkin"} onClick={handleOnClickMenu}
                     className={`${styles.buttonMenu} bg-info rounded btn text-white`} role={`button`}>
                    Check In
                </div>
                <div data-path={"/checkout"} onClick={handleOnClickMenu}
                     className={`${styles.buttonMenu} bg-secondary rounded btn text-white mt-3`} role={`button`}>
                    Check Out
                </div>
            </div>
        </div>
    </>);
}