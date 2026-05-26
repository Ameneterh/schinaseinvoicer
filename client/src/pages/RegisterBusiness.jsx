import { motion } from "framer-motion";
import { Input } from "../components/Input";
import {
  CircleUserRound,
  Mail,
  Lock,
  Headset,
  MapPinHouse,
  FilePenLine,
  FilePlus,
  Handshake,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

import MainLayout from "../layout/MainLayout";
import { useBusinessStore } from "../store/businessStore";
import { useAuthStore } from "../store/authStore";
// import { useBusinessStore } from "../store/businessStore";

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

export default function RegisterBusiness() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setUserEmail] = useState("");
  const [phoneNumber, setUserPhone] = useState("");
  const [password, setPassword] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const [business_name, setName] = useState("");
  const [business_email, setEmail] = useState("");
  const [business_phone, setPhone] = useState("");
  const [business_address, setAddress] = useState("");
  const [banker, setBanker] = useState("");
  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [bizLogo, setBizLogo] = useState(null);
  const [addedLogo, setAddedLogo] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  // const { addBusiness, error, isLoading } = useBusinessStore();
  const { addUser, error, isLoading } = useAuthStore();

  console.log(bizLogo);

  const handleUploadBizLogo = async () => {
    try {
      if (!bizLogo) {
        setImageUploadError("Please, select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + bizLogo.name;

      console.log(fileName);

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, bizLogo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setAddedLogo({ image: downloadURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed!!");
      setImageUploadProgress(null);
      // console.log(error);
    }
  };

  const handleRegisterBusinessOwner = async (e) => {
    e.preventDefault();

    try {
      await addUser({
        fullname,
        email,
        phoneNumber,
        password,
        role,
        business_name,
        business_email,
        business_phone,
        business_address,
        banker,
        account_name,
        account_number,
        business_logo: addedLogo?.image,
      });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl min-h-screen w-full mx-auto p-4 bg-opacity-80 text-black mt-20"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full bg-white backdrop-filter backdrop-blur-xl rounded-lg shadow-xl overflow-hidden my-10"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-950 to bg-blue-500 text-transparent bg-clip-text">
              Register Your Account/Business
            </h2>

            <form
              onSubmit={handleRegisterBusinessOwner}
              className="flex flex-col gap-3"
            >
              {/* business owner details */}
              <div className="flex items-center gap-2">
                <p className="text-orange-500 text-xl md:text-2xl font-bold">
                  Business Owner Details
                </p>
                <p className="h-[2px] bg-orange-500 w-full flex-1 hidden md:inline-block"></p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  icon={CircleUserRound}
                  type="text"
                  // placeholder="Business Owner's Name"
                  label="Business Owner's Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <Input
                  icon={Mail}
                  type="email"
                  // placeholder="Business Owner's Email"
                  label="Business Owner's Email"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-start lg:flex-row gap-4">
                <Input
                  icon={Lock}
                  type="text"
                  // placeholder="Business Owner's Phone"
                  label="Business Owner's Phone"
                  value={phoneNumber}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
                <div className="flex flex-col gap-3 w-full">
                  <div className="relative flex items-center w-full">
                    <Input
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      // placeholder="Enter Strong Password"
                      label="Create Strong Password"
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
                </div>
                <div className="flex flex-col w-full relative mt-2">
                  <label
                    htmlFor="validity"
                    className="text-sm mb-1 absolute -top-3 left-2 bg-white px-1"
                  >
                    Select User Role
                  </label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-3 pr-3 py-[6px] bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
                  >
                    <option value="">Select User Role</option>
                    <option value="businessAdmin">Business Admin</option>
                  </select>
                </div>
              </div>
              {/* password strength meter */}
              <PasswordStrengthMeter password={password} />

              {/* <motion.button
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
              </motion.button> */}
              {/* </form> */}

              {/* business details */}
              {/* <form
              onSubmit={handleRegisterBusiness}
              className="flex flex-col gap-3"
            > */}

              {/* business details */}
              <div className="flex items-center gap-2">
                <p className="text-orange-500 text-xl md:text-2xl font-bold">
                  Business Details
                </p>
                <p className="h-[2px] bg-orange-500 w-full flex-1 hidden md:inline-block"></p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  icon={CircleUserRound}
                  type="text"
                  // placeholder="Name of Business"
                  label="Business Name"
                  value={business_name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  icon={Mail}
                  type="email"
                  // placeholder="Business Email"
                  label="Business Email"
                  value={business_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  icon={Lock}
                  type="text"
                  // placeholder="Business Phone"
                  label="Business Phone"
                  value={business_phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  icon={MapPinHouse}
                  type="text"
                  // placeholder="Business Address"
                  label="Business Address"
                  value={business_address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* <Input
                icon={MapPinHouse}
                type="file"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              /> */}

              {/* <div className="flex flex-col md:flex-row gap-4 items-end justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg">
                <div className="flex flex-col font-light w-full">
                  <p className="text-white md:text-nowrap">Business Logo</p>
                  <Input
                    icon={FilePlus}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBizLogo(e.target.files[0])}
                    // value={bizLogo}
                    // onChange={(e) => setBizLogo(e.target.value)}
                  />
                </div>

                <motion.div
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer text-white flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // type="submit"
                  icon={FilePenLine}
                  onClick={handleUploadBizLogo}
                  disabled={imageUploadProgress}
                >
                  {imageUploadProgress ? (
                    <div className="flex items-center gap-2">
                      <CircularProgressbar
                        className="h-8 w-8"
                        value={imageUploadProgress}
                      />
                      <span>{`${imageUploadProgress || 0}%`}</span>
                    </div>
                  ) : (
                    "Upload Logo"
                  )}
                </motion.div>
              </div> */}

              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  icon={FilePenLine}
                  type="text"
                  // placeholder="Banker's Name"
                  label="Banker's Name"
                  value={banker}
                  onChange={(e) => setBanker(e.target.value)}
                />
                <Input
                  icon={FilePenLine}
                  type="text"
                  // placeholder="Account Name"
                  label="Account Name"
                  value={account_name}
                  onChange={(e) => setAccountName(e.target.value)}
                />
                <Input
                  icon={FilePenLine}
                  type="text"
                  // placeholder="Account Number"
                  label="Account Number"
                  value={account_number}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              {/* agreement with terms and conditions */}
              <div className="p-3 w-full bg-sky-50 text-sm text-center mt-2 rounded-md">
                <p>
                  By clicking on <b>Register Business</b>, you indicate your
                  agreement with <b>ALL</b> our{" "}
                  <Link
                    to={"/t&c"}
                    className="block text-blue-600 hover:underline underline-offset-2 "
                  >
                    Terms and Conditions
                  </Link>
                </p>
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
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center gap-2">
                    <Handshake size={18} />
                    Register Account/Business
                  </span>
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-400 bg-opacity-50 flex justify-center">
            <p className="text-sm text-black">
              Already registered your business?{" "}
              <Link to="/add-handler" className="text-blue-800 hover:underline">
                Add Handler
              </Link>{" "}
              or{" "}
              <Link to="/user-login" className="text-blue-800 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
