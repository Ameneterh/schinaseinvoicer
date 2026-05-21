import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInvoiceStore } from "../store/invoiceStore";
import { useAuthStore } from "../store/authStore";
import { use } from "react";

export default function DashInvoicePayUpdate({
  invoice,
  showModal,
  setShowModal,
}) {
  const { user } = useAuthStore();
  const { updateInvoicePayment, getAllInvoices } = useInvoiceStore();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [invoices, setInvoices] = useState([]);
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
    getInvoices();
  }, [invoice.totalAmountReceived]);

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
      await updateInvoicePayment(invoice._id, paymentAmount);
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
      <div className="bg-white p-6 rounded shadow-lg w-80">
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
            <form onSubmit={handleUpdatePayment}>
              <label htmlFor="paymentAmount" className="text-sm mb-1">
                Payment Amount:
              </label>

              <input
                type="text"
                id="paymentAmount"
                className=" rounded p-2 text-sm w-full"
                placeholder="Enter payment amount"
                value={formatNumber(paymentAmount)}
                onChange={handleChange}
              />
              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 rounded"
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
