
import { useParams } from "react-router-dom";
import { useVerifyApplicationQuery } from "../redux/apis/verifyApi";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";

export default function VerifyPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useVerifyApplicationQuery(id);

  /* ---------- LOADING ---------- */
  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin text-blue-700" size={50} />
      </div>
    );

  /* ---------- ERROR ---------- */
  if (error || !data?.success)
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-gray-100">
        <div className="text-center bg-white shadow-xl p-10 rounded-2xl">
          <XCircle size={60} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-600">
            Verification Failed
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Invalid or expired verification link
          </p>
        </div>
      </div>
    );

  const app = data.data;
  const approved = app.status === "Approved";

  /* ---------- COPY REF ---------- */
  // const copyRef = () => {
  //   navigator.clipboard.writeText(app.id);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4">

      <div className="relative w-full max-w-md">

        {/* glow background */}
        <div className={`absolute inset-0 blur-3xl opacity-30 rounded-full ${
          approved ? "bg-green-400" : "bg-red-400"
        }`} />

        {/* CARD */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 text-center transition">

          {/* TOP ICON */}
          <div className="flex justify-center mb-4">
            {approved ? (
              <CheckCircle2
                size={70}
                className="text-green-600 drop-shadow animate-scale-in"
              />
            ) : (
              <XCircle
                size={70}
                className="text-red-600 drop-shadow animate-scale-in"
              />
            )}
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Document Verification
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Official Verification Result
          </p>

          {/* USER INFO */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {app.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {app.service}
            </p>
          </div>

          {/* STATUS */}
          <div className="mt-6">

            <span className="text-sm text-gray-500">Status</span>

            <div
              className={`mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                approved
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <ShieldCheck size={16} />
              {app.status}
            </div>

          </div>

          {/* REF ID */}
          <div className="mt-6 border-t pt-4">

            <p className="text-xs text-gray-400 mb-1">Reference ID</p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
              {app.id}

              {/* <button
                onClick={copyRef}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                <Copy size={15}/>
              </button> */}
            </div>

          </div>

          {/* FOOTER */}
          <p className="text-xs text-gray-400 mt-6">
            Verified by CADMA Associates Pvt Ltd
          </p>

        </div>
      </div>
    </div>
  );
}