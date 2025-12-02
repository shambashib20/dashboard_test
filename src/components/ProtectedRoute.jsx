import { Navigate, Outlet,  } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const student = localStorage.getItem("student");


  if (!token || !student) {
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
};


export default ProtectedRoute;
