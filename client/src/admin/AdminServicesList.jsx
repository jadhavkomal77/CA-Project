
import { Link } from "react-router-dom";
import {
  useGetAdminServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../redux/apis/serviceApi";

export default function AdminServicesList() {
  const { data: services, isLoading, isError } = useGetAdminServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await deleteService(id);
  };

  const toggleActive = async (service) => {
    await updateService({
      id: service._id,
      data: { ...service, isActive: !service.isActive },
    });
  };

  if (isLoading) return <p className="p-6">Loading services...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load services</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link
          to="/admin/addservices"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Service
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-3 font-medium">{s.title}</td>
                <td className="p-3 text-gray-500">{s.slug}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleActive(s)}
                    className={`font-semibold ${
                      s.isActive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3 flex gap-3">
                  <Link
                    to={`/admin/services/edit/${s._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
