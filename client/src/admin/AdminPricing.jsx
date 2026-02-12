// import { useState, useEffect } from "react";
// import {
//   useGetAdminPricingQuery,
//   useCreatePricingMutation,
//   useUpdatePricingMutation,
//   useDeletePricingMutation,
// } from "../redux/apis/pricingApi";
// import { toast } from "react-toastify";

// export default function AdminPricing() {
//   const { data: list = [], isLoading } = useGetAdminPricingQuery();
//   const [createPricing] = useCreatePricingMutation();
//   const [updatePricing] = useUpdatePricingMutation();
//   const [deletePricing] = useDeletePricingMutation();

//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     price: "",
//     currency: "₹",
//     unit: "/visit",
//     features: "",
//     isPopular: false,
//     status: "active",
//   });

//   useEffect(() => {
//     if (editId) {
//       const p = list.find((i) => i._id === editId);
//       if (p) {
//         setForm({
//           title: p.title,
//           subtitle: p.subtitle,
//           price: p.price,
//           currency: p.currency,
//           unit: p.unit,
//           features: p.features.join(", "),
//           isPopular: p.isPopular,
//           status: p.status,
//         });
//       }
//     }
//   }, [editId, list]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       features: form.features.split(",").map((f) => f.trim()),
//     };

//     try {
//       if (editId) {
//         await updatePricing({ id: editId, data: payload }).unwrap();
//         toast.success("Pricing updated");
//       } else {
//         await createPricing(payload).unwrap();
//         toast.success("Pricing added");
//       }

//       setEditId(null);
//       setForm({
//         title: "",
//         subtitle: "",
//         price: "",
//         currency: "₹",
//         unit: "/visit",
//         features: "",
//         isPopular: false,
//         status: "active",
//       });
//     } catch {
//       toast.error("Operation failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     await deletePricing(id);
//     toast.success("Deleted");
//   };

//   if (isLoading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 space-y-10">

//       {/* ===== FORM ===== */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-xl font-bold mb-4">
//           {editId ? "Edit Pricing Plan" : "Add Pricing Plan"}
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
//           <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" className="input" />

//           <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />

//           <select name="currency" value={form.currency} onChange={handleChange} className="input">
//             <option value="₹">₹</option>
//             <option value="$">$</option>
//           </select>

//           <input name="unit" value={form.unit} onChange={handleChange} placeholder="/visit" className="input" />
//           <input name="features" value={form.features} onChange={handleChange} placeholder="Feature1, Feature2" className="input" />

//           <select name="status" value={form.status} onChange={handleChange} className="input">
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>

//           <label className="flex items-center gap-2">
//             <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
//             Popular Plan
//           </label>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//         >
//           {editId ? "Update Pricing" : "Add Pricing"}
//         </button>
//       </div>

//       {/* ===== TABLE ===== */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Title</th>
//               <th>Price</th>
//               <th>Popular</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {list.map((p) => (
//               <tr key={p._id} className="border-t">
//                 <td className="p-2 font-semibold">{p.title}</td>
//                 <td>{p.currency}{p.price} {p.unit}</td>
//                 <td>{p.isPopular ? "⭐" : "-"}</td>
//                 <td>
//                   <span className={p.status === "active" ? "text-green-600" : "text-red-600"}>
//                     {p.status}
//                   </span>
//                 </td>
//                 <td className="space-x-3">
//                   <button onClick={() => setEditId(p._id)} className="text-blue-600">Edit</button>
//                   <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  useGetAdminPricingQuery,
  useCreatePricingMutation,
  useUpdatePricingMutation,
  useDeletePricingMutation,
} from "../redux/apis/pricingApi";
import { toast } from "react-toastify";

export default function AdminPricing() {
  const { data: list = [], isLoading } = useGetAdminPricingQuery();
  const [createPricing] = useCreatePricingMutation();
  const [updatePricing] = useUpdatePricingMutation();
  const [deletePricing] = useDeletePricingMutation();

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    currency: "₹",
    unit: "/visit",
    features: "",
    isPopular: false,
    status: "active",
  });

  useEffect(() => {
    if (editId) {
      const p = list.find((i) => i._id === editId);
      if (p) {
        setForm({
          title: p.title,
          subtitle: p.subtitle,
          price: p.price,
          currency: p.currency,
          unit: p.unit,
          features: p.features.join(", "),
          isPopular: p.isPopular,
          status: p.status,
        });
      }
    }
  }, [editId, list]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      features: form.features.split(",").map((f) => f.trim()),
    };

    try {
      if (editId) {
        await updatePricing({ id: editId, data: payload }).unwrap();
        toast.success("Pricing updated");
      } else {
        await createPricing(payload).unwrap();
        toast.success("Pricing added");
      }

      setEditId(null);
      setForm({
        title: "",
        subtitle: "",
        price: "",
        currency: "₹",
        unit: "/visit",
        features: "",
        isPopular: false,
        status: "active",
      });
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    await deletePricing(id);
    toast.success("Deleted");
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-4 md:p-6 space-y-10">

      {/* ===== FORM ===== */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          {editId ? "Edit Pricing Plan" : "Add Pricing Plan"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="input w-full"
          />
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="input w-full"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="input w-full"
          />

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="₹">₹</option>
            <option value="$">$</option>
          </select>

          <input
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="/visit"
            className="input w-full"
          />
          <input
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Feature1, Feature2"
            className="input w-full"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isPopular"
              checked={form.isPopular}
              onChange={handleChange}
            />
            Popular Plan
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          {editId ? "Update Pricing" : "Add Pricing"}
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Popular</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2 font-semibold">{p.title}</td>
                <td>
                  {p.currency}
                  {p.price} {p.unit}
                </td>
                <td>{p.isPopular ? "⭐" : "-"}</td>
                <td>
                  <span
                    className={
                      p.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="space-x-3 whitespace-nowrap">
                  <button
                    onClick={() => setEditId(p._id)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600"
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
