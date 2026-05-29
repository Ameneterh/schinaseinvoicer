import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBullhorn,
  FaBox,
  FaCog,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";
import {
  MdClose,
  MdOutlinePostAdd,
  MdContacts,
  MdMenu,
  MdCloseFullscreen,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/InvoiceCore_logoName.png";
import { IoMdCloseCircle } from "react-icons/io";
import { TbMessage, TbStarFilled } from "react-icons/tb";
import { Input } from "./Input";
import { useRatingStore } from "../store/ratingStore";

export default function HeaderComponent({ business }) {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "About Us",
      path: "/about",
      icon: <FaUsers />,
      isParent: false,
    },
    {
      name: "Contact Us",
      path: "/contact",
      icon: <MdOutlinePostAdd />,
      isParent: false,
    },
  ];

  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { error, isLoading, logout, user } = useAuthStore();
  const { addRating, getRatings } = useRatingStore();

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    try {
      logout();
      setShowModal(false);
    } catch (error) {
      console.log("Error logging out!");
    } finally {
      navigate("/");
    }
  };

  const submitRating = async (e) => {
    e.preventDefault();

    try {
      await addRating({ rating, comment, rater: user._id });
    } catch (error) {
      console.log(error);
    } finally {
      confirmLogout();
    }
  };

  return (
    <header className="w-full px-5 md:px-20 py-2 sm:py-4 bg-blue-900 shadow fixed left-0 top-0 flex items-center justify-between z-50">
      <Link to="/">
        <div className="text-white flex items-center gap-1 max-h-14 overflow-hidden rounded-md">
          <img src={logo} alt="" className="w-56" />

          {/* <p className="hidden sm:inline-block text-3xl ml-3">
            International School
          </p> */}
        </div>
      </Link>

      {/* navigation bars */}
      <nav className="hidden lg:block text-white">
        <ul className="p-2 flex gap-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                end={item.isParent}
                className={({ isActive }) =>
                  (isActive
                    ? "border-b-2 border-b-white flex items-center"
                    : "") +
                  "flex items-center px-4 p-2 rounded-md transition-all duration-300 border-b-2 border-b-transparent hover:border-b-2 hover:border-b-yellow-500"
                }
                to={item.path}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-md ml-2">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-8">
        {user ? (
          <div className="bg-white px-2 py-1 rounded flex items-center gap-2">
            <Link to={"/user-dashboard?tab=dash"} className="flex items-center">
              <img src={user.avatar} className="rounded-full h-8 w-8" />
            </Link>
            <p className="font-bold text-md text-blue-800">
              <Link
                to={"/user-dashboard?tab=profile"}
                className=" uppercase cursor-pointer underline underline-offset-2 hover:scale-110 transition-all duration-500"
              >
                {user.fullname.split(" ")[0]}
              </Link>
            </p>
            <div className="flex items-center ml-4 bg-red-100 px-2 py-1 rounded">
              <MdLogout
                className="text-lg text-red-600 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-md">
            <Link
              to="/user-login"
              className="bg-blue-950 px-3 py-1 rounded text-white hover:text-blue-950 hover:bg-white"
            >
              Login
            </Link>
            <Link
              to="/add-new-business"
              className="bg-blue-950 px-3 py-1 rounded text-white hover:text-blue-950 hover:bg-white"
            >
              Register
            </Link>
          </div>
        )}

        {/* for small screens */}
        <div
          className="block lg:hidden z-99"
          onClick={() => setShowNav(!showNav)}
        >
          <MdMenu className="text-white" size={30} />
        </div>
      </div>

      {/* small screen navigation */}
      {showNav ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="block lg:hidden w-full sm:w-[50%] h-screen bg-black text-white absolute top-12 right-0 opacity-90 p-4"
        >
          <div className="flex flex-col p-4 w-full">
            <div className="flex items-center justify-between w-full gap-4">
              <p className="flex-1 h-[1px] bg-gray-500"></p>
              <MdCloseFullscreen
                className="text-gray-500"
                size={20}
                onClick={() => setShowNav(!showNav)}
              />
            </div>
            <ul className="flex flex-col gap-5 bg-white/10 backdrop-blur-md shadow-lg rounded-xl mt-5 ">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">ABOUT US</Link>
              </li>
              <li>
                <Link to="/gallery">GALLERY</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT US</Link>
              </li>
              <li>
                <p onClick={handleLogout} className="text-red-500 font-bold">
                  LOG OUT
                </p>
              </li>
            </ul>
          </div>
        </motion.div>
      ) : (
        <></>
      )}

      {/* show modal on logout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white p-4 rounded-lg w-full max-w-96 mx-auto">
            <IoMdCloseCircle
              className="text-red-600 absolute top-1 right-1 size-7 cursor-pointer"
              title="Close"
              onClick={() => confirmLogout()}
            />
            <h2 className="text-xl mb-3 font-bold text-center">
              Before you go,
              <span className="block text-xs -mt-1">
                take a moment to rate us
              </span>
            </h2>

            <p className="h-[2px] bg-blue-800 w-full mb-3"></p>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <TbStarFilled
                      className="cursor-pointer hover:scale-110 transition-all duration-300"
                      size={24}
                    />
                  </button>
                ))}
              </div>
              <form
                onSubmit={submitRating}
                className="flex flex-col w-full items-center"
              >
                <div className="relative w-full">
                  <p className="text-sm bg-white absolute -top-2 left-2 px-1">
                    Your message (max 300 characters)
                  </p>
                  <textarea
                    rows="10"
                    className="w-full h-96 px-2 text-sm pt-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <p className="text-sm font-bold flex gap-1 -mt-2 mb-3 self-end">
                  {comment.length}{" "}
                  {comment.length === 0
                    ? ""
                    : comment.length > 1
                      ? "characters"
                      : "character"}
                </p>

                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-800 text-center rounded-md text-white hover:opacity-70 transition-all duration-300"
                >
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
