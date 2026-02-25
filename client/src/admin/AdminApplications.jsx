
import { useState } from "react";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGeneratePDFMutation,
  useDownloadPDFMutation,
  useGetAnalyticsQuery,
} from "../redux/apis/applicationApi";

import {
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Trash2,
  Download,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";

import { toast } from "react-toastify";

export default function AdminApplications() {
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(null);

  const { data, isLoading } = useGetAllApplicationsQuery({
    status: statusFilter || undefined,
  });

  const { data: analytics } = useGetAnalyticsQuery();

  const applications = data?.data || [];
  const stats = analytics?.data || {};

  const [updateStatus] = useUpdateApplicationStatusMutation();
  const [deleteApplication] = useDeleteApplicationMutation();
  const [generatePDF] = useGeneratePDFMutation();
  const [downloadPDF] = useDownloadPDFMutation();

  // Filter applications by search query
  const filteredApplications = applications.filter((app) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      app.userDetails?.name?.toLowerCase().includes(query) ||
      app.userDetails?.email?.toLowerCase().includes(query) ||
      app.serviceName?.toLowerCase().includes(query)
    );
  });

  /* STATUS UPDATE */
  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      await deleteApplication(id).unwrap();
      toast.success("Application deleted successfully");
    } catch {
      toast.error("Failed to delete application");
    }
  };

  /* GENERATE PDF */
  const handleGeneratePDF = async (app) => {
    if (app.status !== "Approved") {
      toast.error("Only approved applications can generate PDF");
      return;
    }

    // Set loading state
    setGeneratingPDF(app._id);

    try {
      await generatePDF(app._id).unwrap();
      toast.success("PDF generated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "PDF generation failed");
    } finally {
      // Clear loading state
      setGeneratingPDF(null);
    }
  };

  /* DOWNLOAD PDF */
  const handleDownload = async (app) => {
    if (app.status !== "Approved" || !app.pdfUrl) {
      toast.error("PDF not available for download");
      return;
    }

    try {
      const blob = await downloadPDF(app._id).unwrap();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `application-${app._id}.pdf`;
      a.click();
      
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded successfully");
    } catch {
      toast.error("Failed to download PDF");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Applications Management
            </h1>
            <p className="text-gray-600">Manage and review all submitted applications</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Applications"
            value={stats.total || 0}
            icon={<Users className="w-6 h-6" />}
            gradient="from-blue-500 to-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Approved"
            value={stats.approved || 0}
            icon={<CheckCircle2 className="w-6 h-6" />}
            gradient="from-green-500 to-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Pending"
            value={stats.pending || 0}
            icon={<Clock className="w-6 h-6" />}
            gradient="from-yellow-500 to-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Approval Rate"
            value={stats.approvalRate ? `${stats.approvalRate}%` : "0%"}
            icon={<TrendingUp className="w-6 h-6" />}
            gradient="from-purple-500 to-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all outline-none min-w-[160px]"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium text-lg mb-1">
                          No applications found
                        </p>
                        <p className="text-gray-500 text-sm">
                          {searchQuery || statusFilter
                            ? "Try adjusting your filters"
                            : "No applications have been submitted yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {app.userDetails?.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {app.userDetails?.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.userDetails?.email || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.serviceName || "N/A"}
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <ActionButton
                            onClick={() => handleStatus(app._id, "Approved")}
                            color="green"
                            tooltip="Approve"
                            disabled={app.status === "Approved"}
                          >
                            <CheckCircle size={18} />
                          </ActionButton>

                          <ActionButton
                            onClick={() => handleStatus(app._id, "Rejected")}
                            color="red"
                            tooltip="Reject"
                            disabled={app.status === "Rejected"}
                          >
                            <XCircle size={18} />
                          </ActionButton>

                          <ActionButton
                            onClick={() => handleGeneratePDF(app)}
                            disabled={app.status !== "Approved" || generatingPDF === app._id}
                            color="blue"
                            tooltip={generatingPDF === app._id ? "Generating PDF..." : "Generate PDF"}
                            isLoading={generatingPDF === app._id}
                          >
                            {generatingPDF === app._id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <FileText size={18} />
                            )}
                          </ActionButton>

                          <ActionButton
                            onClick={() => handleDownload(app)}
                            disabled={app.status !== "Approved" || !app.pdfUrl}
                            color="dark"
                            tooltip="Download PDF"
                          >
                            <Download size={18} />
                          </ActionButton>

                          <ActionButton
                            onClick={() => handleDelete(app._id)}
                            color="gray"
                            tooltip="Delete"
                          >
                            <Trash2 size={18} />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        {filteredApplications.length > 0 && (
          <div className="text-sm text-gray-600 text-center">
            Showing <span className="font-semibold">{filteredApplications.length}</span> of{" "}
            <span className="font-semibold">{applications.length}</span> applications
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, icon, gradient, bgColor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <div className={`text-white ${gradient} bg-gradient-to-br rounded-lg p-2`}>
          {icon}
        </div>
      </div>
    </div>
    <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: {
      bg: "bg-green-100",
      text: "text-green-800",
      dot: "bg-green-500",
    },
    Rejected: {
      bg: "bg-red-100",
      text: "text-red-800",
      dot: "bg-red-500",
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
    },
  };

  const style = styles[status] || styles.Pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
};

const ActionButton = ({ children, onClick, disabled, color, tooltip, isLoading }) => {
  const colors = {
    green: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
    red: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    dark: "bg-gray-800 text-white hover:bg-gray-900 border-gray-700",
    gray: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      title={tooltip}
      className={`
        relative p-2.5 rounded-lg transition-all duration-200 border
        ${disabled || isLoading
          ? "opacity-40 cursor-not-allowed bg-gray-50 border-gray-200"
          : `${colors[color]} hover:scale-105 active:scale-95 shadow-sm hover:shadow`
        }
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
      `}
    >
      {children}
    </button>
  );
};