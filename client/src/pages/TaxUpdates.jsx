// // pages/TaxUpdates.jsx
// import { useState } from 'react';
// import { useGetAllTaxUpdatesQuery, useGetCategoryStatsQuery } from '../redux/apis/taxUpdateApi';
// import { Search, Filter, FileText, Calendar, Tag, AlertCircle, Download, ExternalLink } from 'lucide-react';

// export default function TaxUpdates() {
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState('All');
//   const [search, setSearch] = useState('');
//   const [importantOnly, setImportantOnly] = useState(false);

//   const { data, isLoading } = useGetAllTaxUpdatesQuery({
//     page,
//     limit: 9,
//     category: category !== 'All' ? category : undefined,
//     search: search || undefined,
//     importantOnly: importantOnly,
//     sortBy: 'createdAt',
//     sortOrder: 'desc',
//   });

//   const { data: categoryStats } = useGetCategoryStatsQuery();

//   const taxUpdates = data?.data || [];
//   const pagination = data?.pagination || {};

//   const isNewUpdate = (createdAt) => {
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     return new Date(createdAt) > sevenDaysAgo;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Latest Tax & Compliance Updates
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Stay informed with the latest government notifications, tax updates, and compliance requirements
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search updates..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Category Filter */}
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               <select
//                 value={category}
//                 onChange={(e) => {
//                   setCategory(e.target.value);
//                   setPage(1);
//                 }}
//                 className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[180px]"
//               >
//                 <option value="All">All Categories</option>
//                 <option value="GST">GST</option>
//                 <option value="Income Tax">Income Tax</option>
//                 <option value="MCA">MCA</option>
//                 <option value="RBI">RBI</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Important Only Toggle */}
//             <button
//               onClick={() => {
//                 setImportantOnly(!importantOnly);
//                 setPage(1);
//               }}
//               className={`px-4 py-2.5 rounded-lg border flex items-center gap-2 ${
//                 importantOnly
//                   ? 'bg-red-50 border-red-200 text-red-700'
//                   : 'bg-white border-gray-300 text-gray-700'
//               }`}
//             >
//               <AlertCircle size={18} />
//               Important Only
//             </button>
//           </div>
//         </div>

//         {/* Updates Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {taxUpdates.map((update) => (
//             <div
//               key={update._id}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//             >
//               {/* Badges */}
//               <div className="flex gap-2 mb-4">
//                 {isNewUpdate(update.createdAt) && (
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
//                     New
//                   </span>
//                 )}
//                 {update.isImportant && (
//                   <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
//                     Important
//                   </span>
//                 )}
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
//                   {update.category}
//                 </span>
//               </div>

//               {/* Title */}
//               <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//                 {update.title}
//               </h3>

//               {/* Summary */}
//               <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                 {update.shortSummary}
//               </p>

//               {/* Meta Info */}
//               <div className="space-y-2 mb-4 text-sm text-gray-500">
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} />
//                   <span>Effective: {new Date(update.effectiveDate).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Tag size={16} />
//                   <span>{update.whoIsAffected}</span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2 pt-4 border-t">
//                 <button
//                   onClick={() => window.location.href = `/tax-updates/${update._id}`}
//                   className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
//                 >
//                   Read More
//                 </button>
//                 {update.pdfUrl && (
//                   <a
//                     href={update.pdfUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
//                   >
//                     <Download size={16} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex justify-center gap-2">
//             <button
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}
//               className="px-4 py-2 border rounded-lg disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2">
//               Page {pagination.page} of {pagination.pages}
//             </span>
//             <button
//               onClick={() => setPage(page + 1)}
//               disabled={page === pagination.pages}
//               className="px-4 py-2 border rounded-lg disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {taxUpdates.length === 0 && (
//           <div className="text-center py-12">
//             <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No updates found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











// pages/TaxUpdates.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllTaxUpdatesQuery, useGetCategoryStatsQuery } from '../redux/apis/taxUpdateApi';
import { Search, Filter, FileText, Calendar, Tag, AlertCircle, Download, ExternalLink } from 'lucide-react';

export default function TaxUpdates() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [importantOnly, setImportantOnly] = useState(false);

  const { data, isLoading } = useGetAllTaxUpdatesQuery({
    page,
    limit: 9,
    category: category !== 'All' ? category : undefined,
    search: search || undefined,
    importantOnly: importantOnly,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { data: categoryStats } = useGetCategoryStatsQuery();

  const taxUpdates = data?.data || [];
  const pagination = data?.pagination || {};

  const isNewUpdate = (createdAt) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(createdAt) > sevenDaysAgo;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Tax & Compliance Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           Stay updated with official tax, regulatory, and financial notifications impacting businesses and individuals.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search updates..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[180px]"
              >
                <option value="All">All Categories</option>
                <option value="GST">GST</option>
                <option value="Income Tax">Income Tax</option>
                <option value="MCA">MCA</option>
                <option value="RBI">RBI</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Important Only Toggle */}
            <button
              onClick={() => {
                setImportantOnly(!importantOnly);
                setPage(1);
              }}
              className={`px-4 py-2.5 rounded-lg border flex items-center gap-2 ${
                importantOnly
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <AlertCircle size={18} />
              Important Only
            </button>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {taxUpdates.map((update) => (
            <div
              key={update._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {isNewUpdate(update.createdAt) && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                    New
                  </span>
                )}
                {update.isImportant && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                    Important
                  </span>
                )}
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {update.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {update.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {update.shortSummary}
              </p>

              {/* Meta Info */}
              <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Effective: {new Date(update.effectiveDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{update.whoIsAffected}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Link
                  to={`/tax-updates/${update._id}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center"
                >
                  Read More
                </Link>
                {update.pdfUrl && (
                  <a
                    href={update.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Download size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.pages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {taxUpdates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No updates found</p>
          </div>
        )}
      </div>
    </div>
  );
}