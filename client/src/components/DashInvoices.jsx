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
import { Input } from "./Input";
import DashFiltersComponent from "./DashFilterComponent";
import { MdFilterList } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

export default function DashInvoices() {
  const { user } = useAuthStore();
  const { getAllInvoices } = useInvoiceStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [invoices, setInvoices] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getInvoices = async () => {
    try {
      const { invoices } = await getAllInvoices();

      if (user.role === "architect") {
        setInvoices(invoices);
      } else {
        const filteredInvoice = invoices.filter(
          (invoice) => user.business._id === invoice.company._id,
        );
        setInvoices(filteredInvoice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.role === "architect" ||
      user.role === "businessAdmin" ||
      user.role === "handler"
    ) {
      getInvoices();
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

  const getPaymentStatus = (invoice) => {
    const balance = invoice.total - invoice.totalAmountReceived;

    if (balance <= 0) return "complete";

    if (invoice.totalAmountReceived > 0) return "partial";

    if (new Date(invoice.dueDate) < new Date()) return "overdue";

    return "pending";
  };

  const selectedInvoices = invoices
    .filter((invoice) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        invoice.invoiceNumber?.toLowerCase().includes(search) ||
        invoice.client?.client_name?.toLowerCase().includes(search) ||
        invoice.company?.business_name?.toLowerCase().includes(search) ||
        new Date(invoice.invDate)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(search);

      const status = getPaymentStatus(invoice);

      const matchesStatus = paymentFilter === "all" || status === paymentFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "date":
          result = new Date(a.invDate) - new Date(b.invDate);
          break;

        case "balance":
          result =
            Number(a.total - a.totalAmountReceived) -
            Number(b.total - b.totalAmountReceived);
          break;

        case "client":
          result = a.client.client_name.localeCompare(b.client.client_name);
          break;

        case "status":
          result = getPaymentStatus(a).localeCompare(getPaymentStatus(b));
          break;

        case "company":
          result = a.company?.business_name?.localeCompare(
            b.company?.business_name,
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
        <DashFiltersComponent
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          user={user}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl font-extrabold">List of Invoices:</h1>
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
              placeholder="Search invoice, client ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* invoices grid  */}
        <div
          className={`grid grid-cols-1 gap-5 w-full ${
            showFilters ? "grid-cols-1" : "grid-cols-1"
          }`}
        >
          {selectedInvoices.length > 0 ? (
            <table className="border-collapse border-none w-full">
              <thead className="bg-gray-400">
                <tr className="border-b-[2px] border-b-black">
                  <th className="text-left px-4 py-1">Inv Date</th>
                  <th className="text-left px-4 py-1">Inv No</th>
                  <th className="text-left px-4 py-1">Client</th>
                  {user.role === "architect" && (
                    <th className="text-left px-4 py-1">Company</th>
                  )}
                  <th className="text-right px-4 py-1">Inv Amt</th>
                  <th className="text-right px-4 py-1">Total Paid</th>
                  <th className="text-right px-4 py-1">Balance</th>
                  <th className="text-left px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoices.map((invoice) => (
                  <tr key={invoice._id} className="text-xs">
                    <td
                      className="px-4 py-1 line-clamp-1"
                      title={new Date(invoice.invDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    >
                      {invoice.invDate
                        ? new Date(invoice.invDate).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : ""}
                    </td>
                    <td className="px-4 py-1" title={invoice.invoiceNumber}>
                      {invoice.invoiceNumber}
                    </td>
                    <td
                      className="px-4 py-1 line-clamp-1"
                      title={invoice.client.client_name}
                    >
                      {invoice.client.client_name}
                    </td>
                    {user.role === "architect" && (
                      <td
                        className="px-4 py-1"
                        title={invoice.company?.business_name}
                      >
                        <div className="truncate max-w-[100px]">
                          {invoice.company?.business_name}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-1 text-right">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(invoice.total)}
                    </td>
                    <td className="px-4 py-1 text-right">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(invoice.totalAmountReceived)}
                    </td>
                    <td className="px-4 py-1 text-right">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(invoice.total - invoice.totalAmountReceived)}
                    </td>
                    <td className="px-4 py-1 flex items-center gap-2">
                      <button
                        title="Update invoice payment"
                        onClick={() => {
                          // setUserIdToDelete(user._id);
                          handleOpenPayUpdateModal(invoice);
                        }}
                        disabled={invoice.totalAmountReceived === invoice.total}
                        // className="bg-blue-500 text-white text-sm px-2 my-1 rounded"
                      >
                        <BadgePoundSterling
                          className={`text-blue-700 size-4 transition-all duration-300 ${invoice.totalAmountReceived === invoice.total ? "opacity-40 cursor-not-allowed text-gray-500" : "hover:scale-125"}`}
                        />
                      </button>
                      {/* <button
                    title="Delete this invoice"
                    onClick={() => {
                      // setUserIdToDelete(user._id);
                      // setShowModal(true);
                    }}
                    disabled={invoice.totalAmountReceived > 0}
                    // className="bg-red-500 text-white text-sm px-2 my-1 rounded"
                  >
                    <Trash2
                      className={`text-red-600 size-4 transition-all duration-300 ${invoice.totalAmountReceived > 0 ? "opacity-40 cursor-not-allowed text-gray-500" : "hover:scale-125"}`}
                    />
                  </button> */}

                      {/* <button
                    title="Edit this invoice"
                    onClick={() => {
                      // setShowModal(true);
                    }}
                    disabled={invoice.totalAmountReceived > 0}
                  >
                    <FilePenLine
                      className={`text-green-700 size-4 transition-all duration-300 ${
                        invoice.totalAmountReceived > 0
                          ? "opacity-40 cursor-not-allowed text-gray-500"
                          : "hover:scale-125"
                      }`}
                    />
                  </button> */}
                      <Link
                        title="Create PDF"
                        to={`/print-pdf/${invoice._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Share2
                          className={`text-green-700 size-4 transition-all duration-300 hover:scale-125`}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-[2px] border-t-black py-1 bg-gray-400">
                  <td className="py-2"></td>
                  <td className="py-2"></td>
                  <td className="py-2"></td>
                  <td className="py-2"></td>
                  <td className="py-2 text-right font-bold text-sm px-4">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(
                      selectedInvoices.reduce(
                        (sum, invoice) => sum + Number(invoice.total || 0),
                        0,
                      ),
                    )}
                  </td>
                  <td className="py-2 text-right font-bold text-sm px-4">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(
                      selectedInvoices.reduce(
                        (sum, invoice) =>
                          sum + Number(invoice.totalAmountReceived || 0),
                        0,
                      ),
                    )}
                  </td>
                  <td className="py-2 text-right font-bold text-sm px-4">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(
                      selectedInvoices.reduce(
                        (sum, invoice) => sum + Number(invoice.total || 0),
                        0,
                      ) -
                        selectedInvoices.reduce(
                          (sum, invoice) =>
                            sum + Number(invoice.totalAmountReceived || 0),
                          0,
                        ),
                    )}
                  </td>
                  <td className="py-2"></td>
                  <td className="py-2"></td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No Invoices found.</p>
          )}
        </div>
      </div>

      {/* modal for invoice payment update */}
      {showModal && (
        <DashInvoicePayUpdate
          invoice={selectedInvoice}
          showModal={showModal}
          setShowModal={setShowModal}
          getInvoices={getInvoices}
        />
      )}
    </div>
  );
}
