
// import { useState, useMemo } from "react";
// import {
//   useGetAllApplicationsQuery,
//   useUpdateApplicationStatusMutation,
//   useDeleteApplicationMutation,
//   useGeneratePDFMutation
// } from "../redux/apis/applicationApi";

// import { toast } from "react-toastify";
// import {
//   Search,
//   Eye,
//   CheckCircle,
//   XCircle,
//   FileText,
//   Trash2,
//   X,
//   Download
// } from "lucide-react";

// /* ================= CONFIG ================= */

// const STATUS_OPTIONS = ["All","Pending","Approved","Rejected"];

// const STATUS_STYLE = {
//   Pending:"bg-yellow-100 text-yellow-700",
//   Approved:"bg-green-100 text-green-700",
//   Rejected:"bg-red-100 text-red-700"
// };


// /* ================= MAIN COMPONENT ================= */

// export default function AdminApplications(){

//   const { data, isLoading, refetch } = useGetAllApplicationsQuery();
//   const apps = data?.data ?? [];

//   const [updateStatus] = useUpdateApplicationStatusMutation();
//   const [deleteApp] = useDeleteApplicationMutation();
//   const [generatePDF] = useGeneratePDFMutation();

//   const [search,setSearch] = useState("");
//   const [status,setStatus] = useState("All");
//   const [selected,setSelected] = useState(null);
//   const [previewPDF,setPreviewPDF] = useState(null);


//   /* ================= FILTER ================= */

//   const filtered = useMemo(()=>{
//     const q = search.toLowerCase();

//     return apps.filter(a=>{
//       const name = a?.userDetails?.name?.toLowerCase() || "";
//       const email = a?.userDetails?.email?.toLowerCase() || "";

//       const matchSearch = name.includes(q) || email.includes(q);
//       const matchStatus = status==="All" || a.status===status;

//       return matchSearch && matchStatus;
//     });

//   },[apps,search,status]);


//   /* ================= ACTIONS ================= */

//   const changeStatus = async(id,newStatus)=>{
//     try{
//       await updateStatus({id,status:newStatus}).unwrap();

//       /* AUTO PDF WHEN APPROVED */
//       if(newStatus==="Approved"){
//         const res = await generatePDF(id).unwrap();
//         toast.success("Approved + PDF Generated");
//         window.open(res.pdfUrl);
//       }else{
//         toast.success(`Status → ${newStatus}`);
//       }

//       refetch();
//     }catch(err){
//       toast.error(err?.data?.message || "Action failed");
//     }
//   };


//   const handleDelete = async(id)=>{
//     if(!window.confirm("Delete application?")) return;

//     try{
//       await deleteApp(id).unwrap();
//       toast.success("Application deleted");
//       refetch();
//     }catch{
//       toast.error("Delete failed");
//     }
//   };


//   const downloadPDF = (url)=>{
//     const link=document.createElement("a");
//     link.href=url.replace("/upload/","/upload/fl_attachment/");
//     link.target="_blank";
//     link.click();
//   };


//   /* ================= UI ================= */

//   if(isLoading)
//     return <div className="p-10 text-center text-lg">Loading applications...</div>;


//   return(
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="bg-white p-6 rounded-xl shadow">

//         <h1 className="text-2xl font-bold mb-4">Applications</h1>

//         <div className="flex gap-4">

//           <div className="relative w-full">
//             <Search size={16} className="absolute left-3 top-3 text-gray-400"/>
//             <input
//               value={search}
//               onChange={e=>setSearch(e.target.value)}
//               placeholder="Search name or email"
//               className="border pl-10 p-2 rounded w-full"
//             />
//           </div>

//           <select
//             value={status}
//             onChange={e=>setStatus(e.target.value)}
//             className="border p-2 rounded"
//           >
//             {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
//           </select>

//         </div>
//       </div>



//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-blue-800 text-white">
//             <tr>
//               <th className="p-4 text-left">Applicant</th>
//               <th className="p-4 text-left">Service</th>
//               <th className="p-4 text-center">Status</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filtered.map(app=>{

//               const statusStyle = STATUS_STYLE[app.status] || "bg-gray-100";

//               return(
//                 <tr key={app._id} className="border-t hover:bg-gray-50">

//                   <td className="p-4">
//                     <p className="font-semibold">{app.userDetails?.name}</p>
//                     <p className="text-sm text-gray-500">{app.userDetails?.email}</p>
//                   </td>

//                   <td className="p-4">{app.serviceName}</td>

//                   <td className="p-4 text-center">
//                     <span className={`px-3 py-1 text-xs rounded-full ${statusStyle}`}>
//                       {app.status}
//                     </span>
//                   </td>


//                   {/* ACTION BUTTONS */}
//                   <td className="p-4 text-center flex justify-center gap-2">

//                     {/* VIEW */}
//                     <IconBtn onClick={()=>setSelected(app)} color="bg-blue-100">
//                       <Eye size={16}/>
//                     </IconBtn>


//                     {/* APPROVE */}
//                     {app.status!=="Approved" && (
//                       <IconBtn onClick={()=>changeStatus(app._id,"Approved")} color="bg-green-100">
//                         <CheckCircle size={16}/>
//                       </IconBtn>
//                     )}

//                     {/* REJECT */}
//                     {app.status!=="Rejected" && (
//                       <IconBtn onClick={()=>changeStatus(app._id,"Rejected")} color="bg-red-100">
//                         <XCircle size={16}/>
//                       </IconBtn>
//                     )}


//                     {/* PDF */}
//                     {!app.pdfUrl ? (

//                       <IconBtn onClick={()=>changeStatus(app._id,"Approved")} color="bg-indigo-100">
//                         <FileText size={16}/>
//                       </IconBtn>

//                     ):(

//                       <>
//                         <IconBtn onClick={()=>setPreviewPDF(app.pdfUrl)} color="bg-indigo-200">
//                           <Eye size={16}/>
//                         </IconBtn>

//                         <IconBtn onClick={()=>downloadPDF(app.pdfUrl)} color="bg-indigo-300">
//                           <Download size={16}/>
//                         </IconBtn>
//                       </>
//                     )}


//                     {/* DELETE */}
//                     <IconBtn onClick={()=>handleDelete(app._id)} color="bg-gray-100">
//                       <Trash2 size={16}/>
//                     </IconBtn>

//                   </td>
//                 </tr>
//               );
//             })}

//           </tbody>
//         </table>

//       </div>



//       {/* DETAILS MODAL */}
//       {selected && (
//         <Modal onClose={()=>setSelected(null)}>
//           <h2 className="text-lg font-bold mb-3">Application Details</h2>

//           <p><b>Name:</b> {selected.userDetails?.name}</p>
//           <p><b>Email:</b> {selected.userDetails?.email}</p>
//           <p><b>Phone:</b> {selected.userDetails?.phone}</p>
//           <p><b>Service:</b> {selected.serviceName}</p>
//           <p><b>Status:</b> {selected.status}</p>
//         </Modal>
//       )}

//       {/* PDF PREVIEW MODAL */}
//       {previewPDF && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

//           <div className="bg-white w-[90%] h-[90%] rounded-xl relative">

//             <button
//               onClick={()=>setPreviewPDF(null)}
//               className="absolute right-4 top-4 text-gray-600"
//             >
//               <X size={22}/>
//             </button>

//             <iframe src={previewPDF} className="w-full h-full rounded-xl"/>
//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// const IconBtn = ({children,onClick,color})=>(
//   <button
//     onClick={onClick}
//     className={`p-2 rounded ${color} hover:scale-105 transition`}
//   >
//     {children}
//   </button>
// );


// const Modal = ({children,onClose})=>(
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//     <div className="bg-white p-6 rounded-xl w-[500px] relative">

//       <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
//         <X/>
//       </button>

//       {children}

//     </div>
//   </div>
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
      toast.success("Deleted successfully✅");
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