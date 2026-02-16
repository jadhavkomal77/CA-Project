// import { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import { useCreatePolicyMutation, useUpdatePolicyMutation } from "../redux/apis/policyApi";


// export default function AdminPolicyEditor({ selected }) {

//   const [createPolicy] = useCreatePolicyMutation();
//   const [updatePolicy] = useUpdatePolicyMutation();

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     content: "",
//     seoTitle: "",
//     seoDescription: "",
//     status: "draft"
//   });

//   /* auto fill when edit */
//   useEffect(() => {
//     if (selected) setForm(selected);
//   }, [selected]);

//   /* auto slug generator */
//   useEffect(() => {
//     const slug = form.title
//       .toLowerCase()
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");
//     setForm((p) => ({ ...p, slug }));
//   }, [form.title]);

//   /* save handler */
//   const handleSave = async () => {
//     if (selected?._id) {
//       await updatePolicy({ id: selected._id, ...form });
//       alert("Updated");
//     } else {
//       await createPolicy(form);
//       alert("Created");
//     }
//   };

//   return (
//     <div className="p-6 space-y-4 max-w-4xl">

//       {/* TITLE */}
//       <input
//         placeholder="Page Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         className="border p-2 w-full"
//       />

//       {/* SLUG */}
//       <input
//         placeholder="Slug"
//         value={form.slug}
//         onChange={(e) => setForm({ ...form, slug: e.target.value })}
//         className="border p-2 w-full"
//       />

//       {/* EDITOR */}
//       <ReactQuill
//         theme="snow"
//         value={form.content}
//         onChange={(val) => setForm({ ...form, content: val })}
//         className="bg-white"
//       />

//       {/* STATUS */}
//       <select
//         value={form.status}
//         onChange={(e) => setForm({ ...form, status: e.target.value })}
//         className="border p-2"
//       >
//         <option value="draft">Draft</option>
//         <option value="published">Published</option>
//       </select>

//       {/* SEO */}
//       <div className="border p-4 space-y-2">
//         <p className="font-semibold">SEO Settings</p>

//         <input
//           placeholder="SEO Title"
//           value={form.seoTitle}
//           onChange={(e) =>
//             setForm({ ...form, seoTitle: e.target.value })
//           }
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="SEO Description"
//           value={form.seoDescription}
//           onChange={(e) =>
//             setForm({ ...form, seoDescription: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//       </div>

//       {/* SAVE */}
//       <button
//         onClick={handleSave}
//         className="bg-black text-white px-6 py-2 rounded"
//       >
//         Save Page
//       </button>

//       {/* LIVE PREVIEW */}
//       <div className="border p-5 mt-6">
//         <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
//         <div dangerouslySetInnerHTML={{ __html: form.content }} />
//       </div>

//     </div>
//   );
// }
import React from 'react'

const AdminPolicyEditor = () => {
  return (
    <div>AdminPolicyEditor</div>
  )
}

export default AdminPolicyEditor