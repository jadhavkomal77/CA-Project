
import React, { useEffect, useState } from "react";
import { useGetAdminHeroQuery, useSaveHeroMutation } from "../redux/apis/heroApi";


export default function AdminHero() {
  const { data } = useGetAdminHeroQuery();
  const [saveHero, { isLoading }] = useSaveHeroMutation();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    isActive: true,
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        buttonText: data.buttonText || "",
        isActive: data.isActive ?? true,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("buttonText", form.buttonText);
    fd.append("isActive", form.isActive);

    if (file) {
      fd.append("backgroundImage", file);
    }

    await saveHero(fd);
    alert("Hero Updated Successfully");
  };

  return (
    <div className="max-w-4xl bg-white shadow rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Hero Section</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          className="w-full border p-3 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
        />

        <input
          type="file"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {data?.backgroundImage && (
          <img
            src={data.backgroundImage}
            alt="hero"
            className="h-40 rounded-lg object-cover"
          />
        )}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({ ...form, isActive: e.target.checked })
            }
          />
          Active
        </label>

        <button
          disabled={isLoading}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
        >
          {isLoading ? "Saving..." : "Save Hero"}
        </button>
      </form>
    </div>
  );
}
