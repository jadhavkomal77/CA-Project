// pages/admin/AboutTeamPage.jsx
import { useState } from "react";
import { useAddAboutTeamMutation, useDeleteAboutTeamMutation, useGetAboutTeamQuery } from "../redux/apis/aboutTeamApi";


const AdminAboutTeam = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [addAboutTeam, { isLoading }] = useAddAboutTeamMutation();
  const [deleteAboutTeam] = useDeleteAboutTeamMutation();
  const { data, isLoading: listLoading, refetch } = useGetAboutTeamQuery();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("img", image);

    try {
      await addAboutTeam(formData).unwrap();
      setName("");
      setRole("");
      setImage(null);
      setPreview("");
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAboutTeam(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const members = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">About Team</h1>
          <p className="mt-1 text-slate-500">
            Add and manage about team members from admin panel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-1">
            <h2 className="mb-5 text-xl font-semibold text-slate-800">
              Add Member
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Manager / Director / CEO"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
                />
              </div>

              {preview && (
                <div className="rounded-xl border border-dashed border-slate-300 p-3">
                  <p className="mb-2 text-sm text-slate-500">Preview</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Saving..." : "Add Member"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                All Members
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {members.length} Members
              </span>
            </div>

            {listLoading ? (
              <div className="py-12 text-center text-slate-500">Loading...</div>
            ) : members.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                No members added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {members.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={item.img?.url}
                      alt={item.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.role || "No role added"}
                      </p>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutTeam;