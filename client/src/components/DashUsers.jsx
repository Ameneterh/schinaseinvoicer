import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useClientStore } from "../store/clientStore";
import { Search, Trash2 } from "lucide-react";
import { Input } from "./Input";

export default function DashUsers() {
  const { user } = useAuthStore();
  const { getAllUsers } = useAuthStore();

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

  console.log(users);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch(`/server/user/getusers`);
  //       const data = await res.json();
  //       if (res.ok) {
  //         setUsers(data.users);
  //         if (data.users.length < 10) {
  //           setShowMore(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   if (user.role === "admin" || user.role === "architect") {
  //     fetchUsers();
  //   }
  // }, [user._id]);

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

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex items-center justify-between mb-3 gap-4">
        <h1 className="text-xl font-extrabold">List of Users:</h1>
        <div className="w-full max-w-96">
          <Input
            icon={Search}
            type="text"
            // placeholder="Business Phone"
            // label="Search"
            // value={business_phone}
            // onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      {users.length > 0 ? (
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
            {users.map((pickedUser) => (
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
  );
}
