

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
//   AlertCircle,
//   X,
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
//   const [errors, setErrors] = useState({});
//   const [preview, setPreview] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Name is required";
//     if (!form.email.trim()) {
//       e.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       e.email = "Invalid email format";
//     }
//     if (!form.phone.trim()) {
//       e.phone = "Phone is required";
//     } else if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) {
//       e.phone = "Invalid phone number (10 digits)";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

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

//   const handleDrop = (doc, e) => {
//     e.preventDefault();
//     handleFile(doc, { target: { files: e.dataTransfer.files } });
//   };

//   const removeFile = (doc, i) => {
//     const copy = { ...files };
//     copy[doc].splice(i, 1);
//     if (!copy[doc].length) delete copy[doc];
//     setFiles(copy);
//   };

//   const getFileIcon = (name) => {
//     const ext = name.split(".").pop().toLowerCase();
//     if (["jpg", "png", "jpeg", "webp", "gif"].includes(ext))
//       return <ImageIcon size={16} className="text-blue-600" />;
//     if (ext === "pdf") return <FileText size={16} className="text-red-600" />;
//     return <FileCheck size={16} className="text-gray-600" />;
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
//   };

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

//       Object.keys(files).forEach((doc) =>
//         files[doc].forEach((f) => fd.append("documents", f))
//       );

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
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-50">
//         <div className="text-center">
//           <Loader2 className="animate-spin text-blue-700 mx-auto mb-4" size={40} />
//           <p className="text-gray-600">Loading service details...</p>
//         </div>
//       </div>
//     );

//   if (!service)
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-50">
//         <div className="text-center">
//           <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Service Not Found</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold text-sm"
//           >
//             Go Back Home
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-6 px-4">
//       <div className="max-w-4xl mx-auto space-y-4">
//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors text-sm"
//         >
//           <ArrowLeft size={18} />
//           <span>Back</span>
//         </button>

//         {/* HEADER CARD - Compact */}
//         <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl shadow-lg p-5 text-white">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white/20 rounded-lg">
//               <FileCheck size={24} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
//               <p className="text-blue-100 text-xs mt-0.5">
//                 Complete the form below to submit your application
//               </p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* PERSONAL INFORMATION CARD - Compact */}
//           <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//             <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <User size={18} className="text-blue-700" />
//               </div>
//               <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 icon={<User size={18} />}
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 label="Full Name"
//                 required
//                 error={errors.name}
//               />

//               <Input
//                 icon={<Mail size={18} />}
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="your.email@example.com"
//                 label="Email Address"
//                 required
//                 error={errors.email}
//               />

//               <Input
//                 icon={<Phone size={18} />}
//                 name="phone"
//                 type="tel"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="10-digit phone number"
//                 label="Phone Number"
//                 required
//                 maxLength="10"
//                 error={errors.phone}
//               />

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Address <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <textarea
//                     rows="2"
//                     name="address"
//                     value={form.address}
//                     onChange={handleChange}
//                     placeholder="Enter your complete address"
//                     className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DOCUMENTS SECTION - Compact */}
//           {service.requiredDocuments?.length > 0 && (
//             <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//               <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
//                 <div className="p-2 bg-indigo-100 rounded-lg">
//                   <Upload size={18} className="text-indigo-700" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-900">Required Documents</h2>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {service.requiredDocuments.map((doc, idx) => (
//                   <div
//                     key={idx}
//                     className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all bg-white"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-2">
//                         <div className="p-1.5 bg-blue-100 rounded">
//                           <FileText size={14} className="text-blue-700" />
//                         </div>
//                         <p className="font-semibold text-sm text-gray-900">{doc}</p>
//                       </div>
//                       {files[doc]?.length > 0 && (
//                         <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                           {files[doc].length}
//                         </span>
//                       )}
//                     </div>

//                     {/* DROP ZONE - Compact */}
//                     <div
//                       onDrop={(e) => handleDrop(doc, e)}
//                       onDragOver={(e) => e.preventDefault()}
//                       className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
//                     >
//                       <input
//                         hidden
//                         id={doc}
//                         type="file"
//                         multiple
//                         onChange={(e) => handleFile(doc, e)}
//                         accept=".pdf,.jpg,.jpeg,.png,.webp"
//                       />
//                       <label htmlFor={doc} className="cursor-pointer flex flex-col items-center gap-2">
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <Upload size={20} className="text-blue-700" />
//                         </div>
//                         <p className="text-xs font-medium text-gray-700">Click to Upload</p>
//                         <p className="text-[10px] text-gray-400">Max 10MB</p>
//                       </label>
//                     </div>

//                     {/* FILE LIST - Compact */}
//                     {files[doc]?.length > 0 && (
//                       <div className="mt-3 space-y-1.5">
//                         {files[doc].map((f, i) => (
//                           <div
//                             key={i}
//                             className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-200 text-xs group"
//                           >
//                             <div className="flex items-center gap-2 flex-1 min-w-0">
//                               {getFileIcon(f.name)}
//                               <div className="flex-1 min-w-0">
//                                 <p
//                                   className="font-medium text-gray-900 truncate cursor-pointer hover:text-blue-700"
//                                   onClick={() =>
//                                     f.type.startsWith("image/")
//                                       ? setPreview(URL.createObjectURL(f))
//                                       : null
//                                   }
//                                 >
//                                   {f.name}
//                                 </p>
//                                 <p className="text-[10px] text-gray-500">
//                                   {formatFileSize(f.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeFile(doc, i)}
//                               className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors opacity-0 group-hover:opacity-100"
//                             >
//                               <Trash2 size={14} />
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

//           {/* SUBMIT BUTTON - Compact */}
//           <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="animate-spin" size={18} />
//                   <span>Submitting...</span>
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle size={18} />
//                   <span>Submit Application</span>
//                 </>
//               )}
//             </button>

//             <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
//               <AlertCircle size={12} />
//               By submitting, you agree to our terms and conditions
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* PREVIEW MODAL */}
//       {preview && (
//         <div
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//           onClick={() => setPreview(null)}
//         >
//           <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
//             <button
//               onClick={() => setPreview(null)}
//               className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg z-10"
//             >
//               <X size={20} />
//             </button>
//             <img
//               src={preview}
//               alt="Preview"
//               className="max-w-full max-h-[90vh] object-contain"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Compact Input Component
// function Input({
//   icon,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   label,
//   required = false,
//   maxLength,
//   error,
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <div className="relative">
//         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//           {icon}
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           maxLength={maxLength}
//           className={`w-full pl-10 pr-3 py-2.5 text-sm border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//             error
//               ? "border-red-300 bg-red-50"
//               : "border-gray-300 hover:border-gray-400"
//           }`}
//         />
//       </div>
//       {error && (
//         <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//           <AlertCircle size={12} />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }



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

  /* INPUT */
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  /* VALIDATION */
  const validateForm = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name required";

    if (!form.email.trim()) e.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";

    if (!form.phone.trim()) e.phone = "Phone required";
    else if (form.phone.replace(/\D/g, "").length !== 10)
      e.phone = "Enter 10 digit number";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* FILE SELECT */
  const handleFile = (doc, e) => {
    const selected = Array.from(e.target.files);

    const valid = selected.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(file.name + " too large (max 10MB)");
        return false;
      }
      return true;
    });

    setFiles((prev) => ({
      ...prev,
      [doc]: [...(prev[doc] || []), ...valid],
    }));
  };

  /* DROP */
  const handleDrop = (doc, e) => {
    e.preventDefault();
    handleFile(doc, { target: { files: e.dataTransfer.files } });
  };

  /* REMOVE */
  const removeFile = (doc, i) => {
    setFiles((prev) => {
      const copy = { ...prev };
      copy[doc].splice(i, 1);
      if (!copy[doc].length) delete copy[doc];
      return copy;
    });
  };

  /* ICON */
  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "png", "jpeg", "webp", "gif"].includes(ext))
      return <ImageIcon size={16} className="text-blue-600" />;
    if (ext === "pdf") return <FileText size={16} className="text-red-600" />;
    return <FileCheck size={16} className="text-gray-600" />;
  };

  /* SIZE */
  const formatFileSize = (bytes) => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!service?._id) {
      toast.error("Service missing");
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

      toast.success("Application Submitted Successfully 🎉");

      setFiles({});
      setForm({ name: "", email: "", phone: "", address: "" });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Submission failed");
    }
  };

  /* LOADING */
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-700" size={40} />
      </div>
    );

  /* NOT FOUND */
  if (!service)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Service not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-4">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-700 text-sm"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl shadow-lg p-5 text-white">
          <h1 className="text-2xl font-bold">
            Apply for {service.title}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PERSONAL */}
          <div className="bg-white rounded-xl shadow-md p-5 border">
            <h2 className="text-lg font-bold mb-4">Personal Info</h2>

            <Input label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
            <Input label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-3"
            />
          </div>

          {/* DOCS */}
          {service.requiredDocuments?.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5 border">
              <h2 className="font-bold mb-4">Documents</h2>

              {service.requiredDocuments.map((doc, i) => (
                <div key={i} className="mb-4 border p-3 rounded">

                  <p className="font-semibold mb-2">
                    {doc} *
                  </p>

                  <div
                    onDrop={(e) => handleDrop(doc, e)}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed p-5 text-center cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      hidden
                      id={doc}
                      type="file"
                      multiple
                      onChange={(e) => handleFile(doc, e)}
                    />
                    <label htmlFor={doc} className="cursor-pointer">
                      <Upload className="mx-auto mb-2" size={20}/>
                      Upload File
                    </label>
                  </div>

                  {files[doc]?.map((f, index) => (
                    <div key={index} className="flex justify-between text-sm mt-2">
                      <span className="flex items-center gap-2">
                        {getFileIcon(f.name)}
                        {f.name} ({formatFileSize(f.size)})
                      </span>

                      <button type="button" onClick={() => removeFile(doc, index)}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  ))}

                </div>
              ))}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center gap-2"
          >
            {submitting ? <Loader2 className="animate-spin"/> : <CheckCircle size={18}/>}
            Submit Application
          </button>

        </form>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <img src={preview} className="max-h-[90vh]"/>
        </div>
      )}
    </div>
  );
}

/* INPUT */
function Input({ label, name, value, onChange, error }) {
  return (
    <div className="mb-3">
      <label className="text-sm font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}