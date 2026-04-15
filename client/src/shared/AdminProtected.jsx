import { Navigate } from "react-router-dom";
import { useAdminProfileQuery } from "../redux/apis/adminApi";

export default function AdminProtected({ children }) {
  const { isLoading, isError } = useAdminProfileQuery();


  if (isLoading) {
    return <div className="p-10 text-center">Checking authentication...</div>;
  }

  if (isError) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}
