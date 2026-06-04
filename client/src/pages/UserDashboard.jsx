import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../layout/MainLayout";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashboardComponent from "../components/DashboardComponent";
import DashUsers from "../components/DashUsers";
import DashProfile from "../components/DashProfile";
import CreateInvoice from "./CreateInvoice";
import DashInvoices from "../components/DashInvoices";
import { useBusinessStore } from "../store/businessStore";
import DashAddHandler from "../components/DashAddHandler";
import DashMessages from "../components/DashMessages";
import DashClients from "../components/DashClients";
import DashBusinesses from "../components/DashBusinesses";

export default function UserDashboard() {
  const { user, logout, isLoading } = useAuthStore();
  const { business, businessLogout } = useBusinessStore();

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen mt-20 backdrop-filter backdrop-blur-lg shadow-2xl flex flex-col md:flex-row"
      >
        {/* <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Dashboard
        </h2> */}

        {/* Sidebar */}
        <div className="">
          <DashSidebar />
        </div>

        {/* profile ... */}
        {tab === "profile" && <DashProfile />}

        {/* for users */}
        {tab === "users" && <DashUsers />}

        {/* for dashboard */}
        {tab === "dash" && <DashboardComponent />}

        {/* for invoice creation */}
        {tab === "create-invoice" && <CreateInvoice />}

        {/* for adding a new handler */}
        {tab === "add-handler" && <DashAddHandler />}

        {/* view invoices */}
        {tab === "invoices" && <DashInvoices />}

        {/* view clients */}
        {tab === "clients" && <DashClients />}

        {/* view messages */}
        {tab === "messages" && <DashMessages />}

        {/* view business */}
        {tab === "businesses" && <DashBusinesses />}

        {/* <div className="space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.fullname}</p>
            <p className="text-gray-300">Email: {user.user_email}</p>
          </motion.div>
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>

              {formatDate(user.lastLogin)}
            </p>
          </motion.div>
        </div> */}
      </motion.div>
    </MainLayout>
  );
}
