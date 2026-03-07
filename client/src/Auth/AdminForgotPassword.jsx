

// import { useState } from "react";
// import { useForgotPasswordMutation } from "../redux/apis/adminApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FiMail, FiShield, FiArrowLeft } from "react-icons/fi";

// export default function AdminForgotPassword() {

//   const [email, setEmail] = useState("");

//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       await forgotPassword({ email }).unwrap();

//       toast.success("OTP sent to email");

//       navigate("/admin-verify-otp", { state: { email } });

//     } catch (err) {

//       toast.error(err?.data?.message || "Failed");

//     }
//   };

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/adminlogin")}
//           className="absolute left-4 top-4 text-blue-500 hover:text-black flex items-center gap-1 text-sm"
//         >
//           <FiArrowLeft />
//           Back
//         </button>

//         {/* Header */}
//         <div className="text-center mb-6">

//           <div className="flex justify-center text-3xl text-blue-600 mb-2">
//             <FiShield />
//           </div>

//           <h2 className="text-2xl font-bold text-gray-800">
//             Forgot Password
//           </h2>

//           <p className="text-sm text-gray-500">
//             Enter your email to receive OTP
//           </p>

//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div className="relative">

//             <FiMail className="absolute left-3 top-3 text-gray-400" />

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
//               required
//             />

//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition shadow"
//           >

//             {isLoading ? "Sending..." : "Send OTP"}

//           </button>

//         </form>

//         {/* Bottom Login Link */}
//         <p className="text-center text-sm text-gray-500 mt-6">

//           Remember your password?{" "}
//           <span
//             onClick={() => navigate("/adminlogin")}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Back to Login
//           </span>

//         </p>

//       </div>

//     </div>
//   );
// }





import { useState } from "react";
import { useForgotPasswordMutation } from "../redux/apis/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiShield, FiArrowLeft } from "react-icons/fi";

export default function AdminForgotPassword() {

  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter valid email");
      return;
    }

    try {

      await forgotPassword({ email }).unwrap();

      sessionStorage.setItem("resetEmail", email);

      toast.success("OTP sent to email");

      navigate("/admin-verify-otp");

    } catch (err) {

      toast.error(err?.data?.message || "Failed to send OTP");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

        <button
          onClick={() => navigate("/adminlogin")}
          className="absolute left-4 top-4 text-blue-500 hover:text-black flex items-center gap-1 text-sm"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-6">

          <div className="flex justify-center text-3xl text-blue-600 mb-2">
            <FiShield />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password
          </h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">

            <FiMail className="absolute left-3 top-3 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>

        </form>

      </div>

    </div>

  );
}



