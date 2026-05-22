import React from "react";
import { useAuthStore } from "../store/authStore";
import { TbCurrencyNaira } from "react-icons/tb";
import { useEffect } from "react";
import { useState } from "react";

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
  const { getAllUsers } = useAuthStore();
  const [receiver, setReceiver] = useState(null);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await getAllUsers();

  //     console.log(invoice);

  //     const cashier = users?.users?.filter(
  //       (user) => user._id === invoice?.paymentRecords?.receivedBy,
  //     );

  //     setReceiver(cashier);
  //   };
  //   getUsers();
  // }, []);

  return (
    <section className="mb-5 flex flex-col justify-between p-2 bg-gray-100 rounded w-full text-sm">
      <ul className="flex-1 text-sm">
        <li className="flex gap-4">
          <span>
            Bank Name:{" "}
            <span className="font-bold">{invoice?.company?.banker}</span>
          </span>
          <span className="block">
            Account Number:{" "}
            <span className="font-bold">
              {invoice?.company?.account_number}
            </span>
          </span>
        </li>
        <li>
          Account Name:{" "}
          <span className="font-bold">{invoice?.company?.account_name}</span>
        </li>
      </ul>

      <div className="flex-1 bg-white rounded px-2 py-1 text-sm">
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

      <div className="flex flex-col mt-2 text-[12px]">
        <div className="block w-full mt-1">
          {invoice?.paymentRecords?.length > 0 ? (
            <>
              <p className="font-bold">Details of Payment:</p>
              <table className="w-full text-left border-collapse border-0">
                <thead className="bg-gray-200 *border-b-2 border-black">
                  <tr>
                    <th className="border px-1 text-center">Date Paid</th>
                    <th className="border px-1 text-right">Amount Paid</th>
                    <th className="border px-1 text-center">Payment Method</th>
                    <th className="border px-1">Receiver</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.paymentRecords?.map((record) => (
                    <tr key={record._id}>
                      <td className="border px-1 text-center">
                        {record.createdAt &&
                          new Date(record.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                      </td>
                      <td className="border px-1 text-right">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(record.amount)}
                      </td>
                      <td className="border px-1 capitalize text-center">
                        {record.paymentMethod}
                      </td>
                      <td className="border px-1">
                        {record?.receivedBy?.fullname}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No payment records found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
