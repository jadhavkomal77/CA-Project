
import { useState } from "react";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "../redux/apis/contactApi";

export default function AdminContacts() {
  const { data = [], isLoading } = useGetAllContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  if (isLoading) return <div className="p-10">Loading...</div>;

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <div className="p-4 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-center md:text-left">
          📩 Contact Requests
        </h2>

        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border px-4 py-2 rounded-lg 
            w-full md:w-72 
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => {
              const d = new Date(item.createdAt);
              const date = d.toLocaleDateString();
              const time = d.toLocaleTimeString();

              return (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 break-all">{item.email}</td>
                  <td className="px-4 py-3">{item.phone}</td>

                  {/* MESSAGE BUTTON */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(item)}
                      className="
                        inline-flex items-center gap-1
                        bg-gradient-to-r from-green-500 to-green-600
                        hover:from-green-700 hover:to-green-700
                        text-white text-xs font-semibold
                        px-3 py-1.5 rounded-full
                        shadow-md hover:shadow-lg
                        transition-all duration-200
                      "
                    >
                      👁 View
                    </button>
                  </td>

                  <td className="px-4 py-3">{date}</td>
                  <td className="px-4 py-3">{time}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        if (confirm("Delete this contact?")) {
                          deleteContact(item._id);
                        }
                      }}
                      className="
                        inline-flex items-center gap-1
                        bg-gradient-to-r from-red-500 to-red-600
                        hover:from-red-600 hover:to-red-700
                        text-white text-xs font-semibold
                        px-3 py-1.5 rounded-full
                        shadow-md hover:shadow-lg
                        transition-all duration-200
                      "
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              📄 Full Message
            </h3>

            <div className="bg-blue-50 text-blue-900 p-4 rounded-xl leading-relaxed break-words max-h-[60vh] overflow-y-auto">
              {selected.message}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="
                  bg-gradient-to-r from-red-500 to-red-500
                  hover:from-red-600 hover:to-red-700
                  text-white px-6 py-2 rounded-full
                  shadow-md hover:shadow-lg
                  transition-all
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
