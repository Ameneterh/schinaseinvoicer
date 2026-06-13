import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Trash2,
  FilePenLine,
  BadgePoundSterling,
  Share2,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useBusinessStore } from "../store/businessStore";
import { Input } from "./Input";
import { MdFilterList } from "react-icons/md";
import { BusinessFiltersComponent } from "./DashFilterComponent";

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

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  // others
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

  const selectedBusinesses = businesses
    .filter((business) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        business?.business_name?.toLowerCase().includes(search) ||
        business?.status?.toLowerCase().includes(search) ||
        business?.plan?.toLowerCase().includes(search) ||
        business?.owner?.fullname?.toLowerCase().includes(search) ||
        new Date(user?.createdAt)
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

        case "owner":
          result = a.owner?.fullname.localeCompare(b.owner?.fullname);
          break;

        case "company":
          result = a.business_name.localeCompare(b.business_name);
          break;

        case "plan":
          result = a.plan?.localeCompare(b.plan);
          break;

        case "status":
          result = a.status?.localeCompare(b.status);
          break;

        default:
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex gap-5 mt-8 sm:mt-0">
      {showFilters && (
        <BusinessFiltersComponent
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
        <h1 className="text-xl font-extrabold">List of Businesses:</h1>

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
          {selectedBusinesses.length > 0 ? (
            <table className="border-collapse w-full border-none">
              <thead className=" bg-gray-500">
                <tr className="border-b-[2px] border-b-black text-sm">
                  <th className="text-left px-4 py-1 text-nowrap">Status</th>
                  <th className="text-left px-4 py-1 text-nowrap">Package</th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Business Details
                  </th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Business Owner Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedBusinesses.map((business) => (
                  <tr key={business._id} className="border-b border-b-gray-600">
                    <td className="px-4 py-1">
                      <span className="text-sm capitalize text-nowrap mr-1 border-r-2 border-gray-950 pr-2">
                        {business.status}
                      </span>
                      <select className="bg-transparent text-xs border-none focus:border-none focus:outline-none">
                        <option>Update Status</option>
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Banned</option>
                      </select>
                    </td>
                    <td className="px-4 py-1 text-sm capitalize text-nowrap">
                      <span className="text-sm capitalize text-nowrap mr-1 border-r-2 border-gray-950 pr-2">
                        {business.plan}
                      </span>
                      <select className="bg-transparent text-xs border-none focus:border-none focus:outline-none">
                        <option>Update Plan</option>
                        <option>Trial</option>
                        <option>Basic</option>
                        <option>Premium</option>
                      </select>
                    </td>
                    <td className="px-4 py-1 text-sm text-nowrap flex flex-col">
                      <p className="font-bold">{business.business_name}</p>
                      <p className="text-xs -mt-1">
                        {business.business_address}
                      </p>
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Businesses found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
