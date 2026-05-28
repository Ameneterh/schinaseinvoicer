import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Trash2, FilePenLine, BadgePoundSterling, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useBusinessStore } from "../store/businessStore";

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

export default function DashBusinesses() {
  const { user } = useAuthStore();
  const { getAllBusinesses } = useBusinessStore();

  const [businesses, setBusinesses] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  console.log(businesses);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const { businesses } = await getAllBusinesses();
        setBusinesses(businesses);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.role === "architect") {
      getBusinesses();
    }
  }, [user._id]);

  const handleOpenPayUpdateModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleShowMore = async () => {
    // const startIndex = users.length;
    // try {
    //   const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
    //   const data = await res.json();
    //   if (res.ok) {
    //     setUsers((prev) => [...prev, ...data.users]);
    //     if (data.users.length < 10) {
    //       setShowMore(false);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const handleDeleteUser = async () => {
    // setShowModal(false);
    // try {
    //   const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
    //     method: "DELETE",
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
    //   } else {
    //     console.log(data.message);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-xl font-extrabold mb-4">List of Businesses:</h1>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      >
        {businesses.length > 0 ? (
          <table className="border-collapse w-full border-none">
            <thead className=" bg-gray-500">
              <tr className="border-b-[2px] border-b-black text-sm">
                <th className="text-left px-4 py-1 text-nowrap">Status</th>
                <th className="text-left px-4 py-1 text-nowrap">
                  Business Details
                </th>
                <th className="text-left px-4 py-1 text-nowrap">
                  Business Owner Details
                </th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((business) => (
                <tr key={business._id} className="border-b border-b-gray-600">
                  <td className="px-4 py-1 text-sm capitalize text-nowrap">
                    {business.status}
                  </td>
                  <td className="px-4 py-1 text-sm text-nowrap flex flex-col">
                    <p className="font-bold">{business.business_name}</p>
                    <p className="text-xs -mt-1">{business.business_address}</p>
                    <p className="text-xs -mt-1 flex items-center gap-3">
                      <Link
                        to={`mailto:${business.business_email}`}
                        className="text-blue-700 hover:underline underline-offset-1"
                      >
                        {business.business_email}
                      </Link>{" "}
                      <Link
                        to={`tel:${business.business_phone}`}
                        className="text-blue-700 hover:underline underline-offset-1"
                      >
                        {business.business_phone}
                      </Link>
                    </p>
                  </td>
                  <td className="px-4 py-1 text-sm text-nowrap">
                    <p className="font-bold">{business.owner.fullname}</p>
                    <p className="text-xs -mt-1 flex items-center gap-3">
                      <Link
                        to={`mailto:${business.owner.email}`}
                        className="text-blue-700 hover:underline underline-offset-1"
                      >
                        {business.owner.email}
                      </Link>{" "}
                      <Link
                        to={`tel:${business.owner.phoneNumber}`}
                        className="text-blue-700 hover:underline underline-offset-1"
                      >
                        {business.owner.phoneNumber}
                      </Link>
                    </p>
                  </td>

                  <td className="px-4 py-1 text-sm text-nowrap">
                    <select className="bg-transparent">
                      <option>Update Status</option>
                      <option>Pending</option>
                      <option>Active</option>
                      <option>In-Active</option>
                      <option>Suspended</option>
                      <option>Banned</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Messages found.</p>
        )}
      </motion.div>
    </div>
  );
}
