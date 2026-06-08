import React from "react";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import { MdWhatsapp, MdAddCall } from "react-icons/md";
import { useAuthStore } from "../store/authStore";

export default function InvoiceFooter() {
  const { user } = useAuthStore();
  const today = new Date();

  return (
    <footer className="flex flex-col gap-8">
      <div className="flex gap-x-4 border-t-2 pt-3 justify-between">
        <div>
          <p className="text-xs">Invoice prepared by:</p>
          <ul className="">
            <li>
              <img src={user.staff_signature} className="w-24" />
            </li>
            <li className="font-bold uppercase text-sm">{user.fullname}</li>
            <li className="text-xs">{user.phoneNumber}</li>
          </ul>
        </div>
        <div className="flex flex-col mt-5 px-3 py-2 rounded-md w-96 gap-y-8 text-xs">
          <div className="flex gap-x-1">
            <p>Received by:</p>
            <p className="flex-1 border-b-2"></p>
          </div>
          <div className="flex gap-x-1">
            <p>Date:</p>
            <p className="flex-1 border-b-2"></p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-right mb-1 text-gray-500">
          Invoice created on{" "}
          <span>
            {today.getDate().toString().padStart(2, "0")}/
            {(today.getMonth() + 1).toString().padStart(2, "0")}/
            {today.getFullYear()} - {today.toLocaleTimeString()}
          </span>
        </p>
        <Divider />
      </div>
      {/* company advert for trial plans */}
      <div className="fixed bottom-0 left-0 w-full text-center text-xs text-gray-500 py-2 flex items-center gap-2 justify-center">
        <b>Schinase InvoiceCore</b> - coded and maintained by{" "}
        <span className="flex items-center">
          <MdWhatsapp /> <MdAddCall className="mx-1" />
          <Link
            to="tel:+2349028531506"
            className="text-blue-600 hover:underline underline-offset-2 font-bold"
          >
            09028531506
          </Link>
        </span>
      </div>
    </footer>
  );
}

export function PdfInvoiceFooter({ invoice }) {
  const { user } = useAuthStore();
  const today = new Date();

  return (
    <footer className="flex flex-col gap-8">
      <div className="flex gap-x-4 border-t-2 pt-3 justify-between">
        <div className="w-64">
          <p className="text-xs">Invoice prepared by:</p>
          <ul className="">
            <li>
              <img src={invoice?.createdBy?.staff_signature} className="w-24" />
            </li>
            <li className="font-bold uppercase text-sm">
              {invoice?.createdBy?.fullname}
            </li>
            <li className="text-xs">{invoice?.createdBy?.phoneNumber}</li>
          </ul>
        </div>
        <div className="flex flex-col mt-5 px-3 py-2 flex-1 gap-y-8 text-xs">
          <div className="flex gap-x-1">
            <p>Received by:</p>
            <p className="flex-1 border-b-2"></p>
          </div>
          <div className="flex gap-x-1">
            <p>Date:</p>
            <p className="flex-1 border-b-2"></p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-right mb-1 text-gray-500">
          Invoice created on{" "}
          <span>
            {invoice?.invDate &&
              new Date(invoice?.invDate).toLocaleDateString("en-GB", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}{" "}
            - {new Date(invoice?.invDate).toLocaleTimeString()}
          </span>
        </p>
        <Divider />
      </div>
    </footer>
  );
}
