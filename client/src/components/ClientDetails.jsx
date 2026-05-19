import React, { useState } from "react";

export default function ClientDetails({
  client_name,
  client_address,
  client_phone,
  client_email,
  inv_number,
  inv_date,
  invoiceType,
  validity,
}) {
  // const { business } = useSelector((state) => state.businesses);
  const [invoiceDate] = useState(new Date());

  const dueDate = new Date(invoiceDate);
  dueDate.setDate(invoiceDate.getDate() + Number(validity));

  return (
    <section className="mb-3 flex flex-col items-start justify-between p-4 border-2 rounded">
      <div className="my-3 text-center text-2xl w-full prata-regular">
        {invoiceType === "proforma" ? (
          <p>Proforma Invoice</p>
        ) : (
          <p>Cash Sales Invoice</p>
        )}
      </div>

      <div className="flex w-full justify-between">
        {/* client name, address, phone, email */}
        <div>
          <p className="font-bold">Invoiced to:</p>
          <div className="ml-5 flex flex-col">
            <h1 className="font-bold uppercase">{client_name}</h1>
            <p className="text-xs">{client_address}</p>
            <p className="flex items-center gap-2 text-xs">
              <span>{client_phone}</span>
              <span>{client_email}</span>
            </p>
          </div>
        </div>

        {/* invoice number, invoice date, due date */}
        <div className="flex flex-col items-end justify-end text-xs">
          <ul>
            <li className="px-2">
              <span className="font-bold">Inv Number:</span> {inv_number}
            </li>
            <li className="py-1 px-2 border-t-[1px] border-b-[1px]">
              <span className="font-bold">Inv Date:</span>{" "}
              {inv_date ? (
                <>
                  {new Date(inv_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </>
              ) : (
                <>
                  {invoiceDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </>
              )}
            </li>
            <li className="px-2">
              {invoiceType === "proforma" ? (
                <>
                  <span className="font-bold">Validity:</span> {validity} days{" "}
                  <span className="font-bold">
                    Due on:{" "}
                    <span className="font-normal">
                      {dueDate.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
