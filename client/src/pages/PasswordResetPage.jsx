import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordResetPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user_password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, user_password);

      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/user-login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-green-950 bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Reset Password
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative flex items-center w-full">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Strong Password"
                value={user_password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-green-500" />
                ) : (
                  <Eye className="size-5 text-green-500" />
                )}
              </div>
            </div>

            <div className="relative flex items-center w-full">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-green-500" />
                ) : (
                  <Eye className="size-5 text-green-500" />
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
