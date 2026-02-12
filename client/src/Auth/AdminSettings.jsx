import React, { useEffect, useState } from "react";
import { useAdminProfileQuery, useUpdateAdminProfileMutation } from "../redux/apis/adminApi";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const { data, isLoading, refetch } = useAdminProfileQuery();
  const [updateProfile, { isLoading: updating }] =
    useUpdateAdminProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (data?.admin) {
      setFormData({
        name: data.admin.name || "",
        phone: data.admin.phone || "",
      });
      setPreview(data.admin.profile?.url || "");
    }
  }, [data]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("phone", formData.phone);
    if (image) payload.append("profileImage", image);

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  const admin = data?.admin;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 flex items-center gap-6">
        <img
          src={
            preview ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-semibold">{admin?.name}</h2>
          <p className="text-gray-600">{admin?.email}</p>
          <p className="text-gray-500 text-sm mt-1">Role: Admin</p>
        </div>
      </div>

      {/* ================= UPDATE FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5"
      >
        <h2 className="text-lg font-semibold">Update Profile</h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
