import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { Trash2, FilePenLine, BadgePoundSterling, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContactStore } from "../store/contactStore";

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

export default function DashMessages() {
  const { user } = useAuthStore();
  const { getAllMessages } = useContactStore();

  const [messages, setMessages] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { messages } = await getAllMessages();

        if (user.role === "architect") {
          setMessages(messages);
        } else {
          const filteredMessage = messages.filter(
            (message) => user.business._id === message.company._id,
          );
          setMessages(filteredMessage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (
      user.role === "architect"
      //   user.role === "businessAdmin" ||
      //   user.role === "handler"
    ) {
      getMessages();
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
      <h1 className="text-xl font-extrabold mb-4">List of Messages:</h1>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      >
        {messages.length > 0 ? (
          <table className="border-collapse w-full">
            <thead className="">
              <tr className="border-b-[2px] border-b-black text-sm">
                <th className="text-left px-4 py-1 text-nowrap">Date Sent</th>
                <th className="text-left px-4 py-1 text-nowrap">Status</th>
                <th className="text-left px-4 py-1 text-nowrap">
                  Sender's Details
                </th>
                <th className="text-left px-4 py-1 text-nowrap flex-1">
                  Message
                </th>
                <th className="text-right px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id}>
                  <td className="px-4 text-sm capitalize text-nowrap">
                    {message.status}
                  </td>
                  <td className="px-4 text-sm text-nowrap">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )
                      : ""}
                  </td>
                  <td className="px-4 text-sm capitalize font-bold text-nowrap">
                    {message.sender_name}
                  </td>
                  <td
                    className="px-4 text-sm cursor-pointer"
                    onClick={() => alert("Read Message")}
                  >
                    {message.text}
                  </td>
                  <td className="px-4 text-sm flex items-center gap-2">
                    <button
                      title="Mark as Read"
                      onClick={() => {
                        // setUserIdToDelete(user._id);
                        handleOpenPayUpdateModal(invoice);
                      }}
                      // className="bg-blue-500 text-white text-sm px-2 my-1 rounded"
                    >
                      <BadgePoundSterling
                        className={`text-blue-700 size-4 transition-all duration-300 ${message.status === "read" ? "opacity-40 cursor-not-allowed text-gray-500" : "hover:scale-125"}`}
                      />
                    </button>
                    <button
                      title="Delete this Message"
                      onClick={() => {
                        // setUserIdToDelete(user._id);
                        setShowModal(true);
                      }}
                      //   disabled={invoice.totalAmountReceived > 0}
                      // className="bg-red-500 text-white text-sm px-2 my-1 rounded"
                    >
                      <Trash2
                        className={`text-red-600 size-4 transition-all duration-300 hover:scale-125`}
                      />
                    </button>
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
