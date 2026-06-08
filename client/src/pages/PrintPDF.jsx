import { useEffect, useRef } from "react";
import { MdAddCall, MdEmail, MdLocationCity, MdWhatsapp } from "react-icons/md";
import Divider from "../components/Divider";

import { useReactToPrint } from "react-to-print";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceFooter, { PdfInvoiceFooter } from "../components/InvoiceFooter";
import InvoiceNotes, { PdfInvoiceNotes } from "../components/InvoiceNotes";
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
import { Button } from "flowbite-react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
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
import { Link, useParams } from "react-router-dom";

export default function PrintPDF() {
  const { invoiceId } = useParams();

  const { user } = useAuthStore();
  const { createInvoice, getAllInvoices, getInvoiceById } = useInvoiceStore();

  const navigate = useNavigate();

  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });

  const [isChecked, setIsChecked] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const [client_name, setName] = useState("");
  const [client_address, setAddress] = useState("");
  const [client_phone, setPhone] = useState("");
  const [client_email, setEmail] = useState("");
  const [invoiceNumber, setInvNumber] = useState("");
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
  const [invoice, setInvoice] = useState([]);

  const { registerClient, getAllClients, getOneClient } = useClientStore();

  const getInvoice = async (invoiceId) => {
    try {
      const { invoice } = await getInvoiceById(invoiceId);

      setInvoice(invoice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.fullname === undefined) {
      navigate("/add-handler");
    }
    getInvoice(invoiceId);
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
    getInvoices();

    try {
      await createInvoice({
        validity,
        invoiceNumber: "INV/" + new Date().getFullYear() + "/" + invoiceNumber,
        invDate: invoiceDate,
        items: list,
        total,
        invoiceType,
        createdBy: user._id,
        client: client._id,
      });
      navigate("/user-dashboard?tab=invoices");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl bg-white"
      >
        <div ref={contentRef} className="w-full px-20 py-10 relative">
          <CompanyDetails business={invoice?.company} />

          <ClientDetails
            client_name={invoice?.client?.client_name}
            client_address={invoice?.client?.client_address}
            client_phone={invoice?.client?.client_phone}
            client_email={invoice?.client?.client_email}
            inv_number={invoice?.invoiceNumber}
            inv_date={invoice?.invDate}
            validity={invoice?.validity}
            invoiceType={invoice?.invoiceType}
            total={invoice?.total}
          />

          <InvoiceTable
            jobTitle={jobTitle}
            jobDescription={jobDescription}
            quantity={quantity}
            rate={rate}
            amount={amount}
            list={invoice?.items}
            setList={setList}
            total={invoice?.total}
            setTotal={setTotal}
          />

          {/* <AmountInWords /> */}

          <PdfInvoiceNotes invoice={invoice} />

          <PdfInvoiceFooter invoice={invoice} />

          {/* company advert on footer */}
          <div className="text-xs flex items-center gap-2 w-full justify-center fixed bottom-0 left-0 text-center text-gray-500 py-2">
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
        </div>
        <div className="flex flex-col sm:flex-row gap-y-3 gap-x-3 items-center justify-center border-t border-gray-500 py-4 mt-4">
          <Button
            className="bg-blue-600 text-white hover:bg-opacity-70 px-8 py-2 rounded flex items-center gap-2"
            onClick={handlePrint}
          >
            <FaRegFilePdf className="text-xl mr-2" />
            Create PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
