// import { Navigate } from "react-router-dom";
// import { useAdminProfileQuery } from "../redux/apis/adminApi";

// export default function AdminProtected({ children }) {
//   const { isLoading, isError } = useAdminProfileQuery();


//   if (isLoading) {
//     return <div className="p-10 text-center">Checking authentication...</div>;
//   }

//   if (isError) {
//     return <Navigate to="/adminlogin" replace />;
//   }

//   return children;
// }






import { Navigate } from "react-router-dom";
import { useAdminProfileQuery } from "../redux/apis/adminApi";

export default function AdminProtected({ children }) {
  const {
    isLoading,
    isError,
    isSuccess,
  } = useAdminProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (isError || !isSuccess) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}