import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes, FaWhatsapp } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import {
  Trash2,
  FilePenLine,
  BadgePoundSterling,
  Share2,
  Search,
  MailOpen,
  MailPlus,
  PhoneCall,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContactStore } from "../store/contactStore";
import { Input } from "./Input";
import { MessagesFiltersComponent } from "./DashFilterComponent";
import { MdFilterList } from "react-icons/md";

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
  const { getAllMessages, readMessage } = useContactStore();

  const [messages, setMessages] = useState([]);

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

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

  useEffect(() => {
    if (
      user.role === "architect"
      //   user.role === "businessAdmin" ||
      //   user.role === "handler"
    ) {
      getMessages();
    }
  }, [user._id]);

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
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

  const selectedMessages = messages
    .filter((message) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        message?.sender_name?.toLowerCase().includes(search) ||
        message?.status?.toLowerCase().includes(search) ||
        new Date(message?.createdAt)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(search);

      return matchesSearch;
    })
    .sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "date":
          result = new Date(a.createdAt) - new Date(b.createdAt);
          break;

        case "sender":
          result = a.sender_name.localeCompare(b.sender_name);
          break;

        case "status":
          result = a.status.localeCompare(b.status);
          break;

        default:
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

  console.log(selectedMessage);

  const handleReadMessage = async (e) => {
    e.preventDefault();
    try {
      await readMessage({
        status: "read",
        readBy: user._id,
        messageId: selectedMessage._id,
      });
      setShowModal(false);
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex gap-5 mt-8 sm:mt-0">
      {showFilters && (
        <MessagesFiltersComponent
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          user={user}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl font-extrabold">List of Messages:</h1>
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <div
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <p className="text-primary">Filters</p>
              <MdFilterList className="w-5 h-5" />
            </div>
          )}

          {/* search bar */}
          <div className="w-full max-w-96">
            <Input
              icon={Search}
              type="text"
              placeholder="Search User, Affiliation, Phone, Email, Role ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full md:mx-auto"
        >
          {selectedMessages.length > 0 ? (
            <table className="border-collapse border-none w-full">
              <thead className="bg-gray-400">
                <tr className="border-b-[2px] border-b-black text-sm">
                  <th className="text-left px-4 py-1 text-nowrap">Status</th>
                  <th className="text-left px-4 py-1 text-nowrap">Date Sent</th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Sender's Details
                  </th>
                  <th className="text-left px-4 py-1 text-nowrap flex-1">
                    Message
                  </th>
                  <th className="text-left px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedMessages.map((message) => (
                  <tr key={message._id} className="border-b border-b-gray-600">
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
                    <td className="px-4 text-sm text-nowrap">
                      <span
                        className={`capitalize line-clamp-1 text-sm cursor-pointer ${message.status === "unread" ? "font-semibold" : "font-normal"}`}
                      >
                        {message.sender_name}
                      </span>
                      {/* <span className="text-xs block">
                        {message.sender_email}
                      </span>
                      <span className="text-xs block">
                        {message.sender_phone}
                      </span> */}
                    </td>
                    <td
                      className={`line-clamp-1 px-4 text-sm cursor-pointer ${message.status === "unread" ? "font-bold" : "font-normal"}`}
                      onClick={() => handleOpenModal(message)}
                    >
                      {message.text}
                    </td>
                    <td className="px-4 py-1 text-sm text-nowrap">
                      <button
                        title="Mark as Read"
                        onClick={() => {
                          // setUserIdToDelete(user._id);
                          handleOpenPayUpdateModal(invoice);
                        }}
                        // className="bg-blue-500 text-white text-sm px-2 my-1 rounded"
                      >
                        <MailOpen
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
                          className={`text-red-600 size-4 transition-all duration-300 hover:scale-125 ml-2`}
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

      {/* modal to read full message */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex flex-col p-2 rounded border text-sm">
              <div className="flex flex-col pb-2 border-b-2">
                <p className="capitalize font-bold text-lg text-center">
                  {selectedMessage.sender_name}
                </p>

                <span className="flex items-center gap-1 w-full justify-center">
                  <MailPlus size={16} />
                  <Link
                    to={`mailto:${selectedMessage.sender_email}`}
                    className="hover:underline underline-offset-2 hover:text-blue-700"
                  >
                    {selectedMessage.sender_email}
                  </Link>
                </span>
                <div className="flex items-center justify-center">
                  {/* call */}
                  <span className="flex items-center gap-1 w-full justify-center">
                    <PhoneCall size={16} />
                    <a
                      href={`tel:${selectedMessage.sender_phone}`}
                      className="hover:underline underline-offset-2 hover:text-blue-700"
                    >
                      {selectedMessage.sender_phone}
                    </a>
                  </span>

                  {/* whatsapp */}
                  <span className="flex items-center gap-1 w-full justify-center">
                    <FaWhatsapp size={16} />
                    <a
                      href={`https://wa.me/${selectedMessage.sender_phone}`}
                      target="_blank"
                      className="hover:underline underline-offset-2 hover:text-blue-700"
                    >
                      {selectedMessage.sender_phone}
                    </a>
                  </span>
                </div>
              </div>

              {/*  */}
              <div className="flex mt-2 rounded">
                <form
                  onSubmit={handleReadMessage}
                  className="w-full flex flex-col gap-2"
                >
                  <p>{selectedMessage.text}</p>
                  {/* buttons */}
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white px-4 rounded py-1 text-xs hover:scale-105 transition-all duration-300 hover:bg-blue-800"
                    >
                      Okay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
