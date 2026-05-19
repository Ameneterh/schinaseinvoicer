import React from "react";
import { toWords } from "number-to-words";
import { TbCurrencyNaira } from "react-icons/tb";

export default function InvoiceTable({ list, total }) {
  return (
    <section className="my-5">
      <table width="100%" className="text-xs">
        <thead>
          <tr className="bg-gray-100 h-10">
            <td className="font-bold px-2 text-center">S/N</td>
            <td className="font-bold px-2">Item/Job Description</td>
            <td className="font-bold px-2 text-right">Qty</td>
            <td className="font-bold px-2 text-right">Rate</td>
            <td className="font-bold px-2 text-right">Amount</td>
          </tr>
        </thead>
        {list?.map(
          ({ id, jobTitle, jobDescription, quantity, rate, amount }, index) => (
            <React.Fragment key={index}>
              <tbody>
                <tr className="text-sm border-b border-gray-300">
                  <td className="px-2 text-center">{index + 1}</td>
                  <td className="px-2">
                    <p className="font-bold">
                      {jobTitle}
                      <span className="block font-normal">
                        {jobDescription}
                      </span>
                    </p>
                  </td>
                  <td className="px-2 text-right">{quantity}</td>
                  <td className="px-2 text-right">{rate}</td>
                  <td className="px-2 text-right amount">
                    {amount.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          ),
        )}
      </table>
      <div className="mt-5 rounded flex items-start gap-4 w-full justify-between">
        <div className=" p-2 bg-gray-50 flex items-start gap-4 md:w-3/4 min-h-[72px] flex-1">
          <h2 className="font-bold text-xs">Amount in Words:</h2>
          <p className="capitalize text-xs">
            {total && toWords(Number(total))} Naira only
          </p>
        </div>
        <p className="flex flex-col items-center gap-1 font-bold p-2 border rounded">
          <span>Grand Total:</span>
          <span className="flex items-center -mt-2 text-xl">
            <TbCurrencyNaira className="text-2xl" />
            {total?.toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </p>
      </div>
    </section>
  );
}
