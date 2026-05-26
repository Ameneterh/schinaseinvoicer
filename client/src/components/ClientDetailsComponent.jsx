import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useClientStore } from "../store/clientStore";
import { use } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ClientDetailsComponent({
  client,
  showModal,
  setShowModal,
}) {
  const { user } = useAuthStore();
  const { getAllClients } = useClientStore();

  const [clients, setClients] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getClients = async () => {
    try {
      const { clients } = await getAllClients();

      if (user.role === "architect") {
        setClients(invoices);
      } else {
        const filteredClient = clients.filter(
          (client) => user.business._id === invoice.company._id,
        );
        setClients(filteredClient);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mt-6 max-h-fit">
        <IoMdCloseCircle
          className="text-red-600 absolute top-1 right-1 size-7 cursor-pointer"
          title="Close"
          onClick={() => setShowModal(false)}
        />
        <h2 className="text-lg mb-2 font-bold text-center">
          Client Details Page
        </h2>

        <div className="flex flex-col p-2 text-sm">
          <table>
            <tr>
              <td className="text-right px-2 py-1">Client Name:</td>
              <td>{client.client_name}</td>
            </tr>
            <tr>
              <td className="text-right px-2 py-1">Client Phone:</td>
              <td>
                <Link
                  to={`tel:${client.client_phone}`}
                  className="text-blue-600 hover:underline hover:font-bold underline-offset-2"
                >
                  {client.client_phone}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-right px-2 py-1">Client Email:</td>
              <td>
                <Link
                  to={`mailto:${client.client_email}`}
                  className="text-blue-600 hover:underline hover:font-bold underline-offset-2"
                >
                  {client.client_email}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-right px-2 py-1">Client Address:</td>
              <td>{client.client_address}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
