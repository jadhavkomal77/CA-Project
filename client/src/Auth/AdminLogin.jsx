
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/apis/adminApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
      toast.success("Login successful ✅");
      navigate("/admin");
    }

    if (isError) {
      toast.error(error?.data?.message || "Invalid email or password");
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen flex items-center justify-center from-indigo-50 to-indigo-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        {/* BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm text-gray-600 hover:text-indigo-600 font-medium flex items-center gap-1"
        >
          ← Back to Home
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Admin Login
        </h2>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter Your Email"
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-400 outline-none`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                placeholder="Enter Your Password"
                className={`w-full mt-1 px-4 py-2 pr-10 rounded-lg border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-400 outline-none`}
              />

              {/* EYE ICON */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/adminregister"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
