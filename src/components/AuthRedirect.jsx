import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
    const token = localStorage.getItem("token");
    const student = localStorage.getItem("student");

    if (token && student) {
        // already logged in → kick to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AuthRedirect;
