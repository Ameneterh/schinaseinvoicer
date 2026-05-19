import React from "react";
import { MdAddCall, MdEmail, MdLocationCity } from "react-icons/md";
import Divider from "./Divider";

export default function CompanyDetails({ business }) {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <img src={business?.business_logo} className="w-14 h-14" />
          <div className="flex flex-col text-sm">
            <p className="text-3xl font-bold">{business?.business_name}</p>
            <p className="flex items-start gap-2 text-xs">
              <MdLocationCity />
              {business?.business_address}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <p className="flex items-center gap-2">
                <MdEmail />
                {business?.business_email}
              </p>
              <p className="flex items-center gap-2">
                <MdAddCall />
                {business?.business_phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
