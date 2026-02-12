// import { useNavigate } from "react-router-dom";
// import {
//   useDeleteTestimonialMutation,
//   useGetAdminTestimonialsQuery,
// } from "../redux/apis/testimonialApi";

// export default function AdminTestimonials() {
//   const navigate = useNavigate();
//   const { data: testimonials = [], isLoading } =
//     useGetAdminTestimonialsQuery();
//   const [deleteTestimonial] = useDeleteTestimonialMutation();

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       await deleteTestimonial(id);
//     }
//   };

//   if (isLoading)
//     return <div className="p-10 text-center">Loading...</div>;

//   if (!testimonials.length)
//     return (
//       <div className="p-10 text-center text-gray-500">
//         No testimonials found.
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Testimonials</h1>

//         <button
//           onClick={() => navigate("/admin/testimonials/new")}
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
//         >
//           + Add Testimonial
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded-xl overflow-hidden">
//         <table className="w-full text-sm">

//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4 text-left">Image</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Rating</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {testimonials.map((t) => (
//               <tr key={t._id} className="border-t hover:bg-gray-50">
//                 <td className="p-4">
//                   {t.image && (
//                     <img
//                       src={t.image}
//                       alt={t.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                   )}
//                 </td>

//                 <td className="p-4 font-medium">{t.name}</td>

//                 <td className="p-4">
//                   {"⭐".repeat(t.rating)}
//                 </td>

//                 <td className="p-4">
//                   <span
//                     className={`px-2 py-1 rounded text-xs ${
//                       t.isActive
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {t.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>

//                 <td className="p-4 flex gap-4">
//                   <button
//                     onClick={() =>
//                       navigate(`/admin/testimonials/edit/${t._id}`)
//                     }
//                     className="text-blue-600 font-medium"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(t._id)}
//                     className="text-red-500 font-medium"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const AdminTestimonials = () => {
  return (
    <div>AdminTestimonials</div>
  )
}

export default AdminTestimonials