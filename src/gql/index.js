import {gql} from "@apollo/client";

export const GET_ALL_TOWN_QUERY = gql`
    query GetAllTown {
        GetAllTown {
            Id
            TownCode
            TownName
        }
    }
`;

export const GET_REPORT_LOGGED = gql`
    query ReportLogged($filter: FilterReportLogged!) {
    ReportLogged(filter: $filter) {
        TownCode
        VehicleType
        TotalLogged
        Quantity
    }
}
`;


export const GET_ALL_TYPES = gql`
    query GetAllTypes {
    GetAllTypes {
        Id
        TypeName
    }
}
`;

export const GET_ALL_VEHICLE_IN_TOWN = gql`
    query GetVehicleInTown($filter: FilterVehicleTown) {
    GetVehicleInTown(filter: $filter) {
        PlatNumber
        VehicleType
        TimeCheckIn
        TimeCheckOut
        DateCheckIn
        DateCheckOut
    }
}
`;

export const LOG_IN = gql`
    mutation LogIn($input: LogInRequest) {
    LogIn(input: $input)
}
`;

export const LOG_OUT = gql`
    mutation LogOut($input: LogOutRequest) {
    LogOut(input: $input) {
        TownName
        TotalTime
        TimeIn
        TimeOut
        DateAt
        PlatNumber
        VehicleType
        DateOutAt
        TownCode
    }
}
`;