import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAdminRegisterMutation } from "../redux/apis/adminApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [
    adminRegister,
    { isSuccess, isError, error, isLoading },
  ] = useAdminRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name required"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Email required"),
      phone: yup
        .string()
        .min(10, "Invalid phone")
        .required("Phone required"),
      password: yup
        .string()
        .min(6, "Minimum 6 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => {
      adminRegister(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration Successful 🎉");
      navigate("/adminlogin");
    }

    if (isError) {
      toast.error(error?.data?.message || "Register failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen flex items-center justify-center from-indigo-50 to-indigo-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Admin Register
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "email", "phone", "password"].map((field) => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                {...formik.getFieldProps(field)}
                className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                  formik.touched[field] && formik.errors[field]
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-400 outline-none`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors[field]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/adminlogin"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
