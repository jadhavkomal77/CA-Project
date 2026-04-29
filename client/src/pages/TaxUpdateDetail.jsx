
import { useParams, Link } from 'react-router-dom';
import { useGetTaxUpdateQuery } from '../redux/apis/taxUpdateApi';
import { Calendar, Tag, FileText, Download, ExternalLink, ArrowLeft } from 'lucide-react';

export default function TaxUpdateDetail() {
  const { id } = useParams(); 
  const { data, isLoading, error } = useGetTaxUpdateQuery(id);

  const update = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-4">Update not found</p>
          <Link
            to="/tax-updates"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Back to Updates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/tax-updates"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Updates
        </Link>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Badges */}
          <div className="flex gap-2 mb-6">
            {update.isNew && (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                New
              </span>
            )}
            {update.isImportant && (
              <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold">
                Important
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
              {update.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{update.title}</h1>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} />
              <div>
                <p className="text-sm text-gray-500">Effective Date</p>
                <p className="font-medium">{new Date(update.effectiveDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Tag size={20} />
              <div>
                <p className="text-sm text-gray-500">Affected</p>
                <p className="font-medium">{update.whoIsAffected}</p>
              </div>
            </div>
            {update.notificationNumber && (
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={20} />
                <div>
                  <p className="text-sm text-gray-500">Notification No.</p>
                  <p className="font-medium">{update.notificationNumber}</p>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{update.shortSummary}</p>
          </div>

          {/* Full Explanation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Detailed Explanation</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {update.fullExplanation}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t">
            {update.pdfUrl && (
              <a
                href={update.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download size={20} />
                Download PDF
              </a>
            )}
            {update.sourceLink && (
              <a
                href={update.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ExternalLink size={20} />
                View Source
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}