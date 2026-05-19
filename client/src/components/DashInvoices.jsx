import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useInvoiceStore } from "../store/invoiceStore";
import { Trash2, FilePenLine, BadgePoundSterling, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import DashInvoicePayUpdate from "./DashInvoicePayUpdate";

export default function DashInvoices() {
  const { user } = useAuthStore();
  const { getAllInvoices } = useInvoiceStore();

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

  console.log(selectedInvoice);

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

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-xl font-extrabold mb-4">List of Invoices:</h1>
      {invoices.length > 0 ? (
        <table className="border-collapse">
          <thead className="">
            <tr className="border-b-[2px] border-b-black">
              <th className="text-left px-4 py-1">Inv Date</th>
              <th className="text-left px-4 py-1">Inv No</th>
              <th className="text-left px-4 py-1">Client</th>
              <th className="text-right px-4 py-1">Inv Amt</th>
              <th className="text-right px-4 py-1">Total Pay</th>
              <th className="text-right px-4 py-1">Balance</th>
              <th className="text-left px-4 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="">
                <td className="px-4 text-sm">
                  {invoice.invDate
                    ? new Date(invoice.invDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </td>
                <td className="px-4 text-sm">{invoice.invoiceNumber}</td>
                <td className="px-4 text-sm">{invoice.client.client_name}</td>
                <td className="px-4 text-sm text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.total)}
                </td>
                <td className="px-4 text-sm text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.totalAmountReceived)}
                </td>
                <td className="px-4 text-sm text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(invoice.total - invoice.totalAmountReceived)}
                </td>
                <td className="px-4 text-sm flex items-center gap-2">
                  <button
                    onClick={() => {
                      // setUserIdToDelete(user._id);
                      handleOpenPayUpdateModal(invoice);
                    }}
                    // className="bg-blue-500 text-white text-sm px-2 my-1 rounded"
                  >
                    <BadgePoundSterling
                      className={`text-blue-700 size-4 transition-all duration-300 ${invoice.totalAmountReceived === invoice.total ? "opacity-40 cursor-not-allowed text-gray-500" : "hover:scale-125"}`}
                    />
                  </button>
                  <button
                    onClick={() => {
                      // setUserIdToDelete(user._id);
                      setShowModal(true);
                    }}
                    disabled={invoice.totalAmountReceived > 0}
                    // className="bg-red-500 text-white text-sm px-2 my-1 rounded"
                  >
                    <Trash2
                      className={`text-red-600 size-4 transition-all duration-300 ${invoice.totalAmountReceived > 0 ? "opacity-40 cursor-not-allowed text-gray-500" : "hover:scale-125"}`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setShowModal(true);
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
