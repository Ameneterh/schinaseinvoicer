import { motion } from "framer-motion";
import { Input } from "../components/Input";
import { HashLink } from "react-router-hash-link";
import toast from "react-hot-toast";
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
  CloudUpload,
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

  const [regPackage, setRegPackage] = useState("trial");
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

  const [avatar, setAvatar] = useState(null);
  const [addedAvatar, setAddedAvatar] = useState(null);

  const [userSignature, setUserSignature] = useState(null);
  const [addedSignature, setAddedSignature] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const [avatarUploadProgress, setAvatarUploadProgress] = useState(null);
  const [avatarUploadError, setAvatarUploadError] = useState(null);

  const [signatureUploadProgress, setSignatureUploadProgress] = useState(null);
  const [signatureUploadError, setSignatureUploadError] = useState(null);

  const { addUser, error, isLoading } = useAuthStore();

  // image max size
  const MAX_FILE_SIZE = 300 * 1024; // 300 KB

  const handleUploadAvatar = async () => {
    try {
      if (!avatar) {
        toast.error("Please, select an image");
        return;
      }

      // Validate file size
      if (avatar.size > MAX_FILE_SIZE) {
        toast.error(
          `Image size must not exceed 500 KB. Your file is ${(avatar.size / 1024).toFixed(0)} KB.`,
        );
        return;
      }

      setAvatarUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + avatar.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setAvatarUploadProgress(progress.toFixed(0));
        },
        (error) => {
          toast.error("Image upload failed!");
          setAvatarUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAvatarUploadProgress(null);
            setAvatarUploadError(null);
            setAddedAvatar({ image: downloadURL });
          });
          toast.success("Image uploaded successfully!");
        },
      );
    } catch (error) {
      toast.error("An error occurred while uploading the image.");
      console.log(error);

      if (error.code === "storage/unauthorized") {
        toast.error(
          "Upload failed. The image may exceed the allowed size limit.",
        );
      } else {
        toast.error("Image upload failed.");
      }

      setAvatarUploadProgress(null);
    }
  };

  const handleUploadSignature = async () => {
    try {
      if (!userSignature) {
        toast.error("Please, select an image");
        return;
      }

      // Validate file size
      if (userSignature.size > MAX_FILE_SIZE) {
        toast.error(
          `Image size must not exceed 500 KB. Your file is ${(userSignature.size / 1024).toFixed(0)} KB.`,
        );
        return;
      }

      setSignatureUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + userSignature.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, userSignature);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setSignatureUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setSignatureUploadError("Image upload failed!");
          setSignatureUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setSignatureUploadProgress(null);
            setSignatureUploadError(null);
            setAddedSignature({ image: downloadURL });
          });
          toast.success("Image uploaded successfully!");
        },
      );
    } catch (error) {
      console.log(error);

      if (error.code === "storage/unauthorized") {
        toast.error(
          "Upload failed. The image may exceed the allowed size limit.",
        );
      } else {
        toast.error("Image upload failed.");
      }

      setSignatureUploadProgress(null);
      // setSignatureUploadError("Image upload failed!!" + error);
      // setSignatureUploadProgress(null);
      // console.log(error);
    }
  };

  const handleUploadBizLogo = async () => {
    try {
      if (!bizLogo) {
        toast.error("Please, select an image");
        return;
      }

      // Validate file size
      if (bizLogo.size > MAX_FILE_SIZE) {
        toast.error(
          `Image size must not exceed 500 KB. Your file is ${(bizLogo.size / 1024).toFixed(0)} KB.`,
        );
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + bizLogo.name;

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
          toast.error("Image upload failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setAddedLogo({ image: downloadURL });
          });
          toast.success("Image uploaded successfully!");
        },
      );
    } catch (error) {
      console.log(error);

      if (error.code === "storage/unauthorized") {
        toast.error(
          "Upload failed. The image may exceed the allowed size limit.",
        );
      } else {
        toast.error("Image upload failed.");
      }

      setImageUploadProgress(null);
      // setImageUploadError("Image upload failed!!" + error);
      // setImageUploadProgress(null);
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
        avatar: addedAvatar?.image,
        staff_signature: addedSignature?.image,
        business_name,
        business_email,
        business_phone,
        business_address,
        banker,
        plan: regPackage,
        account_name,
        account_number,
        business_logo: addedLogo?.image,
      });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register business owner.");
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
              {/* account type */}
              <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-start">
                <div className="flex flex-col w-full md:w-1/2 relative mt-2">
                  <label
                    htmlFor="validity"
                    className="text-sm mb-1 absolute -top-3 left-2 bg-white px-1"
                  >
                    Select your preferred Account Type
                  </label>
                  <select
                    onChange={(e) => setRegPackage(e.target.value)}
                    className="w-full pl-3 pr-3 py-[6px] bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
                  >
                    <option value="" disabled>
                      Select your preferred account type
                    </option>
                    <option value="trial">Free Trial</option>
                    <option value="basic">Basic Package</option>
                    {/* <option value="premium">Premium Package</option> */}
                  </select>
                </div>

                <HashLink
                  smooth
                  to="/#account-types"
                  className="bg-blue-900 px-4 py-2 hover:opacity-85 text-white rounded font-medium text-nowrap"
                >
                  Review account types Here
                </HashLink>
              </div>

              {/* business owner details */}
              <div className="flex items-center gap-2">
                <p className="text-orange-500 text-xl md:text-2xl font-bold">
                  Business Owner Details
                </p>
                <p className="h-[2px] bg-orange-500 w-full flex-1 hidden md:inline-block"></p>
              </div>
              <p className="py-1 w-full bg-slate-300 rounded text-center text-sm font-semibold">
                PS: Please, use a valid email account you have access to; you
                will receive a code to activate your account.
              </p>

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
                  icon={Headset}
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
                      className="absolute right-2 inset-y-0 cursor-pointer flex items-center mt-2"
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
                    htmlFor="role"
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

              {/* add user avatar and user signature */}
              <div className="flex flex-col lg:flex-row gap-4 mt-2">
                {/* add user avatar */}
                <div className="flex flex-col w-full">
                  {regPackage !== "trial" && (
                    <div className="flex flex-col md:flex-row gap-4 items-end rounded-lg">
                      <div className="flex flex-col font-light w-full md:w-1/2">
                        <div className="text-sm font-medium">
                          <p className="md:text-nowrap">
                            User Avatar (Max 200kb)
                          </p>
                          {avatar && (
                            <p className="text-sm text-red-400 font-medium block">
                              Selected file size:{" "}
                              {(avatar.size / 1024).toFixed(0)} KB
                            </p>
                          )}
                        </div>
                        <Input
                          icon={FilePlus}
                          type="file"
                          accept="image/*"
                          onChange={(e) => setAvatar(e.target.files[0])}
                        />
                      </div>

                      {avatar && (
                        <img
                          src={avatar ? URL.createObjectURL(avatar) : ""}
                          alt="avatar preview"
                          className="w-10, h-10 object-cover rounded-full"
                        />
                      )}

                      <motion.div
                        className="w-fit text-nowrap py-2 px-2 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer text-white text-sm flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        // type="submit"
                        icon={FilePenLine}
                        onClick={handleUploadAvatar}
                        disabled={avatarUploadProgress}
                      >
                        {avatarUploadProgress ? (
                          <div className="flex items-center gap-2">
                            <CircularProgressbar
                              className="h-8 w-8"
                              value={avatarUploadProgress}
                            />
                            <span>{`${avatarUploadProgress || 0}%`}</span>
                          </div>
                        ) : (
                          // "Upload Avatar"
                          <CloudUpload />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {avatarUploadError && (
                    <span className="text-red-500">{avatarUploadError}</span>
                  )}
                </div>

                <div className="h-full bg-blue-950 w-2"></div>

                {/* add user signature */}
                <div className="flex flex-col w-full">
                  {regPackage !== "trial" && (
                    <div className="flex flex-col md:flex-row gap-4 items-end rounded-lg">
                      <div className="flex flex-col font-light w-full md:w-1/2">
                        <div className="text-sm font-medium">
                          <p className="md:text-nowrap">
                            User Signature (Max 200kb)
                          </p>
                          {userSignature && (
                            <p className="text-sm text-red-400 font-medium block">
                              Selected file size:{" "}
                              {(userSignature.size / 1024).toFixed(0)} KB
                            </p>
                          )}
                        </div>
                        <Input
                          icon={FilePlus}
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUserSignature(e.target.files[0])}
                        />
                      </div>

                      {userSignature && (
                        <img
                          src={
                            userSignature
                              ? URL.createObjectURL(userSignature)
                              : ""
                          }
                          alt="User Signature Preview"
                          className="w-10, h-10 object-cover rounded-full"
                        />
                      )}

                      <motion.div
                        className="w-fit text-nowrap py-2 px-2 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer text-white text-sm flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        // type="submit"
                        icon={FilePenLine}
                        onClick={handleUploadSignature}
                        disabled={signatureUploadProgress}
                      >
                        {signatureUploadProgress ? (
                          <div className="flex items-center gap-2">
                            <CircularProgressbar
                              className="h-8 w-8"
                              value={signatureUploadProgress}
                            />
                            <span>{`${signatureUploadProgress || 0}%`}</span>
                          </div>
                        ) : (
                          // "Upload Signature"
                          <CloudUpload />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {signatureUploadError && (
                    <span className="text-red-500">{signatureUploadError}</span>
                  )}
                </div>
              </div>

              {/* password strength meter */}
              <PasswordStrengthMeter password={password} />

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
                value={bizLogo}
                onChange={(e) => setBizLogo(e.target.value)}
              /> */}

              <div className="flex flex-col mb-2">
                {regPackage !== "trial" && (
                  <div className="flex flex-col md:flex-row gap-4 items-end p-3 rounded-lg">
                    <div className="flex flex-col font-light w-full">
                      <div className="text-sm font-medium">
                        <p className="md:text-nowrap">
                          Business Logo (Max 200kb)
                        </p>
                        {bizLogo && (
                          <p className="text-sm text-red-400 font-medium block">
                            Selected file size:{" "}
                            {(bizLogo.size / 1024).toFixed(0)} KB
                          </p>
                        )}
                      </div>
                      <Input
                        icon={FilePlus}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBizLogo(e.target.files[0])}
                      />
                    </div>

                    {bizLogo && (
                      <img
                        src={bizLogo ? URL.createObjectURL(bizLogo) : ""}
                        alt="business logo preview"
                        className="w-10, h-10 object-cover rounded-full"
                      />
                    )}

                    <motion.div
                      className="w-fit text-nowrap py-2 px-4 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer text-white text-sm flex items-center justify-center"
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
                        <span className="flex items-center gap-2">
                          <CloudUpload />
                          Upload Logo
                        </span>
                      )}
                    </motion.div>
                  </div>
                )}

                {imageUploadError && (
                  <span className="text-red-500">{imageUploadError}</span>
                )}
              </div>

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
