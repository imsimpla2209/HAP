import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children, role }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token !== undefined
        && (!!role ? getTokenFromLocalStorage?.role === role : true)
        ? children : (<Navigate to='/login' replace={true} />)
}