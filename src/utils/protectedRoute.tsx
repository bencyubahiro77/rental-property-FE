import { Navigate, Outlet } from "react-router-dom";
import tokenHeaders from "../AppComponent/token"

const ProtectedRoute = ({allowedRoles }:any) =>{
    const token = localStorage.getItem("token");
    const headers = tokenHeaders()
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null
    const userRole = headers.Authorization ? user.role : null

    if(!token || !allowedRoles.includes(userRole)){
        return <Navigate to="/" />;
    }

    return <Outlet />; 
}

export default ProtectedRoute