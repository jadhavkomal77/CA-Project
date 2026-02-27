
// // admin/TaxUpdateAdmin.jsx
// import { useState } from 'react';
// import {
//   useGetAllTaxUpdatesQuery,
//   useCreateTaxUpdateMutation,
//   useUpdateTaxUpdateMutation,
//   useDeleteTaxUpdateMutation,
// } from '../redux/apis/taxUpdateApi';
// import { toast } from 'react-toastify';
// import {
//   Plus,
//   Edit,
//   Trash2,
//   FileText,
//   Calendar,
//   Tag,
//   AlertCircle,
//   X,
//   Save,
//   Eye,
//   Download,
//   Search,
//   Filter,
//   CheckCircle2,
//   Clock,
//   TrendingUp,
//   BarChart3,
//   FileCheck,
//   Sparkles,
// } from 'lucide-react';

// export default function TaxUpdateAdmin() {
//   const [showModal, setShowModal] = useState(false);
//   const [editingUpdate, setEditingUpdate] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [formData, setFormData] = useState({
//     title: '',
//     shortSummary: '',
//     fullExplanation: '',
//     category: '',
//     whoIsAffected: '',
//     effectiveDate: '',
//     notificationNumber: '',
//     sourceLink: '',
//     isImportant: false,
//     pdf: null,
//   });

//   // Get today's date in YYYY-MM-DD format for min date
//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const { data, isLoading, refetch } = useGetAllTaxUpdatesQuery({ 
//     limit: 100,
//     search: searchQuery || undefined,
//     category: categoryFilter !== 'All' ? categoryFilter : undefined,
//   });
//   const [createUpdate, { isLoading: isCreating }] = useCreateTaxUpdateMutation();
//   const [updateUpdate, { isLoading: isUpdating }] = useUpdateTaxUpdateMutation();
//   const [deleteUpdate, { isLoading: isDeleting }] = useDeleteTaxUpdateMutation();

//   const taxUpdates = data?.data || [];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key !== 'pdf') {
//         submitData.append(key, formData[key]);
//       }
//     });
//     if (formData.pdf) {
//       submitData.append('pdf', formData.pdf);
//     }

//     try {
//       if (editingUpdate) {
//         await updateUpdate({ id: editingUpdate._id, formData: submitData }).unwrap();
//         toast.success('Update modified successfully');
//       } else {
//         await createUpdate(submitData).unwrap();
//         toast.success('Update created successfully');
//       }
//       resetForm();
//       setShowModal(false);
//       refetch();
//     } catch (error) {
//       toast.error(error?.data?.message || 'Operation failed');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       shortSummary: '',
//       fullExplanation: '',
//       category: '',
//       whoIsAffected: '',
//       effectiveDate: '',
//       notificationNumber: '',
//       sourceLink: '',
//       isImportant: false,
//       pdf: null,
//     });
//     setEditingUpdate(null);
//   };

//   const handleEdit = (update) => {
//     const effectiveDate = update.effectiveDate 
//       ? update.effectiveDate.split('T')[0] 
//       : '';

//     setEditingUpdate(update);
//     setFormData({
//       title: update.title || '',
//       shortSummary: update.shortSummary || '',
//       fullExplanation: update.fullExplanation || '',
//       category: update.category || '',
//       whoIsAffected: update.whoIsAffected || '',
//       effectiveDate: effectiveDate,
//       notificationNumber: update.notificationNumber || '',
//       sourceLink: update.sourceLink || '',
//       isImportant: update.isImportant || false,
//       pdf: null,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this update?')) return;

//     try {
//       await deleteUpdate(id).unwrap();
//       toast.success('Update deleted successfully');
//       refetch();
//     } catch (error) {
//       toast.error(error?.data?.message || 'Delete failed');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading updates...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalViews = taxUpdates.reduce((sum, u) => sum + (u.viewsCount || 0), 0);
//   const importantCount = taxUpdates.filter(u => u.isImportant).length;
//   const newCount = taxUpdates.filter(u => u.isNew).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                 <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl">
//                   <FileCheck className="w-6 h-6 sm:w-8 sm:h-8" />
//                 </div>
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Tax & Compliance Updates</h1>
//               </div>
//               <p className="text-blue-100 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
//                 Manage government tax and compliance notifications
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 resetForm();
//                 setShowModal(true);
//               }}
//               className="w-full sm:w-auto bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold hover:scale-105 mt-3 sm:mt-0"
//             >
//               <Plus size={20} className="sm:w-[22px] sm:h-[22px]" />
//               <span className="text-sm sm:text-base">Add New Update</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
//                 <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
//             </div>
//             <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Updates</h3>
//             <p className="text-2xl sm:text-3xl font-bold text-gray-900">{taxUpdates.length}</p>
//           </div>

//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//             </div>
//             <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Important</h3>
//             <p className="text-2xl sm:text-3xl font-bold text-gray-900">{importantCount}</p>
//           </div>

//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
//                 <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//             </div>
//             <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">New (7 days)</h3>
//             <p className="text-2xl sm:text-3xl font-bold text-gray-900">{newCount}</p>
//           </div>

//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
//                 <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
//             </div>
//             <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Views</h3>
//             <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by title or summary..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="pl-10 sm:pl-12 pr-6 sm:pr-8 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white w-full sm:min-w-[200px] cursor-pointer transition-all outline-none"
//               >
//                 <option value="All">All Categories</option>
//                 <option value="GST">GST</option>
//                 <option value="Income Tax">Income Tax</option>
//                 <option value="MCA">MCA</option>
//                 <option value="RBI">RBI</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Updates Table */}
//         <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[800px]">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Update Details
//                   </th>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Views
//                   </th>
//                   <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {taxUpdates.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-4 sm:px-6 py-12 sm:py-16 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="bg-gray-100 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
//                           <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
//                         </div>
//                         <p className="text-gray-700 font-semibold text-base sm:text-lg mb-1">No updates found</p>
//                         <p className="text-gray-500 text-xs sm:text-sm">
//                           {searchQuery || categoryFilter !== 'All' 
//                             ? 'Try adjusting your filters' 
//                             : 'Create your first tax update to get started'}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   taxUpdates.map((update) => (
//                     <tr key={update._id} className="hover:bg-blue-50/50 transition-colors duration-150">
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
//                           <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                             {update.isNew && (
//                               <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
//                                 <Sparkles size={8} className="sm:w-[10px] sm:h-[10px]" />
//                                 New
//                               </span>
//                             )}
//                             {update.isImportant && (
//                               <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
//                                 <AlertCircle size={8} className="sm:w-[10px] sm:h-[10px]" />
//                                 Important
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
//                               {update.title}
//                             </div>
//                             <div className="text-xs sm:text-sm text-gray-600 line-clamp-2">
//                               {update.shortSummary}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 text-blue-800 rounded-lg text-[10px] sm:text-xs font-semibold">
//                           <Tag size={10} className="sm:w-3 sm:h-3" />
//                           <span className="truncate max-w-[80px] sm:max-w-none">{update.category}</span>
//                         </span>
//                       </td>
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700">
//                           <Calendar size={14} className="sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
//                           <span className="font-medium truncate">
//                             {new Date(update.effectiveDate).toLocaleDateString('en-GB', {
//                               day: 'numeric',
//                               month: 'short',
//                               year: 'numeric'
//                             })}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <div className="flex flex-col gap-1 sm:gap-1.5">
//                           {update.isImportant && (
//                             <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-red-700 bg-red-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-fit">
//                               <AlertCircle size={10} className="sm:w-3 sm:h-3" />
//                               Important
//                             </span>
//                           )}
//                           {update.isNew && (
//                             <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-green-700 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-fit">
//                               <Clock size={10} className="sm:w-3 sm:h-3" />
//                               New
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
//                           <Eye size={14} className="sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
//                           <span>{update.viewsCount || 0}</span>
//                         </div>
//                       </td>
//                       <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//                         <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
//                           <button
//                             onClick={() => handleEdit(update)}
//                             className="p-1.5 sm:p-2.5 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
//                             title="Edit"
//                           >
//                             <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
//                           </button>
//                           {update.pdfUrl && (
//                             <a
//                               href={update.pdfUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="p-1.5 sm:p-2.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Download PDF"
//                             >
//                               <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
//                             </a>
//                           )}
//                           <button
//                             onClick={() => handleDelete(update._id)}
//                             disabled={isDeleting}
//                             className="p-1.5 sm:p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn">
//             <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg">
//                       {editingUpdate ? <Edit size={20} className="sm:w-6 sm:h-6" /> : <Plus size={20} className="sm:w-6 sm:h-6" />}
//                     </div>
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
//                       {editingUpdate ? 'Edit Update' : 'Create New Update'}
//                     </h2>
//                   </div>
//                   <button 
//                     onClick={() => {
//                       setShowModal(false);
//                       resetForm();
//                     }} 
//                     className="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
//                   >
//                     <X size={20} className="sm:w-6 sm:h-6" />
//                   </button>
//                 </div>
//               </div>

//               {/* Modal Body */}
//               <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-120px)]">
//                 <div className="space-y-4 sm:space-y-6">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.title}
//                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                       placeholder="Enter update title"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                       Short Summary <span className="text-red-500">*</span> (2-3 lines)
//                     </label>
//                     <textarea
//                       required
//                       rows={3}
//                       value={formData.shortSummary}
//                       onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
//                       className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
//                       placeholder="Brief summary of the update"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                       Full Detailed Explanation <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       required
//                       rows={6}
//                       value={formData.fullExplanation}
//                       onChange={(e) => setFormData({ ...formData, fullExplanation: e.target.value })}
//                       className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
//                       placeholder="Complete detailed explanation"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                         Category <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         value={formData.category}
//                         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                         className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                         placeholder="e.g., GST, Income Tax, MCA, RBI, etc."
//                       />
//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Enter any category name</p>
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                         Effective Date <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         required
//                         min={editingUpdate ? undefined : getTodayDate()}
//                         value={formData.effectiveDate}
//                         onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
//                         className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                       />
//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
//                         {editingUpdate ? 'Date can be changed' : 'Only today or future dates allowed'}
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                       Who is Affected <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.whoIsAffected}
//                       onChange={(e) => setFormData({ ...formData, whoIsAffected: e.target.value })}
//                       className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                       placeholder="e.g., All taxpayers, Companies, etc."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                     <div>
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                         Notification Number
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.notificationNumber}
//                         onChange={(e) => setFormData({ ...formData, notificationNumber: e.target.value })}
//                         className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                         placeholder="e.g., 123/2024"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                         Source Link
//                       </label>
//                       <input
//                         type="url"
//                         value={formData.sourceLink}
//                         onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
//                         className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                         placeholder="https://..."
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
//                       Upload PDF
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-blue-500 transition-colors">
//                       <input
//                         type="file"
//                         accept=".pdf"
//                         onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })}
//                         className="hidden"
//                         id="pdf-upload"
//                       />
//                       <label htmlFor="pdf-upload" className="cursor-pointer">
//                         <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           {formData.pdf ? formData.pdf.name : 'Click to upload PDF'}
//                         </p>
//                       </label>
//                     </div>
//                     {editingUpdate?.pdfUrl && !formData.pdf && (
//                       <p className="text-xs sm:text-sm text-blue-600 mt-2">
//                         Current PDF: <a href={editingUpdate.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">View</a>
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 rounded-lg sm:rounded-xl border border-red-200">
//                     <input
//                       type="checkbox"
//                       checked={formData.isImportant}
//                       onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
//                       className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 flex-shrink-0"
//                     />
//                     <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-red-700 cursor-pointer">
//                       <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
//                       Mark as Important Update
//                     </label>
//                   </div>
//                 </div>

//                 {/* Modal Footer */}
//                 <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetForm();
//                     }}
//                     className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all font-semibold"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isCreating || isUpdating}
//                     className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
//                   >
//                     <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
//                     {isCreating || isUpdating ? 'Saving...' : editingUpdate ? 'Update Changes' : 'Create Update'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }






// admin/TaxUpdateAdmin.jsx
import { useState } from 'react';
import {
  useGetAllTaxUpdatesQuery,
  useCreateTaxUpdateMutation,
  useUpdateTaxUpdateMutation,
  useDeleteTaxUpdateMutation,
} from '../redux/apis/taxUpdateApi';
import { toast } from 'react-toastify';
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Tag,
  AlertCircle,
  X,
  Save,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  FileCheck,
  Sparkles,
} from 'lucide-react';

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
`;

export default function TaxUpdateAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [formData, setFormData] = useState({
    title: '',
    shortSummary: '',
    fullExplanation: '',
    category: '',
    whoIsAffected: '',
    effectiveDate: '',
    notificationNumber: '',
    sourceLink: '',
    isImportant: false,
    pdf: null,
  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { data, isLoading, refetch } = useGetAllTaxUpdatesQuery({ 
    limit: 100,
    search: searchQuery || undefined,
    category: categoryFilter !== 'All' ? categoryFilter : undefined,
  });
  const [createUpdate, { isLoading: isCreating }] = useCreateTaxUpdateMutation();
  const [updateUpdate, { isLoading: isUpdating }] = useUpdateTaxUpdateMutation();
  const [deleteUpdate, { isLoading: isDeleting }] = useDeleteTaxUpdateMutation();

  const taxUpdates = data?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'pdf') {
        submitData.append(key, formData[key]);
      }
    });
    if (formData.pdf) {
      submitData.append('pdf', formData.pdf);
    }

    try {
      if (editingUpdate) {
  await updateUpdate({ id: editingUpdate._id, formData: submitData }).unwrap();
  toast.success('Update Success ✅');
} else {
  await createUpdate(submitData).unwrap();
  toast.success('Create Success ✅');
}
      resetForm();
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      shortSummary: '',
      fullExplanation: '',
      category: '',
      whoIsAffected: '',
      effectiveDate: '',
      notificationNumber: '',
      sourceLink: '',
      isImportant: false,
      pdf: null,
    });
    setEditingUpdate(null);
  };

  const handleEdit = (update) => {
    const effectiveDate = update.effectiveDate 
      ? update.effectiveDate.split('T')[0] 
      : '';

    setEditingUpdate(update);
    setFormData({
      title: update.title || '',
      shortSummary: update.shortSummary || '',
      fullExplanation: update.fullExplanation || '',
      category: update.category || '',
      whoIsAffected: update.whoIsAffected || '',
      effectiveDate: effectiveDate,
      notificationNumber: update.notificationNumber || '',
      sourceLink: update.sourceLink || '',
      isImportant: update.isImportant || false,
      pdf: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this update?')) return;

    try {
      await deleteUpdate(id).unwrap();
      toast.error('deleted successfully');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Delete failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading updates...</p>
        </div>
      </div>
    );
  }

  const totalViews = taxUpdates.reduce((sum, u) => sum + (u.viewsCount || 0), 0);
  const importantCount = taxUpdates.filter(u => u.isImportant).length;
  const newCount = taxUpdates.filter(u => u.isNew).length;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FileCheck className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Tax & Compliance Updates</h1>
                </div>
                <p className="text-blue-100 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
                  Manage government tax and compliance notifications
                </p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="w-full sm:w-auto bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold hover:scale-105 mt-3 sm:mt-0"
              >
                <Plus size={20} className="sm:w-[22px] sm:h-[22px]" />
                <span className="text-sm sm:text-base">Add New Update</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Updates</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{taxUpdates.length}</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Important</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{importantCount}</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">New (7 days)</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{newCount}</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              </div>
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Views</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search by title or summary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 sm:pl-12 pr-6 sm:pr-8 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white w-full sm:min-w-[200px] cursor-pointer transition-all outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="GST">GST</option>
                  <option value="Income Tax">Income Tax</option>
                  <option value="MCA">MCA</option>
                  <option value="RBI">RBI</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Updates Table */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Update Details
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {taxUpdates.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-100 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
                            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                          </div>
                          <p className="text-gray-700 font-semibold text-base sm:text-lg mb-1">No updates found</p>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {searchQuery || categoryFilter !== 'All' 
                              ? 'Try adjusting your filters' 
                              : 'Create your first tax update to get started'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    taxUpdates.map((update) => (
                      <tr key={update._id} className="hover:bg-blue-50/50 transition-colors duration-150">
                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {update.isNew && (
                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
                                  <Sparkles size={8} className="sm:w-[10px] sm:h-[10px]" />
                                  New
                                </span>
                              )}
                              {update.isImportant && (
                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
                                  <AlertCircle size={8} className="sm:w-[10px] sm:h-[10px]" />
                                  Important
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
                                {update.title}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {update.shortSummary}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 text-blue-800 rounded-lg text-[10px] sm:text-xs font-semibold">
                            <Tag size={10} className="sm:w-3 sm:h-3" />
                            <span className="truncate max-w-[80px] sm:max-w-none">{update.category}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700">
                            <Calendar size={14} className="sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span className="font-medium truncate">
                              {new Date(update.effectiveDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                          <div className="flex flex-col gap-1 sm:gap-1.5">
                            {update.isImportant && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-red-700 bg-red-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-fit">
                                <AlertCircle size={10} className="sm:w-3 sm:h-3" />
                                Important
                              </span>
                            )}
                            {update.isNew && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-green-700 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md w-fit">
                                <Clock size={10} className="sm:w-3 sm:h-3" />
                                New
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                          <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                            <button
                              onClick={() => handleEdit(update)}
                              className="p-1.5 sm:p-2.5 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Edit"
                            >
                              <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                            {update.pdfUrl && (
                              <a
                                href={update.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 sm:p-2.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Download PDF"
                              >
                                <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                              </a>
                            )}
                            <button
                              onClick={() => handleDelete(update._id)}
                              disabled={isDeleting}
                              className="p-1.5 sm:p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn">
              <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg">
                        {editingUpdate ? <Edit size={20} className="sm:w-6 sm:h-6" /> : <Plus size={20} className="sm:w-6 sm:h-6" />}
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                        {editingUpdate ? 'Edit Update' : 'Create New Update'}
                      </h2>
                    </div>
                    <button 
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }} 
                      className="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
                    >
                      <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-120px)]">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="Enter update title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Short Summary <span className="text-red-500">*</span> (2-3 lines)
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.shortSummary}
                        onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                        className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                        placeholder="Brief summary of the update"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Full Detailed Explanation <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.fullExplanation}
                        onChange={(e) => setFormData({ ...formData, fullExplanation: e.target.value })}
                        className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                        placeholder="Complete detailed explanation"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="e.g., GST, Income Tax, MCA, RBI, etc."
                        />
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Enter any category name</p>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Effective Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          min={editingUpdate ? undefined : getTodayDate()}
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                          className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                          {editingUpdate ? 'Date can be changed' : 'Only today or future dates allowed'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Who is Affected <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.whoIsAffected}
                        onChange={(e) => setFormData({ ...formData, whoIsAffected: e.target.value })}
                        className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="e.g., All taxpayers, Companies, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Notification Number
                        </label>
                        <input
                          type="text"
                          value={formData.notificationNumber}
                          onChange={(e) => setFormData({ ...formData, notificationNumber: e.target.value })}
                          className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="e.g., 123/2024"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Source Link
                        </label>
                        <input
                          type="url"
                          value={formData.sourceLink}
                          onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
                          className="w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Upload PDF
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="cursor-pointer">
                          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm text-gray-600">
                            {formData.pdf ? formData.pdf.name : 'Click to upload PDF'}
                          </p>
                        </label>
                      </div>
                      {editingUpdate?.pdfUrl && !formData.pdf && (
                        <p className="text-xs sm:text-sm text-blue-600 mt-2">
                          Current PDF: <a href={editingUpdate.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">View</a>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 rounded-lg sm:rounded-xl border border-red-200">
                      <input
                        type="checkbox"
                        checked={formData.isImportant}
                        onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 flex-shrink-0"
                      />
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-red-700 cursor-pointer">
                        <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                        Mark as Important Update
                      </label>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating || isUpdating}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                      {isCreating || isUpdating ? 'Saving...' : editingUpdate ? 'Update Changes' : 'Create Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
