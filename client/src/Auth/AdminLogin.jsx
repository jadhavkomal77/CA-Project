
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/apis/adminApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [adminLogin, { isSuccess, isError, error, isLoading }] =
    useAdminLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      adminLogin(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      navigate("/admin");
    }

    if (isError) {
      toast.error(error?.data?.message || "Invalid email or password");
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-md w-full max-w-md p-8"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-6">
          Admin Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter your email"
              className={`w-full mt-1 px-4 py-2 rounded-md border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-1 focus:ring-black outline-none transition`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                placeholder="Enter your password"
                className={`w-full mt-1 px-4 py-2 pr-10 rounded-md border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-1 focus:ring-black outline-none transition`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin-forgot-password")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-gray-800 text-white py-2.5 rounded-md font-medium transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Back */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:text-black transition"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}