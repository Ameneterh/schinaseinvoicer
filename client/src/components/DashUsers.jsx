import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useClientStore } from "../store/clientStore";
import { Search, Trash2 } from "lucide-react";
import { Input } from "./Input";
import { UserFiltersComponent } from "./DashFilterComponent";
import { MdFilterList } from "react-icons/md";

export default function DashUsers() {
  const { user } = useAuthStore();
  const { getAllUsers } = useAuthStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { users } = await getAllUsers();

        if (user.role === "architect") {
          setUsers(users);
        } else {
          const filteredUsers = users.filter(
            (bizuser) => user.business._id === bizuser?.business?._id,
          );

          // console.log(filteredUsers);

          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (
      user.role === "architect" ||
      user.role === "businessAdmin" ||
      user.role === "handler"
    ) {
      getUsers();
    }
  }, [user._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectedUsers = users
    .filter((user) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        user?.email?.toLowerCase().includes(search) ||
        user?.role?.toLowerCase().includes(search) ||
        user?.fullname?.toLowerCase().includes(search) ||
        user?.business?.business_name?.toLowerCase().includes(search) ||
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

        case "user":
          result = a.fullname.localeCompare(b.fullname);
          break;

        case "company":
          result = a.business?.business_name?.localeCompare(
            b.business?.business_name,
          );
          break;

        case "role":
          result = a.role?.localeCompare(b.role);
          break;

        default:
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex gap-5 mt-8 sm:mt-0">
      {showFilters && (
        <UserFiltersComponent
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
        <h1 className="text-xl font-extrabold">List of Users:</h1>
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
        {selectedUsers.length > 0 ? (
          <table className="border-collapse border-none leading-tight w-full">
            <thead className="bg-gray-400">
              <tr className="border-b-black border-b-2 text-sm">
                <th className="px-4 py-1 text-left">Name of User</th>
                {user.role === "architect" && (
                  <th className="px-4 py-1 text-left">Affiliation</th>
                )}
                <th className="px-4 py-1 text-left">User Email</th>
                <th className="px-4 py-1 text-left">User Phone</th>
                <th className="px-4 py-1 text-left">User Role</th>
                <th className="px-4 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {selectedUsers.map((pickedUser) => (
                <tr key={user._id} className="">
                  <td className="px-4 py-1 text-sm text-nowrap">
                    {pickedUser.fullname}
                  </td>
                  {user.role === "architect" && (
                    <td className="px-4 py-1 text-sm text-nowrap">
                      {pickedUser?.business?.business_name}
                    </td>
                  )}
                  <td className="px-4 py-1 text-sm text-nowrap">
                    {pickedUser.email}
                  </td>
                  <td className="px-4 py-1 text-sm text-nowrap">
                    {pickedUser.phoneNumber}
                  </td>
                  <td className="px-4 py-1 text-sm text-nowrap capitalize">
                    {pickedUser.role}
                  </td>
                  <td className="px-4 py-1 text-sm text-nowrap">
                    <button
                      onClick={() => {
                        setUserIdToDelete(pickedUser._id);
                        setShowModal(true);
                      }}
                    >
                      <Trash2
                        className={`text-red-600 size-4 transition-all duration-300 hover:scale-125"}`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
