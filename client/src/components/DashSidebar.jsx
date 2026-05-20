import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import {
  MdOutlineCreateNewFolder,
  MdAddBusiness,
  MdBusiness,
} from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button, Sidebar } from "flowbite-react";
import Divider from "./Divider";

export default function DashSidebar() {
  const { error, isLoading, logout, user } = useAuthStore();

  const location = useLocation();
  const [tab, setTab] = useState("");

  console.log(user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <div className="min-h-screen w-full">
    <Sidebar className="w-full min-h-screen flex flex-col justify-between">
      <Sidebar.Items className="mb-5">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {user && (
            <>
              <Link to="/user-dashboard?tab=dash">
                <Sidebar.Item
                  active={tab === "dash" || !tab}
                  icon={HiChartPie}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=profile">
                <Sidebar.Item
                  active={tab === "profile"}
                  icon={HiUser}
                  as="div"
                  className="capitalize"
                  label={
                    <span className="bg-gray-700 text-white px-2 py-[6px] rounded-md text-xs capitalize">
                      {user.role}
                    </span>
                  }
                >
                  Profile
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=invoices">
                <Sidebar.Item
                  active={tab === "invoices"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Invoices
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=clients">
                <Sidebar.Item
                  active={tab === "clients"}
                  icon={TbMessage}
                  as="div"
                >
                  Clients
                </Sidebar.Item>
              </Link>
            </>
          )}

          {(user.role === "businessAdmin" || user.role === "architect") && (
            <>
              <Link to="/user-dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=add-handler">
                <Sidebar.Item
                  active={tab === "add-handler"}
                  icon={FaRegAddressBook}
                  as="div"
                >
                  Add Handler
                </Sidebar.Item>
              </Link>
            </>
          )}

          {/* for architect only */}
          {user.role === "architect" && (
            <>
              <Link to="/user-dashboard?tab=businesses">
                <Sidebar.Item
                  active={tab === "businesses"}
                  icon={MdBusiness}
                  as="div"
                >
                  Businesses
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=messages">
                <Sidebar.Item
                  active={tab === "messages"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Messages
                </Sidebar.Item>
              </Link>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>

      {/* user actions ------------- create invoice, add client */}
      <Sidebar.Items className="">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {user && (
            <>
              <Link to="/user-dashboard?tab=create-invoice">
                <Sidebar.Item icon={MdOutlineCreateNewFolder} as="div">
                  Add Invoice
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=create-invoice">
                <Sidebar.Item icon={MdAddBusiness} as="div">
                  Add Client
                </Sidebar.Item>
              </Link>

              {/* <hr />
              <Sidebar.Item
                icon={HiArrowSmRight}
                className="cursor-pointer"
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item> */}
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    // </div>
  );
}
