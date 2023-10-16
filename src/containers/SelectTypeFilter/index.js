import React from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_TYPES} from "../../gql";

export default function SelectTypeFilter({disable = false,disabledOption = true,value = "", onChange, ...props}) {
    const {data, loading, error} = useQuery(GET_ALL_TYPES);
    const handleOnChange = (event) => {
        onChange(event);
    }
    return <>
        <select disabled={disable} onChange={handleOnChange} value={value} className={"form-control"}>
            {disabledOption ? <option disabled={true} value={"-"}>Select type</option> : <option value={""}>All</option>}
            {!loading && data.GetAllTypes.map((item, index) => (
                <option key={index} value={item.TypeName}>
                    {item.TypeName}
                </option>
            ))}
        </select>
    </>
}