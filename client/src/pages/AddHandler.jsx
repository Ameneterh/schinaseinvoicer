import { motion } from "framer-motion";
import { Input } from "../components/Input";
import {
  CircleUserRound,
  Mail,
  Lock,
  Loader,
  Eye,
  EyeOff,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore.js";
import { useBusinessStore } from "../store/businessStore.js";
import MainLayout from "../layout/MainLayout.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AddHandler() {
  const navigate = useNavigate();
  const { getAllBusinesses } = useBusinessStore();
  const { addUser, error, isLoading, user } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("handler");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");

  const [businesses, setBusinesses] = useState([]);

  const handleRegisterHandler = async (e) => {
    e.preventDefault();

    try {
      await addUser({ fullname, email, phoneNumber, password, role, business });
      navigate("/activate-handler");
    } catch (error) {
      console.log(error);
    }
  };

  // get all businesses
  const getBusinesses = async () => {
    try {
      const { businesses } = await getAllBusinesses();

      const userBusiness = businesses.filter(
        (business) => business._id === user.business._id,
      );
      setBusinesses(userBusiness);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-20 max-w-6xl min-h-screen w-full mx-auto mt-10 p-4 bg-opacity-80 text-black"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full bg-blue-950 bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-lg shadow-xl overflow-hidden my-10"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to bg-blue-500 text-transparent bg-clip-text">
              Add Handler
            </h2>

            <form
              onSubmit={handleRegisterHandler}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  icon={CircleUserRound}
                  type="text"
                  placeholder="Name of Handler"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Handler Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
                >
                  <option>Select Business Affiliation</option>
                  {businesses &&
                    businesses.map((business, index) => {
                      return (
                        <option key={index} value={business._id}>
                          {business.business_name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="flex flex-col items-start lg:flex-row gap-4">
                <div className="flex flex-col gap-3 w-full">
                  <Input
                    icon={Phone}
                    type={"text"}
                    placeholder="Handler Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />

                  <div className="relative flex items-center w-full">
                    <Input
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Strong Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div className="p-3 w-full bg-sky-50 text-sm text-center mt-2 rounded-md">
                    <p>
                      By clicking on <b>Add Handler</b>, you indicate your
                      agreement with <b>ALL</b> our{" "}
                      <Link
                        to={"/t&c"}
                        className="block text-blue-600 hover:underline underline-offset-2 "
                      >
                        Terms and Conditions
                      </Link>
                    </p>
                  </div>
                </div>
                {/* password strength meter */}
                <PasswordStrengthMeter password={password} />
              </div>

              {error && (
                <p className="text-red-800 font-semibold mt-2 p-2 text-center bg-red-100 rounded">
                  {error}
                </p>
              )}

              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-700 border border-green-700 hover:border-white hover:text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  "Add Handler"
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Already registered your Handler?{" "}
              <Link
                to="/add-handler"
                className="text-green-400 hover:underline"
              >
                Add Another
              </Link>{" "}
              or{" "}
              <Link to="/user-login" className="text-green-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
