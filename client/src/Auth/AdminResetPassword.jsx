
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/apis/adminApi";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiLock, FiArrowLeft } from "react-icons/fi";

export default function AdminResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] =
    useResetPasswordMutation();

  const email = sessionStorage.getItem("resetEmail");

  /* SECURITY: direct access block */

  useEffect(() => {

    if (!email) {
      navigate("/admin-forgot-password", { replace: true });
    }

  }, [email, navigate]);

  /* PASSWORD STRENGTH */

  const getStrength = () => {

    if (password.length < 6) return "Weak";

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      password.length >= 8
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      await resetPassword({
        email,
        newPassword: password
      }).unwrap();

      /* CLEAR SESSION */

      sessionStorage.removeItem("resetEmail");

      toast.success("Password updated successfully");

      /* REDIRECT LOGIN */

      navigate("/adminlogin", { replace: true });

    } catch (err) {

      toast.error(
        err?.data?.message || "Reset failed"
      );

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 text-blue-500 flex items-center gap-1"
        >
          <FiArrowLeft /> Back
        </button>

        {/* HEADER */}

        <div className="text-center mb-6">

          <div className="flex justify-center text-3xl text-blue-600 mb-2">
            <FiLock />
          </div>

          <h2 className="text-2xl font-bold">
            Reset Password
          </h2>

          <p className="text-sm text-gray-500">
            Create a new secure password
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* PASSWORD */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>

          {/* STRENGTH */}

          <p className="text-sm text-gray-500">
            Password strength:
            <span className="ml-2 font-semibold">
              {getStrength()}
            </span>
          </p>

          {/* CONFIRM PASSWORD */}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {isLoading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
}