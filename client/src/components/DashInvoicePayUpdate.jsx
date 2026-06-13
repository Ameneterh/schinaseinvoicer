import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInvoiceStore } from "../store/invoiceStore";
import { useAuthStore } from "../store/authStore";
import { use } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

export default function DashInvoicePayUpdate({
  invoice,
  showModal,
  setShowModal,
  getInvoices,
}) {
  const { user } = useAuthStore();
  const { updateInvoicePayment, getAllInvoices } = useInvoiceStore();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [reference, setReference] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // const getInvoices = async () => {
  //   try {
  //     const { invoices } = await getAllInvoices();

  //     if (user.role === "architect") {
  //       setInvoices(invoices);
  //     } else {
  //       const filteredInvoice = invoices.filter(
  //         (invoice) => user.business._id === invoice.company._id,
  //       );
  //       setInvoices(filteredInvoice);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getInvoices();
  // }, [invoice.totalAmountReceived]);

  const formatNumber = (value) => {
    if (!value) return "";

    const parts = value.split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const handleChange = (e) => {
    let value = e.target.value.replace(/,/g, "");

    // Allow only numbers and one decimal point
    value = value.replace(/[^\d.]/g, "");

    // Prevent multiple decimal points
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    setPaymentAmount(value);
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();

    try {
      await updateInvoicePayment(
        invoice._id,
        paymentAmount,
        paymentMethod,
        reference,
      );
      getInvoices();
      toast.success("Invoice payment updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update invoice payment",
      );
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg mb-2 font-bold text-center">
          Update Invoice Payment{" "}
          <span className="text-sm block font-bold">
            {invoice.invoiceNumber}
          </span>
        </h2>

        <div className="flex flex-col p-2 rounded border text-sm">
          <p className="flex justify-between items-center">
            <span>Invoice Total:</span>
            <span>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(invoice.total)}
            </span>
          </p>
          <p className="flex justify-between items-center">
            <span>Total Received:</span>
            <span>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(invoice.totalAmountReceived)}
            </span>
          </p>
          <p className="flex justify-between items-center">
            <span>Invoice Balance:</span>
            <span>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(invoice.total - invoice.totalAmountReceived)}
            </span>
          </p>

          <div className="flex mt-2 rounded">
            <form
              onSubmit={handleUpdatePayment}
              className="w-full flex flex-col gap-2"
            >
              <div className="mt-2 relative rounded-md border border-black">
                <label className="absolute font-semibold -top-3 bg-white px-1 left-1 text-xs text-gray-800">
                  Payment Amount:
                </label>
                <input
                  type="text"
                  id="paymentAmount"
                  value={formatNumber(paymentAmount)}
                  onChange={handleChange}
                  required
                  className="w-full outline-none border-none focus:outline-none focus:border-none rounded-md p-2 bg-white"
                />
              </div>
              <div className="mt-2 relative rounded-md border border-black">
                <label className="absolute font-semibold -top-3 bg-white px-1 left-1 text-xs text-gray-800">
                  Payment Method:
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full outline-none border-none focus:outline-none focus:border-none rounded-md p-2 bg-white"
                >
                  <option value="">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="pos">POS</option>
                  <option value="transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="mt-2 relative rounded-md border border-black">
                <label className="absolute font-semibold -top-3 bg-white px-1 left-1 text-xs text-gray-800">
                  Reference (optional):
                </label>
                <input
                  type="text"
                  id="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full outline-none border-none focus:outline-none focus:border-none rounded-md p-2 bg-white"
                />
              </div>

              {/* buttons */}
              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 rounded py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 rounded py-2"
                >
                  Update Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
