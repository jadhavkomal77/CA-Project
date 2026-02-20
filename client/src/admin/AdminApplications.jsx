
// import { useState } from "react";
// import {
//   useGetAllApplicationsQuery,
//   useUpdateApplicationStatusMutation,
//   useDeleteApplicationMutation,
// } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Search,
//   Filter,
//   Eye,
//   CheckCircle,
//   XCircle,
//   FileText,
//   Download,
//   Trash2,
//   X,
//   User,
//   Mail,
//   Phone,
//   Briefcase,
//   Calendar,
//   FileCheck,
// } from "lucide-react";

// export default function AdminApplications() {
//   const { data, isLoading, refetch } = useGetAllApplicationsQuery();
//   const apps = data?.data || [];

//   const [updateStatus] = useUpdateApplicationStatusMutation();
//   const [deleteApp] = useDeleteApplicationMutation();

//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [selected, setSelected] = useState(null);

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
//           <p className="text-lg text-gray-600">Loading applications...</p>
//         </div>
//       </div>
//     );

//   /* FILTER */
//   const filtered = apps.filter(
//     (a) =>
//       a.userDetails.name.toLowerCase().includes(search.toLowerCase()) &&
//       (status === "All" || a.status === status)
//   );

//   /* STATUS COLOR */
//   const getStatusBadge = (s) => {
//     switch (s) {
//       case "Approved":
//         return "bg-green-50 text-green-700 border-green-200";
//       case "Rejected":
//         return "bg-red-50 text-red-700 border-red-200";
//       default:
//         return "bg-yellow-50 text-yellow-700 border-yellow-200";
//     }
//   };

//   const getStatusIcon = (s) => {
//     switch (s) {
//       case "Approved":
//         return <CheckCircle size={16} className="text-green-600" />;
//       case "Rejected":
//         return <XCircle size={16} className="text-red-600" />;
//       default:
//         return <Clock size={16} className="text-yellow-600" />;
//     }
//   };

//   /* STATUS UPDATE */
//   const changeStatus = async (id, status) => {
//     try {
//       await updateStatus({ id, status }).unwrap();
//       toast.success(`Application ${status.toLowerCase()} successfully!`);
//       refetch();
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   /* DELETE */
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this application?")) {
//       try {
//         await deleteApp(id).unwrap();
//         toast.success("Application deleted successfully");
//         refetch();
//       } catch (error) {
//         toast.error("Failed to delete application");
//       }
//     }
//   };

//   /* DOC LABEL */
//   const getDocLabel = (name) => {
//     const n = name.toLowerCase();
//     if (n.includes("pan")) return "PAN Card";
//     if (n.includes("aadhaar") || n.includes("aadhar")) return "Aadhaar Card";
//     if (n.includes("photo")) return "Photo";
//     if (n.includes("bank")) return "Bank Proof";
//     if (n.endsWith(".pdf")) return "PDF Document";
//     return "Document";
//   };

//   const stats = [
//     {
//       label: "Total Applications",
//       value: apps.length,
//       color: "bg-blue-500",
//       icon: FileText,
//     },
//     {
//       label: "Pending",
//       value: apps.filter((a) => a.status === "Pending").length,
//       color: "bg-yellow-500",
//       icon: Clock,
//     },
//     {
//       label: "Approved",
//       value: apps.filter((a) => a.status === "Approved").length,
//       color: "bg-green-500",
//       icon: CheckCircle,
//     },
//     {
//       label: "Rejected",
//       value: apps.filter((a) => a.status === "Rejected").length,
//       color: "bg-red-500",
//       icon: XCircle,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* HEADER */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Applications Management
//               </h1>
//               <p className="text-gray-600">
//                 Manage and review all service applications
//               </p>
//             </div>
//           </div>

//           {/* STATS CARDS */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//             {stats.map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={idx}
//                   className={`${stat.color} rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <Icon size={24} className="opacity-90" />
//                     <span className="text-2xl md:text-3xl font-bold">
//                       {stat.value}
//                     </span>
//                   </div>
//                   <p className="text-sm opacity-90">{stat.label}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* SEARCH & FILTER */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div className="relative">
//               <Filter
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* APPLICATIONS TABLE */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {filtered.length === 0 ? (
//             <div className="text-center py-20">
//               <FileText size={64} className="mx-auto text-gray-300 mb-4" />
//               <p className="text-xl text-gray-600 font-semibold">
//                 No applications found
//               </p>
//               <p className="text-gray-500 mt-2">
//                 {search || status !== "All"
//                   ? "Try adjusting your filters"
//                   : "No applications submitted yet"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
//                   <tr>
//                     <th className="px-6 py-4 text-left font-semibold">Applicant</th>
//                     <th className="px-6 py-4 text-left font-semibold">Contact</th>
//                     <th className="px-6 py-4 text-left font-semibold">Service</th>
//                     <th className="px-6 py-4 text-center font-semibold">Status</th>
//                     <th className="px-6 py-4 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filtered.map((app) => (
//                     <tr
//                       key={app._id}
//                       className="hover:bg-blue-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                             <User size={20} className="text-blue-700" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900">
//                               {app.userDetails.name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {app.userDetails.email}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2 text-sm text-gray-700">
//                             <Mail size={14} />
//                             {app.userDetails.email}
//                           </div>
//                           {app.userDetails.phone && (
//                             <div className="flex items-center gap-2 text-sm text-gray-700">
//                               <Phone size={14} />
//                               {app.userDetails.phone}
//                             </div>
//                           )}
//                         </div>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Briefcase size={16} className="text-gray-400" />
//                           <span className="font-medium text-gray-900">
//                             {app.serviceName}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         <span
//                           className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border ${getStatusBadge(
//                             app.status
//                           )}`}
//                         >
//                           {getStatusIcon(app.status)}
//                           {app.status}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2 flex-wrap">
//                           <button
//                             onClick={() => setSelected(app)}
//                             className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
//                             title="View Details"
//                           >
//                             <Eye size={18} />
//                           </button>

//                           {/* RED BUTTONS FOR PENDING STATUS */}
//                           {app.status === "Pending" ? (
//                             <>
//                               <button
//                                 onClick={() => changeStatus(app._id, "Approved")}
//                                 className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
//                                 title="Approve"
//                               >
//                                 <CheckCircle size={18} />
//                               </button>

//                               <button
//                                 onClick={() => changeStatus(app._id, "Rejected")}
//                                 className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
//                                 title="Reject"
//                               >
//                                 <XCircle size={18} />
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               {app.status !== "Approved" && (
//                                 <button
//                                   onClick={() => changeStatus(app._id, "Approved")}
//                                   className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
//                                   title="Approve"
//                                 >
//                                   <CheckCircle size={18} />
//                                 </button>
//                               )}

//                               {app.status !== "Rejected" && (
//                                 <button
//                                   onClick={() => changeStatus(app._id, "Rejected")}
//                                   className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
//                                   title="Reject"
//                                 >
//                                   <XCircle size={18} />
//                                 </button>
//                               )}
//                             </>
//                           )}

//                           <a
//                             href={`${import.meta.env.VITE_BACKEND_URL}/api/applications/admin/${app._id}/pdf`}
//                             target="_blank"
//                             className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors duration-200"
//                             title="View PDF"
//                           >
//                             <FileText size={18} />
//                           </a>

//                           <button
//                             onClick={() => handleDelete(app._id)}
//                             className="p-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-lg transition-colors duration-200"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
//           <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
//             {/* MODAL HEADER */}
//             <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-6 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold">Application Details</h2>
//                 <p className="text-blue-100 text-sm mt-1">
//                   Review application information and documents
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelected(null)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* MODAL CONTENT */}
//             <div className="p-6 overflow-y-auto flex-1">
//               {/* APPLICANT INFO */}
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <User size={20} className="text-blue-700" />
//                   Applicant Information
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <InfoCard
//                     icon={<User size={18} />}
//                     label="Full Name"
//                     value={selected.userDetails.name}
//                   />
//                   <InfoCard
//                     icon={<Mail size={18} />}
//                     label="Email"
//                     value={selected.userDetails.email}
//                   />
//                   <InfoCard
//                     icon={<Phone size={18} />}
//                     label="Phone"
//                     value={selected.userDetails.phone || "Not provided"}
//                   />
//                   <InfoCard
//                     icon={<Briefcase size={18} />}
//                     label="Service"
//                     value={selected.serviceName}
//                   />
//                   <div className="md:col-span-2">
//                     <InfoCard
//                       icon={<FileCheck size={18} />}
//                       label="Status"
//                       value={
//                         <span
//                           className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(
//                             selected.status
//                           )}`}
//                         >
//                           {getStatusIcon(selected.status)}
//                           {selected.status}
//                         </span>
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* DOCUMENTS */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <FileText size={20} className="text-blue-700" />
//                   Uploaded Documents ({selected.uploadedDocuments?.length || 0})
//                 </h3>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {selected.uploadedDocuments?.map((doc) => (
//                     <div
//                       key={doc._id}
//                       className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all duration-200 bg-white shadow-sm"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <FileText size={18} className="text-blue-600" />
//                             <p className="font-semibold text-gray-900">
//                               {getDocLabel(doc.documentName)}
//                             </p>
//                           </div>
//                           <p className="text-xs text-gray-500 truncate">
//                             {doc.documentName}
//                           </p>
//                         </div>
//                         <div className="flex gap-2">
//                           <a
//                             href={doc.fileURL}
//                             target="_blank"
//                             className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
//                             title="View"
//                           >
//                             <Eye size={16} />
//                           </a>
//                           <a
//                             href={doc.fileURL}
//                             download
//                             className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
//                             title="Download"
//                           >
//                             <Download size={16} />
//                           </a>
//                         </div>
//                       </div>

//                       {/* PREVIEW */}
//                       {doc.fileURL.match(/\.(jpg|jpeg|png|webp)$/i) ? (
//                         <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
//                           <img
//                             src={doc.fileURL}
//                             alt={doc.documentName}
//                             className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
//                           />
//                         </div>
//                       ) : (
//                         <div className="mt-3 p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
//                           <FileText size={48} className="mx-auto text-gray-400 mb-2" />
//                           <p className="text-sm text-gray-600 font-medium">
//                             PDF Document
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             Click to view or download
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* MODAL FOOTER */}
//             <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4">
//               <a
//                 href={`${import.meta.env.VITE_BACKEND_URL}/api/applications/admin/${selected._id}/pdf`}
//                 target="_blank"
//                 className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
//               >
//                 <Download size={18} />
//                 Download Complete PDF
//               </a>

//               <div className="flex gap-3">
//                 {/* RED BUTTONS FOR PENDING STATUS IN MODAL */}
//                 {selected.status === "Pending" ? (
//                   <>
//                     <button
//                       onClick={() => {
//                         changeStatus(selected._id, "Approved");
//                         setSelected(null);
//                       }}
//                       className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//                     >
//                       <CheckCircle size={18} />
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => {
//                         changeStatus(selected._id, "Rejected");
//                         setSelected(null);
//                       }}
//                       className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//                     >
//                       <XCircle size={18} />
//                       Reject
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {selected.status !== "Approved" && (
//                       <button
//                         onClick={() => {
//                           changeStatus(selected._id, "Approved");
//                           setSelected(null);
//                         }}
//                         className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//                       >
//                         <CheckCircle size={18} />
//                         Approve
//                       </button>
//                     )}
//                     {selected.status !== "Rejected" && (
//                       <button
//                         onClick={() => {
//                           changeStatus(selected._id, "Rejected");
//                           setSelected(null);
//                         }}
//                         className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//                       >
//                         <XCircle size={18} />
//                         Reject
//                       </button>
//                     )}
//                   </>
//                 )}
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* INFO CARD COMPONENT */
// const InfoCard = ({ icon, label, value }) => (
//   <div className="bg-white rounded-lg p-4 border border-gray-200">
//     <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
//       {icon}
//       <span>{label}</span>
//     </div>
//     <p className="font-semibold text-gray-900 mt-1">{value || "-"}</p>
//   </div>
// );

// /* CLOCK ICON (for Pending status) */
// const Clock = ({ size }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10"></circle>
//     <polyline points="12 6 12 12 16 14"></polyline>
//   </svg>
// );



import { useState } from "react";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} from "../redux/apis/applicationApi";
import { toast } from "react-toastify";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Trash2,
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  FileCheck,
} from "lucide-react";

export default function AdminApplications() {
  const { data, isLoading, refetch } = useGetAllApplicationsQuery();
  const apps = data?.data || [];

  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateApplicationStatusMutation();

  const [deleteApp, { isLoading: deleteLoading }] =
    useDeleteApplicationMutation();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  /* LOADING */
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-blue-700 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading applications...</p>
        </div>
      </div>
    );

  /* FILTER */
  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    const name = a?.userDetails?.name?.toLowerCase() || "";
    const email = a?.userDetails?.email?.toLowerCase() || "";

    return (
      (name.includes(q) || email.includes(q)) &&
      (status === "All" || a.status === status)
    );
  });

  /* STATUS BADGE */
  const getStatusBadge = (s) => {
    if (s === "Approved") return "bg-green-50 text-green-700 border-green-200";
    if (s === "Rejected") return "bg-red-50 text-red-700 border-red-200";
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const getStatusIcon = (s) => {
    if (s === "Approved") return <CheckCircle size={16} className="text-green-600" />;
    if (s === "Rejected") return <XCircle size={16} className="text-red-600" />;
    return <Clock size={16} className="text-yellow-600" />;
  };

  /* UPDATE STATUS */
  const changeStatus = async (id, status) => {
    if (statusLoading) return;

    try {
      const res = await updateStatus({ id, status }).unwrap();
      toast.success(res?.message || `Application ${status}`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Status update failed");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (deleteLoading) return;

    if (!window.confirm("Delete this application?")) return;

    try {
      await deleteApp(id).unwrap();
      toast.success("Deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  /* DOC LABEL */
  const getDocLabel = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("pan")) return "PAN Card";
    if (n.includes("aadhaar") || n.includes("aadhar")) return "Aadhaar Card";
    if (n.includes("photo")) return "Photo";
    if (n.includes("bank")) return "Bank Proof";
    if (n.endsWith(".pdf")) return "PDF Document";
    return "Document";
  };

  /* STATS */
  const stats = [
    { label: "Total", value: apps.length, color: "bg-blue-500", icon: FileText },
    { label: "Pending", value: apps.filter(a=>a.status==="Pending").length, color:"bg-yellow-500", icon:Clock },
    { label: "Approved", value: apps.filter(a=>a.status==="Approved").length, color:"bg-green-500", icon:CheckCircle },
    { label: "Rejected", value: apps.filter(a=>a.status==="Rejected").length, color:"bg-red-500", icon:XCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900">Applications Management</h1>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat,i)=>{
              const Icon=stat.icon;
              return(
                <div key={i} className={`${stat.color} text-white rounded-xl p-4 shadow`}>
                  <div className="flex justify-between">
                    <Icon size={22}/>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm mt-2">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* SEARCH */}
          <div className="flex gap-4 mt-6 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-gray-400"/>
              <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search name or email"
                className="w-full pl-10 py-3 border rounded-xl"
              />
            </div>

            <select
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              className="border rounded-xl px-4"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {filtered.length===0 ? (
            <div className="text-center py-20 text-gray-500">No Applications Found</div>
          ):(
            <table className="w-full">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-4 text-left">Applicant</th>
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(app=>(
                  <tr key={app._id} className="border-t hover:bg-gray-50">

                    <td className="p-4">
                      <p className="font-semibold">{app.userDetails?.name}</p>
                      <p className="text-sm text-gray-500">{app.userDetails?.email}</p>
                    </td>

                    <td className="p-4">{app.serviceName}</td>

                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="p-4 text-center space-x-2">

                      <button onClick={()=>setSelected(app)} className="p-2 bg-blue-100 rounded">
                        <Eye size={16}/>
                      </button>

                      <button disabled={statusLoading} onClick={()=>changeStatus(app._id,"Approved")} className="p-2 bg-green-100 rounded">
                        <CheckCircle size={16}/>
                      </button>

                      <button disabled={statusLoading} onClick={()=>changeStatus(app._id,"Rejected")} className="p-2 bg-red-100 rounded">
                        <XCircle size={16}/>
                      </button>

                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/api/applications/admin/${app._id}/pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-indigo-100 rounded inline-block"
                      >
                        <FileText size={16}/>
                      </a>

                      <button disabled={deleteLoading} onClick={()=>handleDelete(app._id)} className="p-2 bg-gray-100 rounded">
                        <Trash2 size={16}/>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[600px]">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Application Details</h2>
              <button onClick={()=>setSelected(null)}>
                <X/>
              </button>
            </div>

            <p><b>Name:</b> {selected.userDetails?.name}</p>
            <p><b>Email:</b> {selected.userDetails?.email}</p>
            <p><b>Phone:</b> {selected.userDetails?.phone}</p>
            <p><b>Service:</b> {selected.serviceName}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Documents</h3>

              {selected.uploadedDocuments?.map(doc=>(
                <div key={doc._id} className="flex justify-between border p-2 rounded mb-2">
                  <span>{getDocLabel(doc.documentName)}</span>
                  <div className="flex gap-2">
                    <a href={doc.fileURL} target="_blank" rel="noopener noreferrer"><Eye size={16}/></a>
                    <a href={doc.fileURL} download><Download size={16}/></a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* CLOCK ICON */
const Clock = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);