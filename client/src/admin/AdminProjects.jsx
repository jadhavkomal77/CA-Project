
import {
  useGetAdminProjectsQuery,
  useDeleteProjectMutation,
} from "../redux/apis/projectApi";
import { useNavigate } from "react-router-dom";

export default function AdminProjects() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useGetAdminProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
          Projects
        </h1>

        <button
          onClick={() => navigate("/admin/projects/new")}
          className="bg-red-500 text-white px-5 py-2 rounded-md font-medium w-full md:w-auto"
        >
          + Add Project
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-12 w-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium whitespace-nowrap">
                  {p.title}
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  <div className="flex gap-3 whitespace-nowrap">
                    <button
                      onClick={() =>
                        navigate(`/admin/projects/edit/${p._id}`)
                      }
                      className="text-blue-600 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p._id)}
                      className="text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

