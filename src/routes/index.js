import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Log from "../pages/Log";

const routes = createBrowserRouter([
    {
        path: "/log/:types/:townCode",
        element: <Log/>,
    },
    {
        path: "/",
        element: <Home/>
    }
]);

export default routes;