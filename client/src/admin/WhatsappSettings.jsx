
// import { useState, useEffect } from "react";
// import {
//   useGetSettingsQuery,
//   useUpdateWhatsAppMutation,
// } from "../redux/apis/settingApi";
// import { FaWhatsapp, FaSave } from "react-icons/fa";

// export default function WhatsappSettings() {
//   const { data, isLoading } = useGetSettingsQuery();
//   const [updateWhatsApp, { isLoading: updating }] =
//     useUpdateWhatsAppMutation();

//   const [number, setNumber] = useState("");

//   useEffect(() => {
//     if (data?.whatsappNumber) {
//       setNumber(data.whatsappNumber);
//     }
//   }, [data]);

//   const formatDate = (date) =>
//     new Date(date).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!number) return alert("WhatsApp number required");

//     await updateWhatsApp({ whatsappNumber: number });
//     alert("WhatsApp number updated");
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="flex justify-center mt-10 px-4">
//       <div className="w-full max-w-2xl">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">
//             WhatsApp Settings
//           </h1>
//           <span className="badge badge-success">
//             Active
//           </span>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-xl shadow-lg border p-6 space-y-6">

//           {/* Input */}
//           <div>
//             <label className="block font-semibold mb-2">
//               WhatsApp Number
//             </label>

//             <div className="flex items-center border rounded-lg px-3">
//               <FaWhatsapp className="text-green-500 text-xl" />
//               <input
//                 type="text"
//                 value={number}
//                 onChange={(e) => setNumber(e.target.value)}
//                 className="w-full px-3 py-2 outline-none"
//                 placeholder="Enter WhatsApp number"
//               />
//             </div>

//             <p className="text-sm text-gray-500 mt-1">
//               Country code already added (91)
//             </p>
//           </div>

//           {/* Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gray-100 rounded-lg p-4">
//               <p className="text-sm text-gray-500">
//                 Added On
//               </p>
//               <p className="font-medium">
//                 {formatDate(data.createdAt)}
//               </p>
//             </div>

//             <div className="bg-gray-100 rounded-lg p-4">
//               <p className="text-sm text-gray-500">
//                 Last Updated
//               </p>
//               <p className="font-medium">
//                 {formatDate(data.updatedAt)}
//               </p>
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={updating}
//             className="w-full flex items-center justify-center gap-2
//                        bg-green-600 hover:bg-green-700
//                        text-white font-semibold
//                        py-3 rounded-lg transition"
//           >
//             <FaSave />
//             {updating ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import {
  useGetSettingsQuery,
  useUpdateWhatsAppMutation,
} from "../redux/apis/settingApi";
import { FaWhatsapp, FaSave } from "react-icons/fa";

export default function WhatsappSettings() {
  const { data, isLoading, isError } = useGetSettingsQuery();
  const [updateWhatsApp, { isLoading: updating }] =
    useUpdateWhatsAppMutation();

  const [number, setNumber] = useState("");

  useEffect(() => {
    if (data?.whatsappNumber) {
      setNumber(data.whatsappNumber);
    }
  }, [data]);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!number.trim()) {
      return alert("WhatsApp number is required");
    }

    try {
      await updateWhatsApp({ whatsappNumber: number }).unwrap();
      alert("WhatsApp number updated successfully ✅");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <p className="text-gray-600">Loading settings...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center mt-20">
        <p className="text-red-500">Failed to load settings</p>
      </div>
    );

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            WhatsApp Settings
          </h1>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            Active
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">

          {/* WhatsApp Input */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              WhatsApp Number
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-400 transition">
              <FaWhatsapp className="text-green-500 text-xl mr-3" />
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full outline-none"
                placeholder="Enter WhatsApp number (without +91)"
              />
            </div>

          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-sm text-gray-500 mb-1">
                Added On
              </p>
              <p className="font-medium text-gray-800">
                {formatDate(data?.createdAt)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-sm text-gray-500 mb-1">
                Last Updated
              </p>
              <p className="font-medium text-gray-800">
                {formatDate(data?.updatedAt)}
              </p>
            </div>

          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            disabled={updating}
            className="w-full flex items-center justify-center gap-2
                       bg-green-600 hover:bg-green-700
                       text-white font-semibold
                       py-3 rounded-xl transition
                       disabled:opacity-50"
          >
            <FaSave />
            {updating ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}
