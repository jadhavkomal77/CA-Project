import {
  useGetAdminBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} from "../redux/apis/bookingApi";
import { toast } from "react-toastify";
import { useState } from "react";

export default function AdminBookings() {
  const { data: bookings = [], isLoading } = useGetAdminBookingsQuery();
  const [updateStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (isLoading) return <p className="p-6">Loading bookings...</p>;

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await deleteBooking(id).unwrap();
      toast.success("Booking deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 FILTER LOGIC
  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.mobile.includes(search) ||
      b.planTitle.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" ? true : b.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, mobile or plan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-48"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr key={b._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {b.planTitle}
                  <div className="text-xs text-gray-500">
                    {b.currency}{b.price} {b.unit}
                  </div>
                </td>

                <td className="p-3">{b.name}</td>

                <td className="p-3">
                  <a
                    href={`tel:${b.mobile}`}
                    className="text-blue-600 underline"
                  >
                    {b.mobile}
                  </a>
                </td>

                <td className="p-3">{b.address}</td>

                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleStatus(b._id, e.target.value)
                    }
                    className={`border rounded px-2 py-1
                      ${
                        b.status === "confirmed"
                          ? "bg-green-100"
                          : b.status === "cancelled"
                          ? "bg-red-100"
                          : "bg-yellow-100"
                      }
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-3 flex gap-3">
                  <a
                    href={`https://wa.me/91${b.mobile}?text=Hello ${b.name}, your booking for ${b.planTitle}`}
                    target="_blank"
                    className="text-green-600 font-medium"
                  >
                    WhatsApp
                  </a>

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
