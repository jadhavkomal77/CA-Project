// import { useState } from "react";
// import {
//   useDeleteServiceMutation,
//   useGetAdminServicesQuery,
//   useUpdateServiceMutation,
// } from "../redux/apis/serviceApi";

// import AdminServices from "./AdminServices";

// export default function AdminServicesList() {
//   const { data: services, isLoading, isError } = useGetAdminServicesQuery();
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService] = useUpdateServiceMutation();

//   const [editingService, setEditingService] = useState(null);

//   if (isLoading) return <p className="p-6">Loading services...</p>;
//   if (isError) return <p className="p-6 text-red-500">Failed to load services</p>;

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       await deleteService(id);
//       if (editingService?._id === id) setEditingService(null);
//     }
//   };

//   const toggleActive = async (service) => {
//     await updateService({
//       id: service._id,
//       data: { ...service, isActive: !service.isActive },
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-10">

//       {/* FORM */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <AdminServices editData={editingService} />
//       </div>

//       {/* LIST */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-xl font-bold mb-4">All Services</h2>

//         {services?.length === 0 && (
//           <p className="text-gray-500">No services added yet.</p>
//         )}

//         <div className="space-y-4">
//           {services?.map((service) => (
//             <div
//               key={service._id}
//               className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-lg p-4"
//             >
//               <div className="flex items-center gap-4">
//                 <span className="text-2xl">{service.icon || "⚡"}</span>
//                 <div>
//                   <h4 className="font-semibold">{service.title}</h4>
//                   <p className="text-sm text-gray-500">
//                     {service.shortDesc}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setEditingService(service)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(service._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>

//                 <button
//                   onClick={() => toggleActive(service)}
//                   className={`text-sm font-medium ${
//                     service.isActive ? "text-green-600" : "text-gray-400"
//                   }`}
//                 >
//                   {service.isActive ? "Active" : "Inactive"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }



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
