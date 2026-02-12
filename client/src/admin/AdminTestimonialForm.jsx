// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useCreateTestimonialMutation,
//   useUpdateTestimonialMutation,
//   useGetAdminTestimonialsQuery,
// } from "../redux/apis/testimonialApi";

// export default function AdminTestimonialForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: testimonials = [] } = useGetAdminTestimonialsQuery();

//   const [createTestimonial, { isLoading: creating }] =
//     useCreateTestimonialMutation();
//   const [updateTestimonial, { isLoading: updating }] =
//     useUpdateTestimonialMutation();

//   const [form, setForm] = useState({
//     name: "",
//     designation: "",
//     company: "",
//     message: "",
//     rating: 5,
//     isActive: true,
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   // 🔹 Prefill in Edit Mode
//   useEffect(() => {
//     if (id && testimonials.length) {
//       const existing = testimonials.find((t) => t._id === id);
//       if (existing) {
//         setForm(existing);
//         setPreview(existing.image);
//       }
//     }
//   }, [id, testimonials]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });

//     if (image) formData.append("image", image);

//     if (id) {
//       await updateTestimonial({ id, data: formData });
//     } else {
//       await createTestimonial(formData);
//     }

//     navigate("/admin/testimonials");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">

//       <h2 className="text-2xl font-bold mb-6">
//         {id ? "Edit Testimonial" : "Add Testimonial"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         {/* NAME */}
//         <input
//           type="text"
//           placeholder="Client Name"
//           className="w-full border p-3 rounded-lg"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           required
//         />

//         {/* DESIGNATION */}
//         <input
//           type="text"
//           placeholder="Designation"
//           className="w-full border p-3 rounded-lg"
//           value={form.designation}
//           onChange={(e) =>
//             setForm({ ...form, designation: e.target.value })
//           }
//         />

//         {/* COMPANY */}
//         <input
//           type="text"
//           placeholder="Company"
//           className="w-full border p-3 rounded-lg"
//           value={form.company}
//           onChange={(e) =>
//             setForm({ ...form, company: e.target.value })
//           }
//         />

//         {/* MESSAGE */}
//         <textarea
//           placeholder="Client Feedback Message"
//           className="w-full border p-3 rounded-lg"
//           rows="4"
//           value={form.message}
//           onChange={(e) =>
//             setForm({ ...form, message: e.target.value })
//           }
//           required
//         />

//         {/* RATING */}
//         <select
//           className="w-full border p-3 rounded-lg"
//           value={form.rating}
//           onChange={(e) =>
//             setForm({ ...form, rating: e.target.value })
//           }
//         >
//           {[5, 4, 3, 2, 1].map((r) => (
//             <option key={r} value={r}>
//               {r} Star{r > 1 && "s"}
//             </option>
//           ))}
//         </select>

//         {/* ACTIVE TOGGLE */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             checked={form.isActive}
//             onChange={(e) =>
//               setForm({ ...form, isActive: e.target.checked })
//             }
//           />
//           <label className="text-sm font-medium">
//             Active (Show on website)
//           </label>
//         </div>

//         {/* IMAGE */}
//         <div>
//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-20 h-20 rounded-full object-cover mb-3"
//             />
//           )}

//           <input
//             type="file"
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//               setPreview(URL.createObjectURL(e.target.files[0]));
//             }}
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           disabled={creating || updating}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition"
//         >
//           {creating || updating
//             ? "Saving..."
//             : id
//             ? "Update Testimonial"
//             : "Create Testimonial"}
//         </button>

//       </form>
//     </div>
//   );
// }


import React from 'react'

const AdminTestimonialForm = () => {
  return (
    <div>
      dd
    </div>
  )
}

export default AdminTestimonialForm
