import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mb-6">
          Your service booking has been successfully submitted.  
          Our team will contact you shortly.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Back to Pricing
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
