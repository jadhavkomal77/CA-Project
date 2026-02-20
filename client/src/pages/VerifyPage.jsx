import { useParams } from "react-router-dom";
import { useVerifyApplicationQuery } from "../redux/apis/verifyApi";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useVerifyApplicationQuery(id);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-700" size={40} />
      </div>
    );

  if (error || !data?.success)
    return (
      <div className="h-screen flex justify-center items-center text-red-600 font-semibold">
        Verification Failed
      </div>
    );

  const app = data.data;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">

        <h1 className="text-2xl font-bold mb-4">Document Verification</h1>

        {app.status === "Approved" ? (
          <CheckCircle className="mx-auto text-green-600 mb-4" size={60} />
        ) : (
          <XCircle className="mx-auto text-red-600 mb-4" size={60} />
        )}

        <p className="text-lg font-semibold">{app.name}</p>
        <p className="text-gray-600">{app.service}</p>

        <div className="mt-4">
          <span className="font-semibold">Status: </span>
          <span
            className={
              app.status === "Approved"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {app.status}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Ref ID: {app.id}
        </p>

      </div>

    </div>
  );
}