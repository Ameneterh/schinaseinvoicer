import { motion } from "framer-motion";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  CircleUserRound,
  Mail,
  Lock,
  FilePlus,
  FilePenLine,
  Loader,
  UserRoundPlus,
  Eye,
  EyeOff,
  Phone,
  CloudUpload,
} from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
  const { addUser, addHandler, error, isLoading, user } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("handler");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");

  const [businesses, setBusinesses] = useState([]);

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

  const handleRegisterHandler = async (e) => {
    e.preventDefault();

    try {
      await addHandler({
        fullname,
        email,
        phoneNumber,
        password,
        role,
        avatar: addedAvatar ? addedAvatar.image : null,
        staff_signature: addedSignature ? addedSignature.image : null,
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
              <div className="flex flex-col gap-3 w-full md:max-w-80">
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

              <div className="flex flex-col gap-3 w-full flex-1">
                {/* add user avatar and user signature */}
                <div className="flex flex-col lg:flex-row gap-4 mt-2">
                  {/* add user avatar */}
                  <div className="flex flex-col w-full">
                    {user?.business?.plan !== "trial" && (
                      <div className="flex gap-4 items-end rounded-lg">
                        <div className="flex flex-col font-light w-full">
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
                    {user?.business?.plan !== "trial" && (
                      <div className="flex gap-4 items-end rounded-lg">
                        <div className="flex flex-col font-light w-full">
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
                            onChange={(e) =>
                              setUserSignature(e.target.files[0])
                            }
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
                      <span className="text-red-500">
                        {signatureUploadError}
                      </span>
                    )}
                  </div>
                </div>

                {/* password strength meter */}
                <PasswordStrengthMeter password={password} />
              </div>
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
