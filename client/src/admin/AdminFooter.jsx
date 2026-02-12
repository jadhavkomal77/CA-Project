import { useEffect, useState } from "react";
import { useGetAdminFooterQuery, useSaveFooterMutation } from "../redux/apis/footerApi";


export default function AdminFooter() {
  const { data, isLoading } = useGetAdminFooterQuery();
  const [saveFooter, { isLoading: saving }] = useSaveFooterMutation();

  const [form, setForm] = useState({
    companyName: "",
    tagline: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    quickLinks: "",
    importantLinks: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        quickLinks: data.quickLinks?.join(", "),
        importantLinks: data.importantLinks?.join(", "),
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quickLinks: form.quickLinks.split(",").map((i) => i.trim()),
      importantLinks: form.importantLinks.split(",").map((i) => i.trim()),
    };

    await saveFooter(payload);
    alert("Footer updated successfully");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <h2 className="text-3xl font-bold mb-6">Footer Settings</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
      >
        <input
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="tagline"
          placeholder="Tagline"
          value={form.tagline}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <input
          name="facebook"
          placeholder="Facebook URL"
          value={form.facebook}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="twitter"
          placeholder="Twitter URL"
          value={form.twitter}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="instagram"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="quickLinks"
          placeholder="Quick Links (comma separated)"
          value={form.quickLinks}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <input
          name="importantLinks"
          placeholder="Important Links (comma separated)"
          value={form.importantLinks}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded md:col-span-2"
        >
          {saving ? "Saving..." : "Save Footer"}
        </button>
      </form>

 
    </div>
  );
}
