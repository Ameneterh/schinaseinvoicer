import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
  const { getAllBusinesses, updateBusiness } = useBusinessStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [formData, setFormData] = useState({});

  // others
  const [businesses, setBusinesses] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const getBusinesses = async () => {
    try {
      const { businesses } = await getAllBusinesses();
      setBusinesses(businesses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.role === "architect") {
      getBusinesses();
    }
  }, [user._id]);

  const handleOpenModal = (businessToUpdate) => {
    setSelectedBusiness(businessToUpdate);
    setShowModal(true);
  };

  const handleOpenPlanModal = (businessToUpdate) => {
    setSelectedBusiness(businessToUpdate);
    setShowPlanModal(true);
  };

  const handleUpdateBusinessStatus = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      // setUpdateUserError("No changes made!");
      toast.error("No changes made!");
      return;
    }

    try {
      const changedFields = {};

      if (formData.status !== selectedBusiness.status)
        changedFields.status = formData.status;

      if (formData.plan !== selectedBusiness.plan)
        changedFields.plan = formData.plan;

      await updateBusiness(selectedBusiness._id, changedFields);
      setShowModal(false);
      setShowPlanModal(false);

      getBusinesses();
      toast.success("Business status updated successfully!");
    } catch (error) {
      toast.error(error.message);
      // setUpdateUserError(data.message);
    }
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
                  <th className="text-left px-4 py-1 text-nowrap">Reg Date</th>
                  <th className="text-left px-4 py-1 text-nowrap">Status</th>
                  <th className="text-left px-4 py-1 text-nowrap">Package</th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Business Details
                  </th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Business Owner Details
                  </th>
                  <th className="text-left px-4 py-1 text-nowrap">
                    Subscription Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedBusinesses.map((business) => (
                  <tr key={business._id} className="border-b border-b-gray-600">
                    <td className="px-4 py-1 text-sm">
                      {business.createdAt
                        ? new Date(business.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            // hour: "numeric",
                            // minute: "2-digit",
                            // hour12: true,
                          })
                        : ""}
                    </td>
                    <td className="px-4 py-1">
                      <span
                        className={`text-sm capitalize cursor-pointer ${business.status === "active" ? "text-green-800" : business.status === "suspended" ? "text-orange-600" : "text-red-600"}`}
                        onClick={() => handleOpenModal(business)}
                      >
                        {business.status}
                      </span>
                    </td>
                    <td className="px-4 py-1 text-sm capitalize text-nowrap">
                      <span
                        className={`text-sm capitalize cursor-pointer ${business.plan === "basic" ? "text-blue-900" : business.plan === "premium" ? "text-yellow-900" : "text-red-600"}`}
                        onClick={() => handleOpenPlanModal(business)}
                      >
                        {business.plan}
                      </span>
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
                      <Link
                        to={business.website}
                        target="_blank"
                        className="text-blue-700 text-xs hover:underline underline-offset-1"
                      >
                        {business.website && business.website}
                      </Link>
                    </td>
                    <td className="px-4 py-1 text-sm text-nowrap">
                      <p className="font-bold">{business.owner.fullname}</p>
                      <p className="text-xs -mt-1 flex flex-col items-start">
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
                      <p className="flex items-center gap-1">
                        Package:{" "}
                        <span className="font-bold capitalize">
                          {business.plan}
                        </span>
                      </p>

                      {/* payment info */}
                      <p className="text-xs -mt-1 flex flex-col items-start">
                        <span className="flex items-center gap-1">
                          Renewed On:{" "}
                          <span className="font-bold capitalize">
                            {business.plan}
                          </span>
                        </span>
                      </p>
                      <p className="text-xs -mt-1 flex flex-col items-start">
                        <span className="flex items-center gap-1">
                          Expire On:{" "}
                          <span className="font-bold capitalize">
                            {business.plan}
                          </span>
                        </span>
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

      {/* modal to update user status */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex flex-col p-2 rounded border text-sm">
              <div className="flex flex-col pb-2 border-b-2">
                <p className="capitalize font-bold text-lg text-center text-red-500">
                  Update Business Plan
                </p>
              </div>

              {/*  */}
              <div className="flex mt-3 rounded">
                <form
                  onSubmit={handleUpdateBusinessStatus}
                  className="w-full flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative px-2 py-1 h-[34px] border border-gray-950 rounded w-full mt-2">
                      <p className="bg-white text-xs font-semibold absolute left-2 -top-2 px-1 text-nowrap">
                        Current User Plan:
                      </p>
                      <p className="capitalize mt-1 w-full text-center text-green-900">
                        {selectedBusiness.plan}
                      </p>
                    </div>

                    <div className="flex flex-col w-full relative mt-2">
                      <label
                        htmlFor="validity"
                        className="text-xs font-semibold absolute -top-2 left-2 bg-white px-1"
                      >
                        Choose New Plan
                      </label>
                      <select
                        onChange={(e) =>
                          setFormData({ ...formData, plan: e.target.value })
                        }
                        // onChange={(e) => setStatus(e.target.value)}
                        className="w-full pl-3 pr-3 py-[6px] bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
                      >
                        <option value="">Choose ...</option>
                        <option
                          value="trial"
                          disabled={selectedBusiness.plan === "trial"}
                        >
                          Set Trial Plan
                        </option>
                        <option
                          value="basic"
                          disabled={selectedBusiness.plan === "basic"}
                        >
                          Set Basic Plan
                        </option>
                        <option
                          value="premium"
                          disabled={selectedBusiness.status === "premium"}
                        >
                          Set Premium Plan
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4">
                    <button
                      className="bg-red-700 text-white px-4 rounded py-1 text-xs hover:scale-105 transition-all duration-300 hover:bg-red-800"
                      onClick={() => setShowPlanModal(false)}
                    >
                      Cancel
                    </button>
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

      {/* modal to update user status */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex flex-col p-2 rounded border text-sm">
              <div className="flex flex-col pb-2 border-b-2">
                <p className="capitalize font-bold text-lg text-center text-red-500">
                  Update Business Status
                </p>
              </div>

              {/*  */}
              <div className="flex mt-3 rounded">
                <form
                  onSubmit={handleUpdateBusinessStatus}
                  className="w-full flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative px-2 py-1 h-[34px] border border-gray-950 rounded w-full mt-2">
                      <p className="bg-white text-xs font-semibold absolute left-2 -top-2 px-1 text-nowrap">
                        Current User Status:
                      </p>
                      <p className="capitalize mt-1 w-full text-center text-green-900">
                        {selectedBusiness.status}
                      </p>
                    </div>

                    <div className="flex flex-col w-full relative mt-2">
                      <label
                        htmlFor="validity"
                        className="text-xs font-semibold absolute -top-2 left-2 bg-white px-1"
                      >
                        Choose New Status
                      </label>
                      <select
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        // onChange={(e) => setStatus(e.target.value)}
                        className="w-full pl-3 pr-3 py-[6px] bg-white rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200"
                      >
                        <option value="">Choose ...</option>
                        <option
                          value="active"
                          disabled={selectedBusiness.status === "active"}
                        >
                          Activate Business
                        </option>
                        <option
                          value="suspended"
                          disabled={selectedBusiness.status === "suspended"}
                        >
                          Suspend Business
                        </option>
                        <option
                          value="banned"
                          disabled={selectedBusiness.status === "banned"}
                        >
                          Blacklist Business
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4">
                    <button
                      className="bg-red-700 text-white px-4 rounded py-1 text-xs hover:scale-105 transition-all duration-300 hover:bg-red-800"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
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
