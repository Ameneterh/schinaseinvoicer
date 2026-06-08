import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function TableForm({
  jobTitle,
  setJobTitle,
  jobDescription,
  setJobDescription,
  information,
  quantity,
  setQuantity,
  rate,
  setRate,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // calculate amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(Number(quantity) * Number(rate));
    };

    calculateAmount(amount);
  }, [quantity, rate, amount, setAmount]);

  //   calculate total amount of items in the invoice
  useEffect(() => {
    const sum = list.reduce((acc, item) => {
      return acc + Number(item.quantity) * Number(item.rate);
    }, 0);

    setTotal(sum);
  }, [list]);

  //   submit table
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobTitle || !jobDescription || !quantity || !rate) {
      alert("Please, fill all fields");
    } else {
      const newItem = {
        id: uuidv4(),
        jobTitle,
        jobDescription,
        quantity,
        rate,
        amount,
      };

      setJobTitle("");
      setJobDescription("");
      setQuantity("");
      setRate("");
      setAmount("");

      setList([...list, newItem]);
      setIsEditing(false);
    }
  };

  // Edit Function
  const editItem = (id) => {
    const editingItem = list.find((item) => item.id === id);
    setList(list.filter((item) => item.id !== id));
    setIsEditing(true);
    setJobTitle(editingItem.jobTitle);
    setJobDescription(editingItem.jobDescription);
    setQuantity(editingItem.quantity);
    setRate(editingItem.rate);
    setAmount(editingItem.amount);
  };

  // Delete FUnction
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="mb-10 p-4 border rounded-lg">
      <div className="flex items-center w-full gap-3 mb-5">
        <h1 className="text-xl font-bold">Enter Job Details</h1>
        <p className="flex-1 h-[1px] bg-gray-600"></p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col relative">
            <label
              htmlFor="job_title"
              className="text-sm px-1 mb-1 absolute -top-[10px] left-2 bg-white"
            >
              Item/Job Title
            </label>
            <input
              type="text"
              name="job_title"
              id="job_title"
              // placeholder="Item/Job Title"
              className="p-2"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative mt-5 md:mt-0">
            <label
              htmlFor="job_description"
              className="text-sm px-1 mb-1 absolute -top-[10px] left-2 bg-white"
            >
              Item/Job Description
            </label>
            <input
              type="text"
              name="job_description"
              id="job_description"
              // placeholder="Item/Job Description"
              className="p-2"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="md:grid grid-cols-3 gap-10 mt-6">
          <div className="flex flex-col relative">
            <label
              htmlFor="quantity"
              className="text-sm px-1 mb-1 absolute -top-[10px] left-2 bg-white"
            >
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              // placeholder="Quantity"
              className="p-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative mt-5 md:mt-0">
            <label
              htmlFor="rate"
              className="text-sm px-1 mb-1 absolute -top-[10px] left-2 bg-white"
            >
              Rate
            </label>
            <input
              type="text"
              name="rate"
              id="rate"
              // placeholder="Rate"
              className="p-2"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative mt-5 md:mt-0">
            <label
              htmlFor="amount"
              className="text-sm px-1 mb-1 absolute -top-[10px] left-2"
            >
              Amount
            </label>
            <p className="font-bold flex flex-1 items-center bg-[#f1f1f1] px-3 py-4 md:py-0 rounded">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(amount || 0)}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 mt-6 mb-10 border-none"
        >
          {isEditing ? "Add Edited Item" : "Add New Invoice Item"}
        </button>
      </form>

      {/* show table items */}
      <div className="flex flex-col gap-y-3 border-2 rounded py-2 px-4">
        <h1 className="mb-1 text-xl font-bold">Added Item/Job</h1>
        <table width="100%">
          <thead>
            <tr className="bg-gray-50 h-10 border-none text-sm">
              <td className="font-bold text-center">S/N</td>
              <td className="font-bold">Item/Job Description</td>
              <td className="font-bold text-right md:pr-3">Qty</td>
              <td className="font-bold text-right md:pr-3">Rate</td>
              <td className="font-bold text-right md:pr-3">Amount</td>
              <td className="font-bold">Actions</td>
            </tr>
          </thead>
          {list.map(
            (
              { id, jobTitle, jobDescription, quantity, rate, amount },
              index,
            ) => (
              <React.Fragment key={id}>
                <tbody className="text-sm">
                  <tr className="">
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <p className="font-bold">
                        {jobTitle}
                        <span className="block font-normal">
                          {jobDescription}
                        </span>
                      </p>
                    </td>
                    <td className="text-right md:pr-3">{quantity}</td>
                    <td className="text-right md:pr-3">{rate}</td>
                    <td className="amount text-right md:pr-3">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(Number(quantity) * Number(rate) || 0)}
                    </td>
                    {/* <td className="amount text-right md:pr-3">{amount}</td> */}
                    <td className="">
                      <div className="flex items-center gap-3">
                        <span onClick={() => deleteItem(id)}>
                          <MdOutlineDelete className="text-2xl text-red-600 hover:scale-150 transition-all duration-300" />
                        </span>
                        <span onClick={() => editItem(id)}>
                          <CiEdit className="text-2xl text-green-600 hover:scale-150 transition-all duration-300" />
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            ),
          )}
        </table>
        <div>
          Gross Total:{" "}
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(total || 0)}
        </div>
      </div>
    </div>
  );
}
