import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceFooter from "../components/InvoiceFooter";
import InvoiceNotes from "../components/InvoiceNotes";
import InvoiceTable from "../components/InvoiceTable";
import ClientDetails from "../components/ClientDetails";
import CompanyDetails from "../components/CompanyDetails";
import { useState } from "react";
import TableForm from "../components/TableForm";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import { useAuthStore } from "../store/authStore";
import { useClientStore } from "../store/clientStore";
import { useInvoiceStore } from "../store/invoiceStore";
import { Input, InvInput } from "../components/Input";
import {
  CalendarDays,
  FileDigit,
  FolderPen,
  Mail,
  MapPinCheck,
  PhoneCall,
} from "lucide-react";
import { MdAddBusiness, MdLockReset } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { FaSave } from "react-icons/fa";
import Counter from "../../../server/models/counter.model.js";

export default function CreateInvoice() {
  const { user } = useAuthStore();
  const { createInvoice, getAllInvoices } = useInvoiceStore();

  const navigate = useNavigate();

  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });

  const [isChecked, setIsChecked] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const [client_name, setName] = useState("");
  const [client_address, setAddress] = useState("");
  const [client_phone, setPhone] = useState("");
  const [client_email, setEmail] = useState("");
  // const [invoiceNumber, setInvNumber] = useState("");
  // const [invDate, setInvDate] = useState(Date.now());
  const [invoiceType, setInvoiceType] = useState("");
  const [validity, setValidity] = useState("");

  //   invoice table states
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  //   populate list
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  //   get clients and one client
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const { registerClient, getAllClients, getOneClient } = useClientStore();

  const getRegisteredClients = async () => {
    try {
      const { clients } = await getAllClients();
      const filteredClients = clients.filter(
        (client) => user.business._id === client.staff.business._id,
      );
      setClients(filteredClients);
    } catch (error) {
      console.log(error);
    }
  };

  // const getInvoices = async () => {
  //   try {
  //     const { invoices } = await getAllInvoices();
  //     // const filteredInvoices = invoices.filter(
  //     //   (invoice) => user.business._id === invoice.company._id,
  //     // );
  //     setInvoices(invoices);
  //     // setInvNumber((invoices.length + 1).toString().padStart(6, "0"));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getInvoices = async () => {
  //   try {
  //     const { invoices } = await getAllInvoices();
  //     const filteredInvoices = invoices.filter(
  //       (invoice) => user.affiliation._id === invoice.company._id
  //     );
  //     setInvoices(filteredInvoices);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (user.fullname === undefined) {
      navigate("/add-handler");
    }
    getRegisteredClients();
    // getInvoices();
  }, []);

  const getClient = async (clientId) => {
    try {
      const { client } = await getOneClient(clientId);
      setClient(client);
      setName(client.client_name);
      setEmail(client.client_email);
      setPhone(client.client_phone);
      setAddress(client.client_address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const staff = user._id;
    try {
      await registerClient(
        client_name,
        client_email,
        client_phone,
        client_address,
        staff,
      );
      getRegisteredClients();
      setIsChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  // reset client details
  const resetClient = () => {
    window.location.reload();
    setClient(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    // setIsChecked(true);
  };

  // save invoice
  const saveInvoice = async () => {
    const invoiceDate = new Date().toISOString();
    // getInvoices();

    try {
      await createInvoice({
        validity,
        // invoiceNumber: "INV/" + new Date().getFullYear() + "/" + invoiceNumber,
        // invoiceNumber: generateInvoiceNumber(),
        invDate: invoiceDate,
        items: list,
        // total,
        invoiceType,
        // createdBy: user._id,
        client: client._id,
      });

      toast.success("Invoice saved successfully");
      navigate("/user-dashboard?tab=invoices");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="md:px-10 mt-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl bg-white"
      >
        <p className="text-xl font-extrabold mb-4">Create New Invoice</p>
        {/* content of invoice to print */}
        {showInvoice ? (
          <>
            <div ref={contentRef} className="w-full px-20 py-10 relative">
              <CompanyDetails business={user.business} />

              <ClientDetails
                client_name={client_name}
                client_address={client_address}
                client_phone={client_phone}
                client_email={client_email}
                // inv_number={invoiceNumber}
                inv_number="Auto Gen"
                // inv_date={new Date()}
                validity={validity}
                invoiceType={invoiceType}
                total={total}
              />

              <InvoiceTable
                jobTitle={jobTitle}
                jobDescription={jobDescription}
                quantity={quantity}
                rate={rate}
                amount={amount}
                list={list}
                setList={setList}
                total={total}
                setTotal={setTotal}
              />

              {/* <AmountInWords /> */}

              <InvoiceNotes />

              <InvoiceFooter />
            </div>
            <div className="flex flex-col sm:flex-row gap-y-3 gap-x-3 items-center justify-center border-t border-gray-500 py-4 mt-4">
              <button
                onClick={() => setShowInvoice(false)}
                className="hover:bg-blue-600 text-blue-600 font-bold py-2 px-8 rounded shadow border-2 border-blue-600 bg-white hover:text-white transition-all duration-300"
              >
                Edit Invoice
              </button>

              {/* <InvoiceHeader handlePrint={handlePrint} /> */}
              <InvoiceHeader saveInvoice={saveInvoice} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center gap-y-5">
              {/* client details */}
              <article className="flex flex-col gap-y-3 px-5 border border-gray-300 rounded">
                <div className="flex items-center gap-2 mt-3">
                  <h1 className="text-xl font-bold">Enter Client Details</h1>
                  <p className="flex-1 h-[1px] bg-slate-500"></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center mb-1">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <p>Choose Client</p>
                    </div>
                    <select
                      onChange={(e) => getClient(e.target.value)}
                      className="w-full sm:w-1/4 pl-3 pr-3 py-2 rounded-lg border border-gray-700 text-sm placeholder-gray-400 transition duration-200 flex-1"
                    >
                      <option>Select your Client</option>
                      {clients &&
                        clients.map((client, index) => {
                          return (
                            <option key={index} value={client?._id}>
                              {client?.client_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  {client && (
                    <motion.button
                      className="py-2 px-4 border border-gray-600 rounded text-gray-700 hover:bg-gray-500 hover:text-white transition duration-200 cursor-pointer flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetClient}
                    >
                      <MdLockReset className="rounded-full mr-1" size={24} />
                      Reset
                    </motion.button>
                  )}

                  {!client && (
                    <>
                      <p>OR</p>
                      <motion.button
                        className="py-2 px-4 border border-gray-600 rounded text-gray-700 hover:bg-gray-500 hover:text-white transition duration-200 cursor-pointer flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsChecked(!isChecked)}
                      >
                        <MdAddBusiness
                          className="rounded-full mr-1"
                          size={24}
                        />
                        Add New Client
                      </motion.button>
                    </>
                  )}
                </div>

                {/* show client details when choice made */}
                {client && (
                  <div className="flex flex-col">
                    <h1 className="font-bold">Invoice to:</h1>
                    <div className="ml-2 sm:ml-5">
                      <p>{client?.client_name}</p>
                      <p className="text-xs">{client?.client_address}</p>
                      <p className="text-xs">{client?.client_email}</p>
                      <p className="text-xs">{client?.client_phone}</p>
                    </div>
                  </div>
                )}

                {/* activate add new client */}
                <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
                  {!client && isChecked && (
                    <>
                      {/* save client functionality */}
                      <form
                        onSubmit={handleAddClient}
                        className="w-full px-2 border border-gray-400 shadow-md shadow-gray-700 rounded-md"
                      >
                        <p className="text-red-950 text-lg py-2 font-bold">
                          Add New Client:
                        </p>
                        <div className="md:grid grid-cols-3 gap-10">
                          <div className="flex flex-col flex-1">
                            {/* <label
                              htmlFor="client_name"
                              className="text-sm mb-1"
                            >
                              Enter Client's Name
                            </label> */}
                            <InvInput
                              icon={FolderPen}
                              type="text"
                              name="client_name"
                              id="client_name"
                              // placeholder={
                              //   client?.client_name || "Enter Client Name"
                              // }
                              label={client?.client_name || "Enter Client Name"}
                              autoComplete="off"
                              value={client?.client_name || client_name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              disabled={!isChecked}
                            />
                          </div>
                          <div className="flex flex-col flex-1">
                            {/* <label
                              htmlFor="client_phone"
                              className="text-sm mb-1"
                            >
                              Enter Client's Phone
                            </label> */}
                            <InvInput
                              icon={PhoneCall}
                              type="text"
                              name="client_phone"
                              id="client_phone"
                              // placeholder="Enter Client Phone"
                              label="Enter Client Phone"
                              autoComplete="off"
                              value={client?.client_phone || client_phone}
                              onChange={(e) => setPhone(e.target.value)}
                              disabled={!isChecked}
                            />
                          </div>
                          <div className="flex flex-col flex-1">
                            {/* <label
                              htmlFor="client_email"
                              className="text-sm mb-1"
                            >
                              Enter Client's Email
                            </label> */}
                            <InvInput
                              icon={Mail}
                              type="text"
                              name="client_email"
                              id="client_email"
                              // placeholder="Enter Client Email"
                              label="Enter Client Email"
                              autoComplete="off"
                              className="p-2"
                              value={client?.client_email || client_email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={!isChecked}
                            />
                          </div>
                        </div>

                        <div className="flex items-end gap-2 mb-4">
                          <div className="flex flex-col flex-1">
                            {/* <label
                              htmlFor="client_address"
                              className="text-sm mb-1"
                            >
                              Enter Client's Address
                            </label> */}
                            <InvInput
                              icon={MapPinCheck}
                              name="client_address"
                              id="client_address"
                              // placeholder="Enter Client Address"
                              label="Enter Client Address"
                              autoComplete="off"
                              value={client?.client_address || client_address}
                              onChange={(e) => setAddress(e.target.value)}
                              disabled={!isChecked}
                            />
                          </div>

                          <motion.button
                            className="mt-5 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-700 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                          >
                            Add To Database
                          </motion.button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </article>

              {/* invoice details */}
              <article className="flex flex-col gap-y-3 px-5 border border-gray-300 rounded">
                <div className="md:grid grid-cols-4 gap-10 my-3">
                  <div className="flex flex-col flex-1">
                    {/* <label htmlFor="inv_number" className="text-sm mb-1">
                      Invoice Number
                    </label> */}
                    <InvInput
                      icon={FileDigit}
                      type="text"
                      name="inv_number"
                      id="inv_number"
                      label="Invoice Number"
                      // placeholder="Invoice Number"
                      autoComplete="off"
                      value="Auto Generated"
                      // onChange={(e) => setInvNumber(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    {/* <label htmlFor="inv_date" className="text-sm mb-1">
                      Invoice Date
                    </label> */}
                    <InvInput
                      icon={CalendarDays}
                      type="string"
                      name="inv_date"
                      id="inv_date"
                      label="Invoice Date"
                      // placeholder="Enter Invoice Date"
                      autoComplete="off"
                      className="p-2"
                      value={new Date().toLocaleDateString()}
                      onChange={(e) => setInvDate(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col flex-1 relative mt-2">
                    <label
                      htmlFor="validity"
                      className="text-sm mb-1 absolute -top-3 left-2 bg-white px-1"
                    >
                      Invoice Type
                    </label>
                    <select
                      // type="text"
                      // name="invoice_type"
                      id="invoice_type"
                      className="p-2"
                      onChange={(e) => setInvoiceType(e.target.value)}
                    >
                      <option>Select Invoice Type</option>
                      <option value="proforma">Proforma Invoice</option>
                      <option value="cash">Cash Sales Invoice</option>
                    </select>
                  </div>

                  {invoiceType === "proforma" ? (
                    <div className="flex flex-col flex-1">
                      {/* <label htmlFor="validity" className="text-sm mb-1">
                        Validity Period (Days)
                      </label> */}
                      <InvInput
                        icon={Mail}
                        type="number"
                        name="validity"
                        id="validity"
                        // placeholder="Validity Period (Days)"
                        label="Validity Period (Days)"
                        autoComplete="off"
                        value={validity}
                        onChange={(e) => setValidity(e.target.value)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </article>

              {/* table form */}
              <article>
                <TableForm
                  jobTitle={jobTitle}
                  setJobTitle={setJobTitle}
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  rate={rate}
                  setRate={setRate}
                  amount={amount}
                  setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                />
              </article>

              {/* preview button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-3">
                <motion.button
                  className="py-3 px-8 bg-gradient-to-r from-slate-600 to-blue-800 rounded-lg hover:border-white hover:from-blue-800 hover:to-slate-600 border focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInvoice(true)}
                >
                  <VscPreview className="mr-2" size={18} />
                  Preview Invoice
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
