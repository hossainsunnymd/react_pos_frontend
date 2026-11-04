import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoute = () => {
        const auth = localStorage.getItem('authUser');
        return auth ? <Outlet /> : <Navigate to="/" replace/>;
    };
    
export default ProtectedRoute;