import { useEffect, useState } from "react";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetAdminClientsQuery,
  useUpdateClientMutation,
  useReorderClientsMutation,
} from "../redux/apis/clientApi";

export default function AdminClients() {

  const { data: clients = [], isLoading } = useGetAdminClientsQuery();

  const [addClient, { isLoading: adding }] = useAddClientMutation();
  const [updateClient, { isLoading: updating }] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [reorderClients] = useReorderClientsMutation();

  // Local copy so the arrows reorder instantly instead of waiting on the refetch.
  const [items, setItems] = useState([]);
  useEffect(() => setItems(clients), [clients]);

  const [editingId, setEditingId] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    isActive: true,
  });

  /* LOGO SELECT */
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* RESET */
  const resetForm = () => {
    setForm({ name: "", isActive: true });
    setLogoFile(null);
    setPreview("");
    setEditingId(null);
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    if (!form.name) return alert("Enter the client name");

    // Logo is required on create; on edit, keep the existing one if no new file.
    if (!editingId && !logoFile) return alert("Choose a logo image");

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("isActive", form.isActive);

      if (logoFile) fd.append("logo", logoFile);

      if (editingId) await updateClient({ id: editingId, data: fd }).unwrap();
      else await addClient(fd).unwrap();

      resetForm();
    } catch (err) {
      alert(err?.data?.message || "Something went wrong");
    }
  };

  /* EDIT */
  const handleEdit = (c) => {
    setEditingId(c._id);
    setForm({ name: c.name, isActive: c.isActive });
    setLogoFile(null);
    setPreview(c.logo || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* MOVE — swap with the neighbour, then persist the whole list */
  const move = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];

    setItems(next);
    await reorderClients(next.map((c) => ({ _id: c._id })));
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete this client?")) return;
    await deleteClient(id);
  };

  if (isLoading)
    return <p className="text-center mt-20 text-lg">Loading clients...</p>;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Manage Clients
      </h1>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border space-y-5">

        <h2 className="text-xl font-semibold">
          {editingId ? "Update Client" : "Add New Client"}
        </h2>

        <input
          className="input"
          placeholder="Client Name (shown to screen readers)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* LOGO */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Logo (jpg, png or webp — max 2MB)
          </label>

          <input type="file" accept="image/*" onChange={handleLogo} />

          {preview && (
            <div className="bg-blue-600 inline-flex items-center justify-center rounded-xl p-4 mt-2">
              <img
                src={preview}
                alt="Logo preview"
                className="h-16 max-w-[160px] object-contain bg-white rounded p-2"
              />
            </div>
          )}

          {editingId && !logoFile && (
            <p className="text-xs text-gray-500">
              Leave empty to keep the current logo.
            </p>
          )}
        </div>

        {/* ACTIVE */}
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Show on website
        </label>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            disabled={adding || updating}
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {editingId
              ? updating ? "Updating..." : "Update"
              : adding ? "Adding..." : "Add"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          No clients yet. Add one above and it will appear in the
          &quot;Our Clients&quot; section on the homepage.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, index) => (
            <div key={c._id} className="bg-white p-6 rounded-xl shadow border">

              <div className="bg-blue-600 rounded-lg h-24 flex items-center justify-center mb-4">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-16 max-w-[70%] object-contain bg-white rounded p-2"
                />
              </div>

              <h3 className="font-bold text-lg">{c.name}</h3>

              {!c.isActive && (
                <span className="inline-block mt-2 text-xs bg-gray-500 text-white px-3 py-1 rounded-full">
                  Hidden
                </span>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  title="Move earlier"
                  className="flex-1 bg-gray-200 py-1 rounded disabled:opacity-40"
                >
                  ▲
                </button>

                <button
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  title="Move later"
                  className="flex-1 bg-gray-200 py-1 rounded disabled:opacity-40"
                >
                  ▼
                </button>

                <span className="flex-1 text-center text-sm text-gray-500 leading-7">
                  #{index + 1}
                </span>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="flex-1 bg-red-600 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
