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

export default function DashInvoices() {
  const { user } = useAuthStore();
  const { getAllInvoices } = useInvoiceStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [invoices, setInvoices] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
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
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex items-center justify-between mb-3 gap-4">
        <h1 className="text-xl font-extrabold">List of Invoices:</h1>
        <div className="flex flex-wrap gap-3 text-sm">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-2"
          >
            <option value="date">Invoice Date</option>
            <option value="client">Client</option>
            <option value="status">Payment Status</option>

            {user.role === "architect" && (
              <option value="company">Company</option>
            )}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="complete">Complete</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="w-full max-w-96">
          <Input
            icon={Search}
            type="text"
            placeholder="Search invoice, client, date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
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
              <tr key={invoice._id} className="">
                <td
                  className="px-4 text-sm py-1 text-nowrap"
                  title={new Date(invoice.invDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                >
                  {invoice.invDate
                    ? new Date(invoice.invDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </td>
                <td className="px-4 text-sm py-1" title={invoice.invoiceNumber}>
                  {invoice.invoiceNumber}
                </td>
                <td
                  className="px-4 text-sm py-1 line-clamp-1"
                  title={invoice.client.client_name}
                >
                  {invoice.client.client_name}
                </td>
                {user.role === "architect" && (
                  <td
                    className="px-4 text-sm py-1"
                    title={invoice.company?.business_name}
                  >
                    <div className="truncate max-w-[100px]">
                      {invoice.company?.business_name}
                    </div>
                  </td>
                )}
                <td className="px-4 text-sm py-1 text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.total)}
                </td>
                <td className="px-4 text-sm py-1 text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.totalAmountReceived)}
                </td>
                <td className="px-4 text-sm py-1 text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.total - invoice.totalAmountReceived)}
                </td>
                <td className="px-4 text-sm py-1 flex items-center gap-2">
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
                  <button
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
                  </button>

                  <button
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
                  </button>
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

      {/* modal for invoice payment update */}
      {showModal && (
        <DashInvoicePayUpdate
          invoice={selectedInvoice}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
