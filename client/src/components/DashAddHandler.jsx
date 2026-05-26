import { motion } from "framer-motion";
import { Input } from "../components/Input";
import {
  CircleUserRound,
  Mail,
  Lock,
  Loader,
  UserRoundPlus,
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

export default function DashAddHandler() {
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
      await addUser({
        fullname,
        email,
        phoneNumber,
        password,
        role,
        business: user.business._id,
      });
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
    <div className="mx-auto p-3 md:px-10 w-full bg-white">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full bg-white rounded-lg shadow-xl overflow-hidden p-2 md:p-6"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to bg-blue-500 text-transparent bg-clip-text">
          Add Handler
        </h2>
        <div className="p-2">
          <form
            onSubmit={handleRegisterHandler}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                icon={CircleUserRound}
                type="text"
                // placeholder="Name of Handler"
                label="Name of Handler"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                icon={Mail}
                type="email"
                // placeholder="Handler Email"
                label="Handler Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-col w-full relative mt-2">
                <label
                  htmlFor="validity"
                  className="text-sm mb-1 absolute -top-3 left-2 bg-white px-1"
                >
                  Select Business Affiliation
                </label>
                <select
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full pl-3 pr-3 py-[6px] bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
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
            </div>

            <div className="flex flex-col items-start lg:flex-row gap-4">
              <div className="flex flex-col gap-3 w-full">
                <Input
                  icon={Phone}
                  type={"text"}
                  // placeholder="Handler Phone Number"
                  label="Handler Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <div className="relative flex items-center w-full">
                  <Input
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    // placeholder="Enter Strong Password"
                    label="Enter Strong Password"
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
              className="py-3 px-8 bg-gradient-to-r from-slate-600 to-blue-800 rounded-lg hover:border-white hover:from-blue-800 hover:to-slate-600 border focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                <span className="flex items-center gap-2">
                  <UserRoundPlus className="size-5" />
                  Add Handler
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
