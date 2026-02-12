import { useParams } from "react-router-dom";
import { useGetAdminServicesQuery } from "../redux/apis/serviceApi";
import AdminServices from "./AdminServices";

export default function AdminServiceEdit() {
  const { id } = useParams();
  const { data: services, isLoading } = useGetAdminServicesQuery();

  if (isLoading) return <p className="p-6">Loading...</p>;

  const editData = services?.find((s) => s._id === id);

  if (!editData) return <p className="p-6 text-red-500">Service not found</p>;

  return <AdminServices editData={editData} />;
}
