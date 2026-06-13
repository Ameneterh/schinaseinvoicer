import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useInvoiceStore } from "../store/invoiceStore";
import {
  Trash2,
  FilePenLine,
  BadgePoundSterling,
  Share2,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashInvoicePayUpdate from "./DashInvoicePayUpdate";
import { useClientStore } from "../store/clientStore";
import ClientDetailsComponent from "./ClientDetailsComponent";
import { Input } from "./Input";
import { MdFilterList } from "react-icons/md";
import { ClientFiltersComponent } from "./DashFilterComponent";

export default function DashClients() {
  const { user } = useAuthStore();
  const { getAllInvoices } = useInvoiceStore();
  const { getAllClients } = useClientStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [clients, setClients] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const { clients } = await getAllClients();

        if (user.role === "architect") {
          setClients(clients);
        } else {
          const filteredClients = clients.filter(
            (client) => user.business._id === client?.staff?.business._id,
          );

          setClients(filteredClients);
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
      getClients();
    }
  }, [user._id]);

  const handleViewClientDetails = (client) => {
    setSelectedClient(client);
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

  const selectedClients = clients
    .filter((client) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        client?.client_name?.toLowerCase().includes(search) ||
        client?.staff?.business?.business_name
          ?.toLowerCase()

          .includes(search) ||
        new Date(client?.createdAt)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(search);

      // const status = getPaymentStatus(invoice);

      // const matchesStatus = paymentFilter === "all" || status === paymentFilter;

      return matchesSearch;
    })
    .sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "date":
          result = new Date(a.createdAt) - new Date(b.createdAt);
          break;

        case "client":
          result = a.client_name.localeCompare(b.client_name);
          break;

        case "company":
          result = a.staff?.business?.business_name?.localeCompare(
            b.staff?.business?.business_name,
          );
          break;

        default:
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex gap-5 mt-8 sm:mt-0">
      {showFilters && (
        <ClientFiltersComponent
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
        <h1 className="text-xl font-extrabold">List of Clients:</h1>
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
              placeholder="Search client ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-between mb-3 gap-4">
          <h1 className="text-xl font-extrabold">List of Clients:</h1>
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
        </div> */}
        {selectedClients?.length > 0 ? (
          <table className="border-collapse w-full">
            <thead className="bg-gray-400">
              <tr className="border-b-[2px] border-b-black text-sm">
                <th className="text-left px-4 py-1">Reg Date</th>
                {user.role === "architect" && (
                  <th className="text-left px-4 py-1">Client Registrar</th>
                )}
                <th className="text-left px-4 py-1">Client Name</th>
                <th className="text-left px-4 py-1">Phone Number</th>
                <th className="text-left px-4 py-1">Email</th>
              </tr>
            </thead>
            <tbody>
              {selectedClients?.map((client) => (
                <tr key={client._id} className="text-sm">
                  <td className="px-4 text-sm py-1">
                    {client.createdAt
                      ? new Date(client.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </td>

                  {user.role === "architect" && (
                    <td className="px-4 text-sm py-1">
                      <button
                        title="View client details"
                        onClick={() => {
                          handleViewClientDetails(client);
                        }}
                        className="text-blue-900 text-sm hover:font-bold hover:underline underline-offset-2 capitalize"
                      >
                        {client?.staff?.business?.business_name}
                      </button>
                    </td>
                  )}
                  <td className="px-4 text-sm py-1">
                    <button
                      title="View client details"
                      onClick={() => {
                        handleViewClientDetails(client);
                      }}
                      className="text-blue-900 text-sm hover:font-bold hover:underline underline-offset-2 capitalize"
                    >
                      {client.client_name}
                    </button>
                  </td>
                  <td className="px-4 text-sm py-1">
                    <Link
                      to={`tel:client.client_phone`}
                      className="text-blue-900 text-sm hover:font-bold hover:underline underline-offset-2"
                    >
                      {client.client_phone}
                    </Link>
                  </td>
                  <td className="px-4 text-sm py-1">
                    <Link
                      to={`mailto:client.client_email`}
                      className="text-blue-900 text-sm hover:font-bold hover:underline underline-offset-2"
                    >
                      {client.client_email}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Clients found.</p>
        )}

        {/* modal for viewing client details */}
        {showModal && (
          <ClientDetailsComponent
            client={selectedClient}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
}
