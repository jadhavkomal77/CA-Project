
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   X,
//   FileText,
//   Image as ImageIcon,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   ArrowLeft,
//   FileCheck,
//   Trash2,
// } from "lucide-react";

// export default function ApplyService() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading } = useGetPublicServiceBySlugQuery(slug);
//   const service = data?.data || data;

//   const [createApplication, { isLoading: submitting }] =
//     useCreateApplicationMutation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [files, setFiles] = useState({});
//   const [preview, setPreview] = useState(null);
//   const [errors, setErrors] = useState({});

//   /* INPUT */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   /* VALIDATION */
//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = "Name is required";
//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!form.phone.trim()) {
//       newErrors.phone = "Phone is required";
//     } else if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) {
//       newErrors.phone = "Invalid phone number";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* FILE SELECT */
//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);

//     const valid = selected.filter((file) => {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error(`${file.name} is too large (max 10MB)`);
//         return false;
//       }
//       return true;
//     });

//     setFiles((prev) => ({
//       ...prev,
//       [doc]: [...(prev[doc] || []), ...valid],
//     }));
//   };

//   /* DRAG DROP */
//   const handleDrop = (doc, e) => {
//     e.preventDefault();
//     handleFile(doc, { target: { files: e.dataTransfer.files } });
//   };

//   /* REMOVE FILE */
//   const removeFile = (doc, index) => {
//     const copy = { ...files };
//     copy[doc].splice(index, 1);
//     if (copy[doc].length === 0) delete copy[doc];
//     setFiles(copy);
//   };

//   /* FILE ICON */
//   const getFileIcon = (name) => {
//     const ext = name.split(".").pop().toLowerCase();
//     if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext))
//       return <ImageIcon size={20} className="text-blue-600" />;
//     if (ext === "pdf")
//       return <FileText size={20} className="text-red-600" />;
//     return <FileCheck size={20} className="text-gray-600" />;
//   };

//   /* FORMAT FILE SIZE */
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
//   };

//   /* SUBMIT */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     if (!service?._id) {
//       toast.error("Service information is missing");
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("userDetails", JSON.stringify(form));
//       fd.append("serviceId", service._id);

//       Object.keys(files).forEach((doc) => {
//         files[doc].forEach((file) => {
//           fd.append("documents", file);
//         });
//       });

//       await createApplication(fd).unwrap();

//       toast.success("Application Submitted Successfully! 🎉");
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (err) {
//       toast.error(err?.data?.message || "Submission failed. Please try again.");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-700 mb-4" />
//           <p className="text-lg text-gray-600">Loading service details...</p>
//         </div>
//       </div>
//     );

//   if (!service)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
//         <div className="text-center">
//           <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Service Not Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             The service you're looking for doesn't exist.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Go Back Home
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors duration-200"
//         >
//           <ArrowLeft size={20} />
//           <span className="font-medium">Back</span>
//         </button>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 md:p-10 text-white">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
//               <FileCheck size={32} />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Apply for {service.title}
//               </h1>
//               <p className="text-blue-100 text-sm md:text-base">
//                 Complete the form below to submit your application
//               </p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* USER INFO SECTION */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <User size={24} className="text-blue-700" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Personal Information
//               </h2>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <User
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                       errors.name ? "border-red-300" : "border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} />
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Mail
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="your.email@example.com"
//                     className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                       errors.email ? "border-red-300" : "border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} />
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Phone
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     placeholder="10-digit phone number"
//                     maxLength="10"
//                     className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                       errors.phone ? "border-red-300" : "border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} />
//                     {errors.phone}
//                   </p>
//                 )}
//               </div>

//               {/* Address */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Address <span className="text-gray-400 text-xs">(Optional)</span>
//                 </label>
//                 <div className="relative">
//                   <MapPin
//                     className="absolute left-3 top-3 text-gray-400"
//                     size={20}
//                   />
//                   <textarea
//                     name="address"
//                     value={form.address}
//                     onChange={handleChange}
//                     placeholder="Enter your address"
//                     rows="3"
//                     className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DOCUMENTS SECTION */}
//           {service.requiredDocuments?.length > 0 && (
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-indigo-100 rounded-lg">
//                   <Upload size={24} className="text-indigo-700" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Required Documents
//                 </h2>
//               </div>

//               <div className="space-y-6">
//                 {service.requiredDocuments.map((doc, idx) => (
//                   <div
//                     key={idx}
//                     className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-200"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <FileText size={20} className="text-blue-700" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-900">{doc}</p>
//                           <p className="text-xs text-gray-500">
//                             Max file size: 10MB
//                           </p>
//                         </div>
//                       </div>
//                       {files[doc]?.length > 0 && (
//                         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                           {files[doc].length} file{files[doc].length > 1 ? "s" : ""}
//                         </span>
//                       )}
//                     </div>

//                     {/* DROP ZONE */}
//                     <div
//                       onDrop={(e) => handleDrop(doc, e)}
//                       onDragOver={(e) => e.preventDefault()}
//                       className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 group"
//                     >
//                       <input
//                         type="file"
//                         multiple
//                         hidden
//                         id={doc}
//                         onChange={(e) => handleFile(doc, e)}
//                         accept=".pdf,.jpg,.jpeg,.png,.webp"
//                       />
//                       <label
//                         htmlFor={doc}
//                         className="cursor-pointer flex flex-col items-center gap-3"
//                       >
//                         <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
//                           <Upload
//                             size={32}
//                             className="text-blue-700 group-hover:scale-110 transition-transform"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-gray-700 font-medium mb-1">
//                             Drag & Drop files here
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             or{" "}
//                             <span className="text-blue-700 font-semibold">
//                               click to browse
//                             </span>
//                           </p>
//                           <p className="text-xs text-gray-400 mt-2">
//                             Supports PDF, JPG, PNG, WEBP
//                           </p>
//                         </div>
//                       </label>
//                     </div>

//                     {/* FILE LIST */}
//                     {files[doc]?.length > 0 && (
//                       <div className="mt-4 space-y-2">
//                         {files[doc].map((file, i) => (
//                           <div
//                             key={i}
//                             className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition-colors"
//                           >
//                             <div className="flex items-center gap-3 flex-1 min-w-0">
//                               {getFileIcon(file.name)}
//                               <div className="flex-1 min-w-0">
//                                 <p
//                                   className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-blue-700"
//                                   onClick={() =>
//                                     file.type.startsWith("image/")
//                                       ? setPreview(URL.createObjectURL(file))
//                                       : null
//                                   }
//                                 >
//                                   {file.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeFile(doc, i)}
//                               className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
//                               title="Remove file"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* SUBMIT BUTTON */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="animate-spin" size={20} />
//                   <span>Submitting Application...</span>
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle size={20} />
//                   <span>Submit Application</span>
//                 </>
//               )}
//             </button>

//             <p className="text-center text-sm text-gray-500 mt-4">
//               By submitting, you agree to our terms and conditions
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* PREVIEW MODAL */}
//       {preview && (
//         <div
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
//           onClick={() => setPreview(null)}
//         >
//           <div className="relative max-w-4xl max-h-[90vh]">
//             <button
//               onClick={() => setPreview(null)}
//               className="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
//             >
//               <X size={24} />
//             </button>
//             <img
//               src={preview}
//               alt="Preview"
//               className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   X,
//   FileText,
//   Image as ImageIcon,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   ArrowLeft,
//   FileCheck,
//   Trash2,
// } from "lucide-react";

// export default function ApplyService() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading } = useGetPublicServiceBySlugQuery(slug);
//   const service = data?.data || data;

//   const [createApplication, { isLoading: submitting }] =
//     useCreateApplicationMutation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [files, setFiles] = useState({});
//   const [preview, setPreview] = useState(null);
//   const [errors, setErrors] = useState({});

//   /* INPUT */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   /* VALIDATION */
//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = "Name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       newErrors.email = "Invalid email";
//     if (!form.phone.trim()) newErrors.phone = "Phone required";
//     else if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "")))
//       newErrors.phone = "Invalid phone";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* FILE */
//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);
//     const valid = selected.filter((file) => {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error(`${file.name} too large (max 10MB)`);
//         return false;
//       }
//       return true;
//     });

//     setFiles((prev) => ({
//       ...prev,
//       [doc]: [...(prev[doc] || []), ...valid],
//     }));
//   };

//   const handleDrop = (doc, e) => {
//     e.preventDefault();
//     handleFile(doc, { target: { files: e.dataTransfer.files } });
//   };

//   const removeFile = (doc, index) => {
//     const copy = { ...files };
//     copy[doc].splice(index, 1);
//     if (!copy[doc].length) delete copy[doc];
//     setFiles(copy);
//   };

//   const getFileIcon = (name) => {
//     const ext = name.split(".").pop().toLowerCase();
//     if (["png", "jpg", "jpeg", "webp"].includes(ext))
//       return <ImageIcon size={16} className="text-blue-600" />;
//     if (ext === "pdf") return <FileText size={16} className="text-red-600" />;
//     return <FileCheck size={16} className="text-gray-600" />;
//   };

//   /* SUBMIT */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return toast.error("Fix errors first");

//     try {
//       const fd = new FormData();
//       fd.append("userDetails", JSON.stringify(form));
//       fd.append("serviceId", service._id);

//       Object.keys(files).forEach((doc) =>
//         files[doc].forEach((f) => fd.append("documents", f))
//       );

//       await createApplication(fd).unwrap();
//       toast.success("Application Submitted 🎉");
//       setTimeout(() => navigate("/"), 1500);
//     } catch {
//       toast.error("Submission failed");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin text-blue-700" size={40} />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-6 px-3">
//       <div className="max-w-3xl mx-auto space-y-5">

//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-1 text-gray-600 hover:text-blue-700 text-sm">
//           <ArrowLeft size={16}/> Back
//         </button>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg shadow p-5 text-white">
//           <h1 className="text-2xl font-bold">Apply For {service.title}</h1>
//           <p className="text-blue-100 text-xs mt-1">
//             Fill Details And Upload Documents
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* PERSONAL */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

//             <div className="grid md:grid-cols-2 gap-4">

//               <Input icon={<User size={16}/>} name="name" value={form.name} onChange={handleChange} placeholder="Full Name" error={errors.name}/>
//               <Input icon={<Mail size={16}/>} name="email" value={form.email} onChange={handleChange} placeholder="Email" error={errors.email}/>
//               <Input icon={<Phone size={16}/>} name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" error={errors.phone}/>

//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 text-gray-400" size={16}/>
//                 <textarea
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   rows="2"
//                   placeholder="Address"
//                   className="w-full pl-8 pr-2 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//               </div>

//             </div>
//           </div>

//           {/* DOCUMENTS */}
//           {service.requiredDocuments?.length > 0 && (
//             <div className="bg-white rounded-lg shadow p-4">
//               <h2 className="text-lg font-semibold mb-4">Required Documents</h2>

//               <div className="space-y-3">
//                 {service.requiredDocuments.map((doc, idx) => (
//                   <div key={idx} className="border rounded-md p-3">

//                     <div className="flex justify-between mb-2">
//                       <p className="text-sm font-medium">{doc}</p>
//                       {files[doc]?.length>0 &&
//                         <span className="text-[10px] bg-green-100 text-green-700 px-2 rounded-full">
//                           {files[doc].length}
//                         </span>}
//                     </div>

//                     <div
//                       onDrop={(e)=>handleDrop(doc,e)}
//                       onDragOver={(e)=>e.preventDefault()}
//                       className="border border-dashed rounded-md py-3 text-center hover:bg-blue-50 cursor-pointer">

//                       <input hidden id={doc} type="file" multiple onChange={(e)=>handleFile(doc,e)}/>
//                       <label htmlFor={doc} className="cursor-pointer">
//                         <Upload size={18} className="mx-auto text-blue-700 mb-1"/>
//                         <p className="text-xs font-medium">Upload Files</p>
//                         <p className="text-[10px] text-gray-400">Max 10MB</p>
//                       </label>
//                     </div>

//                     {files[doc]?.length>0 && (
//                       <div className="mt-2 space-y-1">
//                         {files[doc].map((file,i)=>(
//                           <div key={i} className="flex justify-between items-center border rounded px-2 py-1.5 text-xs">
//                             <div className="flex items-center gap-2 truncate">
//                               {getFileIcon(file.name)}
//                               {file.name}
//                             </div>
//                             <button type="button" onClick={()=>removeFile(doc,i)}>
//                               <Trash2 size={14} className="text-red-600"/>
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* SUBMIT */}
//           <button
//             disabled={submitting}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold flex justify-center gap-2">

//             {submitting
//               ? <Loader2 className="animate-spin" size={18}/>
//               : <CheckCircle size={18}/>}

//             {submitting ? "Submitting..." : "Submit Application"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* INPUT COMPONENT */
// function Input({icon,name,value,onChange,placeholder,error}) {
//   return (
//     <div>
//       <div className="relative">
//         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//           {icon}
//         </div>
//         <input
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full pl-8 pr-2 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 ${
//             error ? "border-red-400" : ""
//           }`}
//         />
//       </div>
//       {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
//     </div>
//   );
// }


// ************


// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   FileText,
//   Image as ImageIcon,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   CheckCircle,
//   Loader2,
//   ArrowLeft,
//   FileCheck,
//   Trash2,
// } from "lucide-react";

// export default function ApplyService() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading } = useGetPublicServiceBySlugQuery(slug);
//   const service = data?.data || data;

//   const [createApplication, { isLoading: submitting }] =
//     useCreateApplicationMutation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [files, setFiles] = useState({});
//   const [dragging, setDragging] = useState(null);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);
//     setFiles((p) => ({ ...p, [doc]: [...(p[doc] || []), ...selected] }));
//   };

//   const removeFile = (doc, i) => {
//     const copy = { ...files };
//     copy[doc].splice(i, 1);
//     if (!copy[doc].length) delete copy[doc];
//     setFiles(copy);
//   };

//   const getIcon = (name) => {
//     const ext = name.split(".").pop();
//     if (["jpg","png","jpeg","webp"].includes(ext))
//       return <ImageIcon size={14} className="text-blue-600"/>;
//     if (ext==="pdf")
//       return <FileText size={14} className="text-red-600"/>;
//     return <FileCheck size={14}/>;
//   };

//   const submit = async(e)=>{
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("userDetails", JSON.stringify(form));
//     fd.append("serviceId", service._id);

//     Object.keys(files).forEach(k =>
//       files[k].forEach(f=> fd.append("documents", f))
//     );

//     await createApplication(fd);
//     toast.success("Submitted Successfully 🎉");
//     navigate("/");
//   };

//   if(isLoading)
//     return(
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 className="animate-spin text-blue-700" size={45}/>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">

//       <div className="max-w-4xl mx-auto space-y-7">

//         {/* BACK */}
//         <button
//           onClick={()=>navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition">
//           <ArrowLeft size={18}/> Back
//         </button>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-700 text-white rounded-2xl shadow-2xl p-7">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Apply For {service.title}
//           </h1>
//           <p className="text-sm text-blue-100 mt-1">
//             Fill Details & Upload Required Documents
//           </p>
//         </div>

//         <form onSubmit={submit} className="space-y-7">

//           {/* PERSONAL INFO */}
//           <GlassCard title="Personal Information">

//             <div className="grid md:grid-cols-2 gap-5">

//               <Input icon={<User size={16}/>} name="name" value={form.name} onChange={handleChange} placeholder="Full Name"/>
//               <Input icon={<Mail size={16}/>} name="email" value={form.email} onChange={handleChange} placeholder="Email Address"/>
//               <Input icon={<Phone size={16}/>} name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number"/>

//               <div className="relative">
//                 <MapPin size={16} className="absolute left-3 top-3 text-gray-400"/>
//                 <textarea
//                   rows="2"
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   placeholder="Address"
//                   className="w-full pl-8 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
//                 />
//               </div>

//             </div>
//           </GlassCard>


//           {/* DOCUMENTS */}
//           {service.requiredDocuments?.length>0 && (
//             <GlassCard title="Required Documents">

//               <div className="grid md:grid-cols-2 gap-4">

//                 {service.requiredDocuments.map((doc,i)=>(
//                   <div key={i} className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl p-3 shadow-sm hover:shadow-md transition">

//                     <p className="text-xs font-semibold mb-2">{doc}</p>

//                     <div
//                       onDragOver={e=>{e.preventDefault(); setDragging(doc)}}
//                       onDragLeave={()=>setDragging(null)}
//                       onDrop={e=>{
//                         e.preventDefault();
//                         handleFile(doc,{target:{files:e.dataTransfer.files}});
//                         setDragging(null);
//                       }}
//                       className={`border-2 border-dashed rounded-lg py-4 text-center cursor-pointer transition
//                       ${dragging===doc ? "bg-blue-100 border-blue-500" : "hover:bg-blue-50 border-gray-300"}`}>

//                       <input hidden id={doc} type="file" multiple onChange={e=>handleFile(doc,e)}/>

//                       <label htmlFor={doc} className="cursor-pointer">
//                         <Upload size={18} className="mx-auto text-blue-700 mb-1"/>
//                         <p className="text-xs font-medium">Upload Files</p>
//                         <p className="text-[10px] text-gray-400">Max 10MB</p>
//                       </label>
//                     </div>

//                     {files[doc]?.length>0 && (
//                       <div className="mt-2 space-y-1">
//                         {files[doc].map((f,idx)=>(
//                           <div key={idx}
//                             className="flex justify-between items-center text-xs bg-white border rounded-md px-2 py-1">

//                             <div className="flex gap-1 truncate items-center">
//                               {getIcon(f.name)}
//                               {f.name}
//                             </div>

//                             <Trash2
//                               size={13}
//                               className="text-red-500 cursor-pointer"
//                               onClick={()=>removeFile(doc,idx)}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                   </div>
//                 ))}

//               </div>
//             </GlassCard>
//           )}

//           {/* SUBMIT */}
//           <button
//             disabled={submitting}
//             className="w-full py-3 rounded-xl font-semibold text-white
//             bg-gradient-to-r from-blue-600 to-indigo-700
//             hover:scale-[1.02] active:scale-[0.98]
//             shadow-lg hover:shadow-xl transition flex justify-center gap-2">

//             {submitting
//               ? <Loader2 className="animate-spin" size={18}/>
//               : <CheckCircle size={18}/>}

//             {submitting ? "Submitting..." : "Submit Application"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* reusable glass card */
// function GlassCard({title,children}){
//   return(
//     <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-6">
//       <h2 className="text-lg font-semibold mb-5">{title}</h2>
//       {children}
//     </div>
//   )
// }

// /* input */
// function Input({icon,name,value,onChange,placeholder}){
//   return(
//     <div className="relative">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//         {icon}
//       </div>
//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full pl-8 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
//       />
//     </div>
//   )
// }
 
// ****************



import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
import { toast } from "react-toastify";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Loader2,
  ArrowLeft,
  FileCheck,
  Trash2,
  AlertCircle,
  X,
} from "lucide-react";

export default function ApplyService() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPublicServiceBySlugQuery(slug);
  const service = data?.data || data;

  const [createApplication, { isLoading: submitting }] =
    useCreateApplicationMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) {
      e.phone = "Invalid phone number (10 digits)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (doc, e) => {
    const selected = Array.from(e.target.files);

    const valid = selected.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    setFiles((prev) => ({
      ...prev,
      [doc]: [...(prev[doc] || []), ...valid],
    }));
  };

  const handleDrop = (doc, e) => {
    e.preventDefault();
    handleFile(doc, { target: { files: e.dataTransfer.files } });
  };

  const removeFile = (doc, i) => {
    const copy = { ...files };
    copy[doc].splice(i, 1);
    if (!copy[doc].length) delete copy[doc];
    setFiles(copy);
  };

  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "png", "jpeg", "webp", "gif"].includes(ext))
      return <ImageIcon size={16} className="text-blue-600" />;
    if (ext === "pdf") return <FileText size={16} className="text-red-600" />;
    return <FileCheck size={16} className="text-gray-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!service?._id) {
      toast.error("Service information is missing");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("userDetails", JSON.stringify(form));
      fd.append("serviceId", service._id);

      Object.keys(files).forEach((doc) =>
        files[doc].forEach((f) => fd.append("documents", f))
      );

      await createApplication(fd).unwrap();
      toast.success("Application Submitted Successfully! 🎉");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err?.data?.message || "Submission failed. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-700 mx-auto mb-4" size={40} />
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );

  if (!service)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold text-sm"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors text-sm"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* HEADER CARD - Compact */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl shadow-lg p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
              <p className="text-blue-100 text-xs mt-0.5">
                Complete the form below to submit your application
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PERSONAL INFORMATION CARD - Compact */}
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User size={18} className="text-blue-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                icon={<User size={18} />}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                label="Full Name"
                required
                error={errors.name}
              />

              <Input
                icon={<Mail size={18} />}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                label="Email Address"
                required
                error={errors.email}
              />

              <Input
                icon={<Phone size={18} />}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                label="Phone Number"
                required
                maxLength="10"
                error={errors.phone}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Address <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    rows="2"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DOCUMENTS SECTION - Compact */}
          {service.requiredDocuments?.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Upload size={18} className="text-indigo-700" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Required Documents</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {service.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all bg-white"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded">
                          <FileText size={14} className="text-blue-700" />
                        </div>
                        <p className="font-semibold text-sm text-gray-900">{doc}</p>
                      </div>
                      {files[doc]?.length > 0 && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {files[doc].length}
                        </span>
                      )}
                    </div>

                    {/* DROP ZONE - Compact */}
                    <div
                      onDrop={(e) => handleDrop(doc, e)}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
                    >
                      <input
                        hidden
                        id={doc}
                        type="file"
                        multiple
                        onChange={(e) => handleFile(doc, e)}
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                      />
                      <label htmlFor={doc} className="cursor-pointer flex flex-col items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Upload size={20} className="text-blue-700" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Click to Upload</p>
                        <p className="text-[10px] text-gray-400">Max 10MB</p>
                      </label>
                    </div>

                    {/* FILE LIST - Compact */}
                    {files[doc]?.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {files[doc].map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-200 text-xs group"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {getFileIcon(f.name)}
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-medium text-gray-900 truncate cursor-pointer hover:text-blue-700"
                                  onClick={() =>
                                    f.type.startsWith("image/")
                                      ? setPreview(URL.createObjectURL(f))
                                      : null
                                  }
                                >
                                  {f.name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  {formatFileSize(f.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(doc, i)}
                              className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON - Compact */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>Submit Application</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <AlertCircle size={12} />
              By submitting, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg z-10"
            >
              <X size={20} />
            </button>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Compact Input Component
function Input({
  icon,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  maxLength,
  error,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full pl-10 pr-3 py-2.5 text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}