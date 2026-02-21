// import { useState } from "react";
// import {
//   useAddTestimonialMutation,
//   useDeleteTestimonialMutation,
//   useGetTestimonialsQuery,
//   useUpdateTestimonialMutation,
// } from "../redux/apis/testimonialApi";

// export default function AdminTestimonials() {
//   const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

//   const [addTestimonial, { isLoading: adding }] =
//     useAddTestimonialMutation();

//   const [updateTestimonial, { isLoading: updating }] =
//     useUpdateTestimonialMutation();

//   const [deleteTestimonial] = useDeleteTestimonialMutation();

//   const [editingId, setEditingId] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     review: "",
//     image: "",
//     highlight: false,
//   });

//   /* IMAGE HANDLER */
//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm((p) => ({ ...p, image: reader.result }));
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   /* RESET FORM */
//   const resetForm = () => {
//     setForm({
//       name: "",
//       role: "",
//       review: "",
//       image: "",
//       highlight: false,
//     });
//     setImagePreview("");
//     setEditingId(null);
//   };

//   /* SUBMIT */
//   const handleSubmit = async () => {
//     if (!form.name || !form.role || !form.review)
//       return alert("Fill all fields");

//     try {
//       if (editingId) {
//         await updateTestimonial({ id: editingId, ...form }).unwrap();
//       } else {
//         await addTestimonial(form).unwrap();
//       }
//       resetForm();
//     } catch (err) {
//       alert(err?.data?.message || "Error occurred");
//     }
//   };

//   /* EDIT */
//   const handleEdit = (t) => {
//     setEditingId(t._id);
//     setForm(t);
//     setImagePreview(t.image);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* DELETE */
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this testimonial?")) return;
//     await deleteTestimonial(id);
//   };

//   if (isLoading)
//     return <p className="text-center mt-20 text-lg">Loading testimonials...</p>;

//   return (
//     <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold text-center text-gray-800">
//         Manage Testimonials
//       </h1>

//       {/* FORM */}
//       <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl space-y-5 border">

//         <h2 className="text-xl font-semibold text-gray-700">
//           {editingId ? "Update Testimonial" : "Add New Testimonial"}
//         </h2>

//         {/* inputs */}
//         <div className="grid md:grid-cols-2 gap-4">

//           <input
//             className="input"
//             placeholder="Client Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             className="input"
//             placeholder="Role / Profession"
//             value={form.role}
//             onChange={(e) =>
//               setForm({ ...form, role: e.target.value })
//             }
//           />
//         </div>

//         <textarea
//           className="input"
//           placeholder="Write testimonial..."
//           rows={4}
//           value={form.review}
//           onChange={(e) =>
//             setForm({ ...form, review: e.target.value })
//           }
//         />

//         {/* IMAGE */}
//         <div className="space-y-2">
//           <input type="file" onChange={handleImage} />

//           {imagePreview && (
//             <img
//               src={imagePreview}
//               className="w-24 h-24 rounded-full object-cover border shadow"
//             />
//           )}
//         </div>

//         {/* HIGHLIGHT */}
//         <label className="flex items-center gap-2 text-gray-700">
//           <input
//             type="checkbox"
//             checked={form.highlight}
//             onChange={(e) =>
//               setForm({ ...form, highlight: e.target.checked })
//             }
//           />
//           Highlight this testimonial
//         </label>

//         {/* BUTTONS */}
//         <div className="flex gap-3">
//           <button
//             disabled={adding || updating}
//             onClick={handleSubmit}
//             className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
//           >
//             {editingId
//               ? updating
//                 ? "Updating..."
//                 : "Update"
//               : adding
//               ? "Adding..."
//               : "Add"}
//           </button>

//           {editingId && (
//             <button
//               onClick={resetForm}
//               className="bg-gray-400 text-white px-6 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {testimonials.map((t) => (
//           <div
//             key={t._id}
//             className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition"
//           >
//             {t.image && (
//               <img
//                 src={t.image}
//                 className="w-16 h-16 rounded-full object-cover mb-4"
//               />
//             )}

//             <h3 className="font-bold text-lg">{t.name}</h3>
//             <p className="text-sm text-gray-500">{t.role}</p>

//             <p className="text-gray-600 mt-3 text-sm leading-relaxed">
//               {t.review}
//             </p>

//             {t.highlight && (
//               <span className="inline-block mt-3 text-xs bg-green-600 text-white px-3 py-1 rounded-full">
//                 Highlighted
//               </span>
//             )}

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={() => handleEdit(t)}
//                 className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => handleDelete(t._id)}
//                 className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import {
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
} from "../redux/apis/testimonialApi";

export default function AdminTestimonials() {

  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

  const [addTestimonial, { isLoading: adding }] =
    useAddTestimonialMutation();

  const [updateTestimonial, { isLoading: updating }] =
    useUpdateTestimonialMutation();

  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    review: "",
    highlight: false,
  });

  /* IMAGE SELECT */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* RESET */
  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      review: "",
      highlight: false,
    });
    setImageFile(null);
    setPreview("");
    setEditingId(null);
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.review)
      return alert("Fill all fields");

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("review", form.review);
      fd.append("highlight", form.highlight);

      if (imageFile) fd.append("image", imageFile);

      if (editingId)
        await updateTestimonial({ id: editingId, data: fd }).unwrap();
      else
        await addTestimonial(fd).unwrap();

      resetForm();

    } catch (err) {
      alert(err?.data?.message || "Something went wrong");
    }
  };

  /* EDIT */
  const handleEdit = (t) => {
    setEditingId(t._id);

    setForm({
      name: t.name,
      role: t.role,
      review: t.review,
      highlight: t.highlight,
    });

    setPreview(t.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete testimonial?")) return;
    await deleteTestimonial(id);
  };

  if (isLoading)
    return <p className="text-center mt-20 text-lg">Loading testimonials...</p>;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Manage Testimonials
      </h1>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border space-y-5">

        <h2 className="text-xl font-semibold">
          {editingId ? "Update Testimonial" : "Add New Testimonial"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="input"
            placeholder="Client Name"
            value={form.name}
            onChange={(e)=>
              setForm({...form,name:e.target.value})
            }
          />

          <input
            className="input"
            placeholder="Role"
            value={form.role}
            onChange={(e)=>
              setForm({...form,role:e.target.value})
            }
          />
        </div>

        <textarea
          className="input"
          rows={4}
          placeholder="Write testimonial..."
          value={form.review}
          onChange={(e)=>
            setForm({...form,review:e.target.value})
          }
        />

        {/* IMAGE */}
        <div className="space-y-2">
          <input type="file" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              className="w-24 h-24 rounded-full object-cover border shadow"
            />
          )}
        </div>

        {/* HIGHLIGHT */}
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.highlight}
            onChange={(e)=>
              setForm({...form,highlight:e.target.checked})
            }
          />
          Highlight testimonial
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {testimonials.map((t) => (
          <div key={t._id} className="bg-white p-6 rounded-xl shadow border">

            {t.image && (
              <img
                src={t.image}
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
            )}

            <h3 className="font-bold text-lg">{t.name}</h3>
            <p className="text-gray-500 text-sm">{t.role}</p>

            <p className="mt-3 text-gray-600 text-sm">{t.review}</p>

            {t.highlight && (
              <span className="inline-block mt-3 text-xs bg-green-600 text-white px-3 py-1 rounded-full">
                Highlighted
              </span>
            )}

            <div className="flex gap-3 mt-5">

              <button
                onClick={()=>handleEdit(t)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={()=>handleDelete(t._id)}
                className="flex-1 bg-red-600 text-white py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}