import React, { useEffect, useState } from "react";
import { useGetAdminAboutQuery, useSaveAboutMutation } from "../redux/apis/aboutApi";


export default function AdminAbout() {
  const { data, isLoading } = useGetAdminAboutQuery();
  const [saveAbout, { isLoading: saving }] = useSaveAboutMutation();

  const [form, setForm] = useState({
    headingSmall: "",
    title: "",
    description1: "",
    description2: "",
    experience: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);

  // Load existing about data
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
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
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

    if (image) {
      fd.append("image", image);
    }

    await saveAbout(fd);
    alert("About section updated successfully ✅");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl bg-white shadow rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-2">About Section</h2>
      <p className="text-gray-500 mb-8">
        Manage the About section content shown on the website.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Small Heading */}
        <div>
          <label className="block font-medium mb-1">Small Heading</label>
          <input
            type="text"
            name="headingSmall"
            value={form.headingSmall}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
            placeholder="WHO WE ARE"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Main Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
            placeholder="We get the lights on fast and for a good price."
            required
          />
        </div>

        {/* Description 1 */}
        <div>
          <label className="block font-medium mb-1">Description (Paragraph 1)</label>
          <textarea
            name="description1"
            value={form.description1}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded h-28"
            required
          />
        </div>

        {/* Description 2 */}
        <div>
          <label className="block font-medium mb-1">Description (Paragraph 2)</label>
          <textarea
            name="description2"
            value={form.description2}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded h-28"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium mb-1">Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
            placeholder="15"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-2">About Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {data?.image && (
            <img
              src={data.image}
              alt="About preview"
              className="mt-4 h-48 rounded object-cover"
            />
          )}
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <span>Show About section on website</span>
        </div>

        {/* Save Button */}
        <button
          disabled={saving}
          className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition"
        >
          {saving ? "Saving..." : "Save About Section"}
        </button>
      </form>
    </div>
  );
}
