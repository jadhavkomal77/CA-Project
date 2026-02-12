
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6">
      <div className="max-w-xl text-center animate-fade-in-up">
        
        {/* 404 TEXT */}
        <h1 className="text-[120px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-2 mb-3">
          Oops! Page not found
        </h2>

        <p className="text-gray-400 mb-8">
          The page you’re trying to reach doesn’t exist or has been moved.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              bg-white text-black 
              px-6 py-3 rounded-lg 
              font-semibold
              hover:bg-gray-200 transition
              shadow-lg
            "
          >
            <Home size={18} /> Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
              border border-gray-600
              px-6 py-3 rounded-lg
              text-gray-300
              hover:bg-gray-800 transition
            "
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
