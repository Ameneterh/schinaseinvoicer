import React from "react";
import { useAuthStore } from "../store/authStore";
import { TbCurrencyNaira } from "react-icons/tb";

export default function InvoiceNotes() {
  const { user } = useAuthStore();

  return (
    <section className="mb-5 flex flex-col sm:flex-row justify-between p-2 bg-gray-100 rounded max-w-96 text-sm">
      <ul className="flex-1">
        <li>
          Bank Name: <span className="font-bold">{user.business.banker}</span>
        </li>
        <li>
          Account Name:{" "}
          <span className="font-bold">{user.business.account_name}</span>
        </li>
        <li>
          Account Number:{" "}
          <span className="font-bold">{user.business.account_number}</span>
        </li>
      </ul>

      {/* <div className="flex-1 bg-slate-100">
        <p className="font-bold">Please Note:</p>
        <p className="">Information</p>
      </div> */}
    </section>
  );
}

export function PdfInvoiceNotes({ invoice }) {
  console.log(invoice);

  return (
    <section className="mb-5 flex flex-col justify-between p-2 bg-gray-100 rounded w-full text-sm">
      <ul className="flex-1">
        <li>
          Bank Name:{" "}
          <span className="font-bold">{invoice?.company?.banker}</span>
        </li>
        <li>
          Account Name:{" "}
          <span className="font-bold">{invoice?.company?.account_name}</span>
        </li>
        <li>
          Account Number:{" "}
          <span className="font-bold">{invoice?.company?.account_number}</span>
        </li>
      </ul>

      <div className="flex-1 bg-white rounded px-2 py-1">
        <p className="font-bold">Payment Information:</p>
        <div className="flex items-center justify-between flex-col md:flex-row gap-2 mt-1">
          <p className="text-left">
            Invoice Amt:
            <span className="flex -mt-1 text-sm font-bold">
              <TbCurrencyNaira className="text-lg" />
              {invoice?.total?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className="text-center">
            Total Paid:
            <span className="flex items-center -mt-1 text-sm font-bold">
              <TbCurrencyNaira className="text-lg" />
              {invoice?.totalAmountReceived?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className="text-right">
            Balance:
            <span className="flex -mt-1 text-sm font-bold">
              <TbCurrencyNaira className="text-lg" />
              {(invoice?.total - invoice?.totalAmountReceived).toLocaleString(
                "en-US",
                {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                },
              )}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
