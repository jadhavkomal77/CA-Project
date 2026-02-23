
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   Trash2,
//   Loader2,
//   CheckCircle,
//   ArrowLeft,
//   FileText,
//   User,
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

//   /* INPUT */
//   const handleChange = (e) => {
//     setForm(p => ({ ...p, [e.target.name]: e.target.value }));
//     setErrors(p => ({ ...p, [e.target.name]: "" }));
//   };

//   /* VALIDATE */
//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Required";
//     if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
//     if (form.phone.replace(/\D/g, "").length !== 10) e.phone = "Invalid phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* FILE SELECT */
//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);

//     const valid = selected.filter(f => {
//       if (f.size > 10 * 1024 * 1024) {
//         toast.error(`${f.name} > 10MB`);
//         return false;
//       }
//       return true;
//     });

//     setFiles(p => ({
//       ...p,
//       [doc]: [...(p[doc] || []), ...valid],
//     }));
//   };

//   /* REMOVE FILE */
//   const removeFile = (doc, index) => {
//     setFiles(p => {
//       const copy = { ...p };
//       copy[doc].splice(index, 1);
//       if (!copy[doc].length) delete copy[doc];
//       return copy;
//     });
//   };

//   /* SUBMIT */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const fd = new FormData();

//       fd.append("userDetails", JSON.stringify(form));
//       fd.append("serviceId", service._id);

//       Object.keys(files).forEach(key =>
//         files[key].forEach(file => fd.append("documents", file))
//       );

//       await createApplication(fd).unwrap();

//       toast.success("Application Submitted Successfully 🎉");
//       navigate("/contact");
//     } catch (err) {
//       toast.error(err?.data?.message || "Submission Failed");
//     }
//   };

//   /* LOADING */
//   if (isLoading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 className="animate-spin text-blue-700" size={42} />
//       </div>
//     );

//   /* PAGE */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">

//       <div className="max-w-4xl mx-auto">

//         {/* BACK */}
//         <button
//           onClick={()=>navigate(-1)}
//           className="flex items-center gap-2 text-sm mb-5 text-gray-600 hover:text-blue-700"
//         >
//           <ArrowLeft size={18}/> Back
//         </button>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 rounded-2xl shadow-lg mb-6 animate-fade-in-up">
//           <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
//           <p className="text-sm opacity-90 mt-1">
//             Fill details and upload required documents
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* PERSONAL */}
//           <Card title="Personal Information" icon={<User size={18}/>}>
//             <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
//             <Input label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
//             <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

//             <textarea
//               name="address"
//               placeholder="Address"
//               value={form.address}
//               onChange={handleChange}
//               className="input mt-3"
//             />
//           </Card>

//           {/* DOCUMENTS */}
//           {service.requiredDocuments?.length > 0 && (
//             <Card title="Upload Documents" icon={<FileText size={18}/>}>
//               {service.requiredDocuments.map((doc,i)=>(
//                 <div key={i} className="mb-5">

//                   <p className="font-semibold mb-2">{doc}</p>

//                   <label className="uploadBox">
//                     <Upload size={18}/> Select Files
//                     <input hidden type="file" multiple onChange={(e)=>handleFile(doc,e)}/>
//                   </label>

//                   {files[doc]?.map((f,index)=>(
//                     <div key={index} className="fileItem">
//                       {f.name}
//                       <Trash2 size={15} onClick={()=>removeFile(doc,index)} className="cursor-pointer hover:text-red-600"/>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </Card>
//           )}

//           {/* SUBMIT */}
//           <button disabled={submitting} className="submitBtn">
//             {submitting
//               ? <Loader2 className="animate-spin"/>
//               : <CheckCircle size={18}/>}
//             Submit Application
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */

// const Card = ({title,icon,children})=>(
//   <div className="card-glass animate-scale-in">
//     <h2 className="card-title flex items-center gap-2">{icon}{title}</h2>
//     {children}
//   </div>
// );

// const Input = ({label,name,value,onChange,error})=>(
//   <div className="mb-4">
//     <label className="label">{label}</label>
//     <input
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`input ${error?"border-red-400":""}`}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );






// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   Trash2,
//   Loader2,
//   CheckCircle,
//   ArrowLeft,
//   FileText,
//   User,
// } from "lucide-react";
// import { motion } from "framer-motion";

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

//   const handleChange = (e) => {
//     setForm(p => ({ ...p, [e.target.name]: e.target.value }));
//     setErrors(p => ({ ...p, [e.target.name]: "" }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Required";
//     if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
//     if (form.phone.replace(/\D/g, "").length !== 10) e.phone = "Invalid phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);

//     const valid = selected.filter(f => {
//       if (f.size > 10 * 1024 * 1024) {
//         toast.error(`${f.name} > 10MB`);
//         return false;
//       }
//       return true;
//     });

//     setFiles(p => ({
//       ...p,
//       [doc]: [...(p[doc] || []), ...valid],
//     }));
//   };

//   const removeFile = (doc, index) => {
//     setFiles(p => {
//       const copy = { ...p };
//       copy[doc].splice(index, 1);
//       if (!copy[doc].length) delete copy[doc];
//       return copy;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const fd = new FormData();

//       fd.append("userDetails", JSON.stringify(form));
//       fd.append("serviceId", service._id);

//       Object.keys(files).forEach(key =>
//         files[key].forEach(file => fd.append("documents", file))
//       );

//       await createApplication(fd).unwrap();

//       toast.success("Application Submitted Successfully 🎉");
//       navigate("/contact");
//     } catch (err) {
//       toast.error(err?.data?.message || "Submission Failed");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 className="animate-spin text-blue-700" size={42} />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">

//       <div className="max-w-4xl mx-auto">

//         {/* BACK */}
//         <button
//           onClick={()=>navigate(-1)}
//           className="flex items-center gap-2 text-sm mb-6 font-medium text-slate-600 hover:text-blue-700 transition"
//         >
//           <ArrowLeft size={18}/> Back
//         </button>


//         {/* HEADER */}
//         <motion.div
//           initial={{opacity:0,y:-20}}
//           animate={{opacity:1,y:0}}
//           className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-7 rounded-3xl shadow-xl mb-8"
//         >
//           <h1 className="text-3xl font-bold tracking-tight">
//             Apply for {service.title}
//           </h1>
//           <p className="text-blue-100 mt-2 text-sm">
//             Fill details and upload required documents
//           </p>
//         </motion.div>


//         <form onSubmit={handleSubmit} className="space-y-7">

//           {/* PERSONAL */}
//           <Card title="Personal Information" icon={<User size={18}/>}>
//             <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
//             <Input label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
//             <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

//             <textarea
//               name="address"
//               placeholder="Address"
//               value={form.address}
//               onChange={handleChange}
//               className="input mt-4"
//             />
//           </Card>


//           {/* DOCUMENTS */}
//         {/* DOCUMENTS */}
// {service.requiredDocuments?.length > 0 && (
//   <Card title="Upload Documents" icon={<FileText size={18}/>}>
    
//     <div className="grid md:grid-cols-2 gap-6">

//       {service.requiredDocuments.map((doc,i)=>(
//         <div key={i} className="space-y-2">

//           {/* Label */}
//           <label className="font-semibold text-sm text-gray-700">
//             {doc}
//           </label>

//           {/* Input Box */}
//           <label className="flex items-center justify-between bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-sm hover:border-blue-500 transition cursor-pointer">
            
//             <span className="flex items-center gap-2 text-gray-600 text-sm">
//               <Upload size={16}/> Select Files
//             </span>

//             <input
//               hidden
//               type="file"
//               multiple
//               onChange={(e)=>handleFile(doc,e)}
//             />
//           </label>

//           {/* Selected Files */}
//           {files[doc]?.map((f,index)=>(
//             <div
//               key={index}
//               className="flex justify-between items-center text-xs bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg"
//             >
//               <span className="truncate">{f.name}</span>

//               <Trash2
//                 size={14}
//                 onClick={()=>removeFile(doc,index)}
//                 className="cursor-pointer text-gray-500 hover:text-red-600"
//               />
//             </div>
//           ))}

//         </div>
//       ))}

//     </div>

//   </Card>
// )}


//           {/* SUBMIT */}
//           <button disabled={submitting} className="submitBtn">
//             {submitting
//               ? <Loader2 className="animate-spin"/>
//               : <CheckCircle size={18}/>}
//             Submit Application
//           </button>

//           <p className="text-xs text-center text-slate-500">
//             Your documents are secure and encrypted 🔒
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* CARD */
// const Card = ({title,icon,children})=>(
//   <motion.div
//     initial={{opacity:0,y:20}}
//     animate={{opacity:1,y:0}}
//     className="bg-white border border-slate-200 rounded-3xl p-7 shadow-lg hover:shadow-xl transition"
//   >
//     <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-5">
//       <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
//         {icon}
//       </span>
//       {title}
//     </h2>
//     {children}
//   </motion.div>
// );


// /* INPUT */
// const Input = ({label,name,value,onChange,error})=>(
//   <div className="mb-5">
//     <label className="block text-sm font-semibold text-slate-700 mb-2">
//       {label}
//     </label>

//     <input
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`input ${error?"border-red-400 bg-red-50":""}`}
//     />

//     {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//   </div>
// );






// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";

// import {
//   Upload,
//   Trash2,
//   Loader2,
//   CheckCircle,
//   ArrowLeft,
//   FileText,
//   User,
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

//   /* INPUT */
//   const handleChange = (e) => {
//     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//     setErrors((p) => ({ ...p, [e.target.name]: "" }));
//   };

//   /* VALIDATE */
//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Required";
//     if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
//     if (form.phone.replace(/\D/g, "").length !== 10) e.phone = "Invalid phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* FILE SELECT */
//   const handleFile = (doc, e) => {
//     const selected = Array.from(e.target.files);

//     const valid = selected.filter((f) => {
//       if (f.size > 10 * 1024 * 1024) {
//         toast.error(`${f.name} > 10MB`);
//         return false;
//       }
//       return true;
//     });

//     setFiles((p) => ({
//       ...p,
//       [doc]: [...(p[doc] || []), ...valid],
//     }));
//   };

//   /* REMOVE FILE */
//   const removeFile = (doc, index) => {
//     setFiles((p) => {
//       const copy = { ...p };
//       copy[doc].splice(index, 1);
//       if (!copy[doc].length) delete copy[doc];
//       return copy;
//     });
//   };

//   /* SUBMIT */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const fd = new FormData();

//       fd.append("userDetails", JSON.stringify(form));
//       fd.append("serviceId", service._id);

//       Object.keys(files).forEach((key) =>
//         files[key].forEach((file) => fd.append("documents", file))
//       );

//       await createApplication(fd).unwrap();

//       toast.success("Application Submitted Successfully 🎉");
//       navigate("/contact");
//     } catch (err) {
//       toast.error(err?.data?.message || "Submission Failed");
//     }
//   };

//   /* LOADING */
//   if (isLoading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader2 className="animate-spin text-blue-700" size={42} />
//       </div>
//     );

//   /* PAGE */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">

//       <div className="max-w-5xl mx-auto">

//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm mb-6 text-gray-600 hover:text-blue-700"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-700 to-blue-700 text-white p-7 rounded-3xl shadow-xl mb-8 animate-fade-in-up">
//           <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
//           <p className="text-sm opacity-90 mt-1">
//             Fill details and upload required documents
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* PERSONAL INFO */}
//           <Card title="Personal Information" icon={<User size={18} />}>

//             <div className="grid md:grid-cols-2 gap-5">

//               <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
//               <Input label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
//               <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

//               <div>
//                 <label className="label">Address</label>
//                 <textarea
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   rows="2"
//                   className="input-modern"
//                 />
//               </div>

//             </div>
//           </Card>

//           {/* DOCUMENTS */}
//           {service.requiredDocuments?.length > 0 && (
//             <Card title="Upload Documents" icon={<FileText size={18}/>}>
              
//               <div className="grid md:grid-cols-2 gap-6">

//                 {service.requiredDocuments.map((doc,i)=>(
//                   <div key={i} className="space-y-2">

//                     <label className="label">{doc}</label>

//                     <label className="upload-modern">
//                       <span className="flex items-center gap-2 text-gray-600 text-sm">
//                         <Upload size={16}/> Select Files
//                       </span>

//                       <input hidden type="file" multiple onChange={(e)=>handleFile(doc,e)}/>
//                     </label>

//                     {files[doc]?.map((f,index)=>(
//                       <div key={index} className="file-modern">
//                         <span className="truncate">{f.name}</span>

//                         <Trash2
//                           size={14}
//                           onClick={()=>removeFile(doc,index)}
//                           className="cursor-pointer text-gray-500 hover:text-red-600"
//                         />
//                       </div>
//                     ))}

//                   </div>
//                 ))}

//               </div>

//             </Card>
//           )}

//           {/* SUBMIT */}
//           <button disabled={submitting} className="submit-modern">
//             {submitting
//               ? <Loader2 className="animate-spin"/>
//               : <CheckCircle size={18}/>}
//             Submit Application
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }
// /* CARD */
// const Card = ({title,icon,children})=>(
//   <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 animate-fade-in-up">
//     <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 border-b pb-2">
//       {icon}{title}
//     </h2>
//     {children}
//   </div>
// );
// /* INPUT */
// const Input = ({label,name,value,onChange,error})=>(
//   <div>
//     <label className="label">{label}</label>

//     <input
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`input-modern ${error?"border-red-400":""}`}
//     />

//     {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//   </div>
// );



import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
import { toast } from "react-toastify";

import {
  Upload,
  Trash2,
  Loader2,
  CheckCircle,
  ArrowLeft,
  FileText,
  User,
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

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  /* VALIDATION */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
    if (form.phone.replace(/\D/g, "").length !== 10)
      e.phone = "Invalid phone";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* FILE SELECT */
  const handleFile = (doc, e) => {
    const selected = Array.from(e.target.files);

    const valid = selected.filter((f) => {
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    setFiles((p) => ({
      ...p,
      [doc]: [...(p[doc] || []), ...valid],
    }));
  };

  /* REMOVE FILE */
  const removeFile = (doc, index) => {
    setFiles((p) => {
      const copy = { ...p };
      copy[doc].splice(index, 1);
      if (!copy[doc].length) delete copy[doc];
      return copy;
    });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const fd = new FormData();
      fd.append("userDetails", JSON.stringify(form));
      fd.append("serviceId", service._id);

      Object.keys(files).forEach((key) =>
        files[key].forEach((file) =>
          fd.append("documents", file)
        )
      );

      await createApplication(fd).unwrap();

      toast.success("Application submitted successfully!🎉", {
        position: "top-right",
        autoClose: 2500,
        theme: "dark",
      });

      setTimeout(() => navigate("/contact"), 2500);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Submission failed❌",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  /* LOADING */
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-700" size={42} />
      </div>
    );

  /* PAGE */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-6 text-black hover:text-blue-700"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white p-7 rounded-3xl shadow-xl mb-8">
          <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
          <p className="text-sm opacity-90 mt-1">
            Fill details and upload required documents
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* PERSONAL INFO */}
          <Card title="Personal Information" icon={<User size={18}/>}>
            <div className="grid md:grid-cols-2 gap-5">

              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
              <Input label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
              <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

              <div>
                <label className="label">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="2"
                  className="input-modern"
                />
              </div>

            </div>
          </Card>

          {/* DOCUMENTS */}
          {service.requiredDocuments?.length > 0 && (
            <Card title="Upload Documents" icon={<FileText size={18}/>}>
              <div className="grid md:grid-cols-2 gap-6">

                {service.requiredDocuments.map((doc,i)=>(
                  <div key={i} className="space-y-2">

                    <label className="label">{doc}</label>

                    <label className="upload-modern">
                      <span className="flex items-center gap-2 text-gray-600 text-sm">
                        <Upload size={16}/> Select Files
                      </span>

                      <input hidden type="file" multiple onChange={(e)=>handleFile(doc,e)}/>
                    </label>

                    {/* FILE LIST */}
                    {files[doc]?.map((f,index)=>{

                      const isImage = f.type.startsWith("image/");
                      const isPDF = f.type === "application/pdf";

                      return (
                        <div key={index} className="file-modern flex items-center justify-between gap-3">

                          <div className="flex items-center gap-3">

                            {isImage && (
                              <img
                                src={URL.createObjectURL(f)}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md border"
                              />
                            )}

                            {isPDF && (
                              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 text-xs font-bold">
                                PDF
                              </div>
                            )}

                            {!isImage && !isPDF && (
                              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 text-xs font-bold">
                                FILE
                              </div>
                            )}

                            <span className="truncate text-sm">{f.name}</span>
                          </div>

                          <Trash2
                            size={16}
                            onClick={()=>removeFile(doc,index)}
                            className="cursor-pointer text-gray-500 hover:text-red-600"
                          />
                        </div>
                      );
                    })}

                  </div>
                ))}

              </div>
            </Card>
          )}

          {/* SUBMIT */}
          <button disabled={submitting} className="submit-modern">
            {submitting
              ? <Loader2 className="animate-spin"/>
              : <CheckCircle size={18}/>}
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

/* CARD */
const Card = ({title,icon,children})=>(
  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">
    <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 border-b pb-2">
      {icon}{title}
    </h2>
    {children}
  </div>
);

/* INPUT */
const Input = ({label,name,value,onChange,error})=>(
  <div>
    <label className="label">{label}</label>

    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`input-modern ${error?"border-red-400":""}`}
    />

    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);