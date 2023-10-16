import React from "react";
import styles from "./index.module.css";

export default function DetailLogOut({data, ...props}) {
    function secondsToDhms(seconds) {
        seconds = Number(seconds)
        var d = Math.floor(seconds / (3600 * 24))
        var h = Math.floor((seconds % (3600 * 24)) / 3600)
        var m = Math.floor((seconds % 3600) / 60)
        var s = Math.floor(seconds % 60)
        // console.log(d, h, m, s)
        var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : ""
        var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : ""
        var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : ""
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : ""
        return dDisplay + hDisplay + mDisplay + sDisplay
    }
    return (<div className={`${styles.detailLogOut} col-12 p-3 shadow-sm rounded`}>
        <div className={"text-center fs-3 fw-bold"}>
            Detail Log Out
        </div>
        <div className={"mt-3 col-12"}>
            <table className={styles.table}>
                <tbody>
                <tr>
                    <td>Plat Number</td>
                    <td>:</td>
                    <td>{data.PlatNumber}</td>
                </tr>
                <tr>
                    <td>Building Code</td>
                    <td>:</td>
                    <td>{data.TownCode}</td>
                </tr>
                <tr>
                    <td>Building Name</td>
                    <td>:</td>
                    <td>{data.TownName}</td>
                </tr>
                <tr>
                    <td>Vehicle Type</td>
                    <td>:</td>
                    <td>{data.VehicleType}</td>
                </tr>
                <tr>
                    <td>Date In</td>
                    <td>:</td>
                    <td>{`${data.DateAt} ${data.TimeIn}`}</td>
                </tr>
                <tr>
                    <td>Date Out</td>
                    <td>:</td>
                    <td>{`${data.DateOutAt} ${data.TimeOut}`}</td>
                </tr>
                <tr>
                    <td>Total Time</td>
                    <td>:</td>
                    <td>{secondsToDhms(data.TotalTime)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>)
}