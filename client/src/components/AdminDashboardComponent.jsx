import React from "react";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";

export default function AdminDashboardComponent({
  totalUsers,
  lastMonthUsers,
  heading,
  type,
}) {
  return (
    <div className="flex flex-col p-3 bg-gray-200 hover:bg-opacity-70 min-w-64 w-full md:w-64 min-h-[110px] rounded-md shadow-md cursor-pointer">
      <div className="flex gap-2 items-center justify-between">
        <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        <div className="">
          <h3 className="text-gray-500 text-md uppercase">{heading}</h3>
        </div>
      </div>
      <p className="text-3xl my-2">
        {totalUsers}
        <span className="text-sm ml-2">{type}</span>
      </p>
      <div className="flex gap-2 text-sm items-center">
        <span className="text-green-500 text-lg flex items-center">
          <HiArrowNarrowUp />
          {lastMonthUsers}
        </span>
        <div className="text-gray-500 capitalize">{type} Last Month</div>
      </div>
    </div>
  );
}

export function UserDashboardComponents({
  totalPaid,
  icon,
  text,
  bgColor,
  indicator,
}) {
  return (
    <div
      className={`flex flex-row items-center justify-between min-w-[120px] w-full sm:w-64 h-[110px] rounded overflow-hidden border border-white bg-${bgColor}`}
    >
      <div className="p-3">
        <p className="text-2xl">NGN {totalPaid.toLocaleString()}</p>
        <h2>{text}</h2>
      </div>
      <div
        className={`h-full  p-1 flex items-center text-3xl text-green-700 ${indicator}`}
      >
        {icon}
      </div>
    </div>
  );
}
