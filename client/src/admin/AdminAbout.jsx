
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAdminAboutQuery,
  useSaveAboutMutation,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from "../redux/apis/aboutApi";

export default function AdminAbout() {
  const { data, isLoading, refetch } = useGetAdminAboutQuery();
  const [saveAbout, { isLoading: savingAbout }] = useSaveAboutMutation();
  const [addTeamMember, { isLoading: addingMember }] = useAddTeamMemberMutation();
  const [updateTeamMember, { isLoading: updatingMember }] = useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: deletingMember }] = useDeleteTeamMemberMutation();

  const [form, setForm] = useState({
    headingSmall: "",
    title: "",
    description1: "",
    description2: "",
    experience: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);

  const [newMember, setNewMember] = useState({
    name: "",
    shortDetails: "",
  });
  const [newMemberPhoto, setNewMemberPhoto] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editMember, setEditMember] = useState({
    name: "",
    shortDetails: "",
  });
  const [editPhoto, setEditPhoto] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({
        headingSmall: data.headingSmall || "",
        title: data.title || "",
        description1: data.description1 || "",
        description2: data.description2 || "",
        experience: data.experience || "",
        isActive: data.isActive ?? true,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("headingSmall", form.headingSmall);
    fd.append("title", form.title);
    fd.append("description1", form.description1);
    fd.append("description2", form.description2);
    fd.append("experience", form.experience);
    fd.append("isActive", form.isActive);

    if (image) fd.append("image", image);

    try {
      await saveAbout(fd).unwrap();
      toast.success("About saved successfully");
      setImage(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save about");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!newMember.name || !newMember.shortDetails || !newMemberPhoto) {
      toast.error("Please fill all team member fields");
      return;
    }

    const fd = new FormData();
    fd.append("name", newMember.name);
    fd.append("shortDetails", newMember.shortDetails);
    fd.append("photo", newMemberPhoto);

    try {
      await addTeamMember(fd).unwrap();
      toast.success("Team member added successfully");
      setNewMember({
        name: "",
        shortDetails: "",
      });
      setNewMemberPhoto(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add team member");
    }
  };

  const startEdit = (member) => {
    setEditId(member._id);
    setEditMember({
      name: member.name || "",
      shortDetails: member.shortDetails || "",
    });
    setEditPhoto(null);
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", editMember.name);
    fd.append("shortDetails", editMember.shortDetails);
    if (editPhoto) fd.append("photo", editPhoto);

    try {
      await updateTeamMember({ id: editId, data: fd }).unwrap();
      toast.success("Team member updated successfully");
      setEditId(null);
      setEditMember({
        name: "",
        shortDetails: "",
      });
      setEditPhoto(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update team member");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this member?");
    if (!ok) return;

    try {
      await deleteTeamMember(id).unwrap();
      toast.success("Team member deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete team member");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">About Page</h2>
      <p className="text-gray-500 mb-8">Manage about section and team members</p>

      {/* ABOUT FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Small Heading</label>
          <input
            name="headingSmall"
            value={form.headingSmall}
            onChange={handleChange}
            placeholder="WHO WE ARE"
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description 1</label>
          <textarea
            name="description1"
            value={form.description1}
            onChange={handleChange}
            placeholder="Description 1"
            required
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-300 h-28"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description 2</label>
          <textarea
            name="description2"
            value={form.description2}
            onChange={handleChange}
            placeholder="Description 2"
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-300 h-28"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Experience</label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Years of experience"
            className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          {data?.image && (
            <img
              src={data.image}
              alt="About"
              className="h-44 w-full md:w-80 mt-4 rounded-lg object-cover border"
            />
          )}
        </div>

        <label className="flex items-center gap-2 select-none">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Show Section
        </label>

        <button
          type="submit"
          disabled={savingAbout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {savingAbout ? "Saving..." : "Save About"}
        </button>
      </form>

      {/* ADD TEAM MEMBER */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Team Member</h3>

        <form onSubmit={handleAddMember} className="grid gap-4 md:grid-cols-3">
          <input
            value={newMember.name}
            onChange={(e) =>
              setNewMember((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name"
            className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            value={newMember.shortDetails}
            onChange={(e) =>
              setNewMember((prev) => ({
                ...prev,
                shortDetails: e.target.value,
              }))
            }
            placeholder="Short Details"
            className="border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewMemberPhoto(e.target.files[0])}
            className="border px-3 py-2 rounded-lg bg-white"
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={addingMember}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-60"
            >
              {addingMember ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>

      {/* TEAM LIST */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Team Members</h3>

        {data?.teamMembers?.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.teamMembers.map((member) => (
              <div
                key={member._id}
                className="border rounded-xl p-4 bg-gray-50 shadow-sm"
              >
                {editId === member._id ? (
                  <form onSubmit={handleUpdateMember} className="space-y-3">
                    <input
                      value={editMember.name}
                      onChange={(e) =>
                        setEditMember((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Name"
                      className="w-full border px-4 py-2 rounded-lg"
                    />

                    <input
                      value={editMember.shortDetails}
                      onChange={(e) =>
                        setEditMember((prev) => ({
                          ...prev,
                          shortDetails: e.target.value,
                        }))
                      }
                      placeholder="Short Details"
                      className="w-full border px-4 py-2 rounded-lg"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditPhoto(e.target.files[0])}
                      className="w-full"
                    />

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={updatingMember}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                      >
                        {updatingMember ? "Updating..." : "Update"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-40 w-full rounded-lg object-cover mb-3 border"
                    />
                    <h4 className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {member.shortDetails}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(member)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(member._id)}
                        disabled={deletingMember}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No team members found.</p>
        )}
      </div>
    </div>
  );
}