import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useClientStore } from "../store/clientStore";
import { Trash2 } from "lucide-react";

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

  // console.log(users);

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
      <h1 className="text-xl font-extrabold mb-4">List of Users:</h1>
      {users.length > 0 ? (
        <table className="border-collapse leading-tight">
          <thead className="bg-gray-300">
            <tr className="border-b-black text-sm">
              <th className="px-4 py-1 text-left">Name of User</th>
              <th className="px-4 py-1 text-left">Affiliation</th>
              <th className="px-4 py-1 text-left">User Email</th>
              <th className="px-4 py-1 text-left">User Phone</th>
              <th className="px-4 py-1 text-left">User Role</th>
              <th className="px-4 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user) => (
              <tr key={user._id} className="">
                <td className="px-4 py-1 text-sm text-nowrap">
                  {user.fullname}
                </td>
                <td className="px-4 py-1 text-sm text-nowrap">
                  {user.business.business_name}
                </td>
                <td className="px-4 py-1 text-sm text-nowrap">{user.email}</td>
                <td className="px-4 py-1 text-sm text-nowrap">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-1 text-sm text-nowrap capitalize">
                  {user.role}
                </td>
                <td className="px-4 py-1 text-sm text-nowrap">
                  <button
                    onClick={() => {
                      setUserIdToDelete(user._id);
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
