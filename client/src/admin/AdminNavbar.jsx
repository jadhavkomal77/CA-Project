

import { useEffect, useState } from "react";
import {
  useGetAdminNavbarQuery,
  useSaveNavbarMutation,
} from "../redux/apis/navbarApi";

export default function AdminNavbar() {
  const { data, isLoading } = useGetAdminNavbarQuery();
  const [saveNavbar, { isLoading: saving }] =
    useSaveNavbarMutation();

  const [phone, setPhone] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (data) {
      setPhone(data.phone || "");
      setMenu(data.menu || []);
    }
  }, [data]);

  const handleMenuChange = (index, field, value) => {
    const updated = [...menu];
    updated[index] = { ...updated[index], [field]: value };
    setMenu(updated);
  };

  const addMenuItem = () => {
    setMenu([...menu, { label: "", link: "" }]);
  };

  const removeMenuItem = (index) => {
    setMenu(menu.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await saveNavbar({
        phone,
        menu,
      }).unwrap();

      alert("Navbar Updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update Failed ❌");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Navbar Settings</h1>

      {/* PHONE */}
      <div className="space-y-1">
        <label className="font-medium">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+91 9876543210"
        />
      </div>

      {/* MENU */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Menu Items</h2>
          <button
            onClick={addMenuItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Add Menu
          </button>
        </div>

        {menu.length === 0 && (
          <p className="text-sm text-gray-500">
            No menu items added
          </p>
        )}

        {menu.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-3 items-center"
          >
            <input
              className="col-span-5 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Label"
              value={item.label}
              onChange={(e) =>
                handleMenuChange(i, "label", e.target.value)
              }
            />
            <input
              className="col-span-5 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/about"
              value={item.link}
              onChange={(e) =>
                handleMenuChange(i, "link", e.target.value)
              }
            />
            <button
              onClick={() => removeMenuItem(i)}
              className="col-span-2 text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-10 py-3 rounded-lg font-semibold transition"
      >
        {saving ? "Saving..." : "Save Navbar"}
      </button>
    </div>
  );
}

