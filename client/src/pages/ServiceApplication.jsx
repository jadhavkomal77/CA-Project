// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetRequiredDocumentsQuery } from "../redux/apis/applicationApi";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
// import { useSubmitApplicationMutation } from "../redux/apis/applicationApi";
// import { toast } from "react-toastify";
// import {
//   Upload,
//   FileText,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Loader,
// } from "lucide-react";

// export default function ServiceApplication() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data: serviceData, isLoading: serviceLoading } =
//     useGetPublicServiceBySlugQuery(slug);
//   const { data: documentsData, isLoading: documentsLoading } =
//     useGetRequiredDocumentsQuery(slug);
//   const [submitApplication, { isLoading: isSubmitting }] =
//     useSubmitApplicationMutation();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [documents, setDocuments] = useState({});
//   const [errors, setErrors] = useState({});

//   const requiredDocuments =
//     documentsData?.data?.requiredDocuments || [];

//   // Initialize documents state
//   useEffect(() => {
//     if (requiredDocuments.length > 0) {
//       const initialDocs = {};
//       requiredDocuments.forEach((doc) => {
//         initialDocs[doc] = null;
//       });
//       setDocuments(initialDocs);
//     }
//   }, [requiredDocuments]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   const handleFileChange = (documentName, file) => {
//     if (file) {
//       // Validate file type
//       const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
//       if (!allowedTypes.includes(file.type)) {
//         toast.error("Only PDF, JPG, and PNG files are allowed");
//         return;
//       }

//       // Validate file size (10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("File size must be less than 10MB");
//         return;
//       }

//       setDocuments({ ...documents, [documentName]: file });
//     }
//   };

//   const removeFile = (documentName) => {
//     setDocuments({ ...documents, [documentName]: null });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate user details
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State is required";
//     if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

//     // Validate documents
//     requiredDocuments.forEach((doc) => {
//       if (!documents[doc]) {
//         newErrors[doc] = "This document is required";
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields and upload all documents");
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();

//       // Add user details
//       formDataToSend.append("userDetails", JSON.stringify(formData));
//       formDataToSend.append("serviceId", documentsData?.data?.serviceId);
//       formDataToSend.append("serviceName", documentsData?.data?.serviceName);
//       formDataToSend.append("serviceSlug", slug);

//       // Add documents
//       const documentNames = [];
//       const documentFiles = [];

//       requiredDocuments.forEach((docName) => {
//         if (documents[docName]) {
//           documentNames.push(docName);
//           documentFiles.push(documents[docName]);
//         }
//       });

//       formDataToSend.append("documentNames", JSON.stringify(documentNames));
//       documentFiles.forEach((file) => {
//         formDataToSend.append("documents", file);
//       });

//       const response = await submitApplication(formDataToSend).unwrap();

//       toast.success("Application submitted successfully!");
//       navigate("/", { state: { applicationNumber: response.data.applicationNumber } });
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to submit application");
//     }
//   };

//   if (serviceLoading || documentsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader className="animate-spin text-blue-700" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Apply for {serviceData?.data?.title || "Service"}
//           </h1>
//           <p className="text-gray-600">
//             Please fill in your details and upload the required documents
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* User Details Section */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Personal Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.fullName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//                 {errors.fullName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Phone <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.phone ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your phone number"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.address ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your address"
//                 />
//                 {errors.address && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   City <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.city ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your city"
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   State <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.state ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your state"
//                 />
//                 {errors.state && (
//                   <p className="text-red-500 text-sm mt-1">{errors.state}</p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Pincode <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.pincode ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your pincode"
//                 />
//                 {errors.pincode && (
//                   <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Documents Upload Section */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Required Documents
//             </h2>
//             <p className="text-sm text-gray-600 mb-6">
//               Please upload all required documents. Only PDF, JPG, and PNG files
//               are allowed (Max 10MB per file).
//             </p>

//             <div className="space-y-6">
//               {requiredDocuments.map((docName, index) => (
//                 <div
//                   key={index}
//                   className={`border-2 rounded-lg p-4 ${
//                     errors[docName]
//                       ? "border-red-500 bg-red-50"
//                       : documents[docName]
//                       ? "border-green-500 bg-green-50"
//                       : "border-gray-300 bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-3">
//                       <FileText
//                         className={
//                           documents[docName]
//                             ? "text-green-600"
//                             : "text-gray-400"
//                         }
//                         size={24}
//                       />
//                       <label className="text-sm font-semibold text-gray-900">
//                         {docName} <span className="text-red-500">*</span>
//                       </label>
//                     </div>
//                     {documents[docName] && (
//                       <CheckCircle className="text-green-600" size={20} />
//                     )}
//                   </div>

//                   {documents[docName] ? (
//                     <div className="flex items-center justify-between bg-white p-3 rounded border border-green-300">
//                       <div className="flex items-center gap-2">
//                         <FileText className="text-blue-600" size={18} />
//                         <span className="text-sm text-gray-700">
//                           {documents[docName].name}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           ({(documents[docName].size / 1024 / 1024).toFixed(2)} MB)
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeFile(docName)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
//                       <Upload className="text-gray-400" size={20} />
//                       <span className="text-sm text-gray-600">
//                         Click to upload or drag and drop
//                       </span>
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(e) =>
//                           handleFileChange(docName, e.target.files[0])
//                         }
//                         className="hidden"
//                       />
//                     </label>
//                   )}

//                   {errors[docName] && (
//                     <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
//                       <AlertCircle size={16} />
//                       {errors[docName]}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader className="animate-spin" size={20} />
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit Application"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React from 'react'

const ServiceApplication = () => {
  return (
    <div>ServiceApplication</div>
  )
}

export default ServiceApplication