import React, { useEffect, useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline, IoIosTimer } from "react-icons/io";
import { SiParamountplus } from "react-icons/si";
import { FiPieChart } from "react-icons/fi";
import { PiInvoiceBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import AdminDashboardComponent from "./AdminDashboardComponent";
import { UserDashboardComponents } from "./AdminDashboardComponent";
import Divider from "./Divider";
import { useInvoiceStore } from "../store/invoiceStore";
import { useBusinessStore } from "../store/businessStore";
import { useClientStore } from "../store/clientStore";
import { get } from "mongoose";

export default function DashboardComponent() {
  const { user } = useAuthStore();
  const { getAllInvoices } = useInvoiceStore();
  const { getAllBusinesses } = useBusinessStore();
  const { getAllClients } = useClientStore();
  const { getAllUsers } = useAuthStore();

  // to change later
  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [lastMonthInvoices, setLastMonthInvoices] = useState(0);

  const [businesses, setBusinesses] = useState([]);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const [lastMonthBusinesses, setLastMonthBusinesses] = useState(0);

  const [clients, setClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [lastMonthClients, setLastMonthClients] = useState(0);

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);

  // get invoices
  const getInvoices = async () => {
    try {
      const { invoices, totalInvoices, lastMonthInvoices } =
        await getAllInvoices();

      if (user.role === "architect") {
        setInvoices(invoices);
        setTotalInvoices(totalInvoices);
        setLastMonthInvoices(lastMonthInvoices);
      } else if (user.role === "businessAdmin") {
        const filteredInvoice = invoices.filter(
          (invoice) => user.business._id === invoice.company._id,
        );
        setInvoices(filteredInvoice);
        setTotalInvoices(filteredInvoice.length);
      } else {
        const filteredInvoice = invoices.filter(
          (invoice) => user._id === invoice.createdBy,
        );
        setInvoices(filteredInvoice);
        setTotalInvoices(filteredInvoice.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get businesses
  const getBusinesses = async () => {
    try {
      const { businesses, totalBusinesses, lastMonthBusinesses } =
        await getAllBusinesses();

      if (user.role === "architect") {
        setBusinesses(businesses);
        setTotalBusinesses(totalBusinesses);
        setLastMonthBusinesses(lastMonthBusinesses);
      } else {
        const filteredBusiness = businesses.filter(
          (business) => user.business._id === business._id,
        );
        setBusinesses(filteredBusiness);
        setTotalBusinesses(filteredBusiness.length);
        setLastMonthBusinesses(lastMonthBusinesses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get clients
  const getClients = async () => {
    try {
      const { clients, totalClients, lastMonthClients } = await getAllClients();

      if (user.role === "architect") {
        setClients(clients);
        setTotalClients(totalClients);
        setLastMonthClients(lastMonthClients);
      } else {
        const filteredClients = clients.filter(
          (client) => user.client._id === client._id,
        );
        setClients(filteredClients);
        setTotalClients(filteredClients.length);
        setLastMonthClients(lastMonthClients);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get users
  const getUsers = async () => {
    try {
      const { users, totalUsers, lastMonthUsers } = await getAllUsers();

      if (user.role === "architect") {
        setUsers(users);
        setTotalUsers(totalUsers);
        setLastMonthUsers(lastMonthUsers);
      } else {
        const filteredUsers = users.filter((user) => user._id === user._id);
        setUsers(filteredUsers);
        setTotalUsers(filteredUsers.length);
        setLastMonthUsers(lastMonthUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.role === "architect" ||
      user.role === "businessAdmin" ||
      user.role === "handler"
    ) {
      getInvoices();
      getBusinesses();
      getClients();
      getUsers();
    }
  }, [user._id]);

  let paymentHistory = [];
  for (let i = 0; i < invoices.length; i++) {
    let history = [];
    if (invoices[i].paymentRecords !== undefined) {
      history = [...paymentHistory, invoices[i].paymentRecords];
      paymentHistory = [].concat.apply([], history);
    }
  }

  //sort payment history by date
  const sortHistoryByDate = paymentHistory.sort(function (a, b) {
    var c = new Date(a.datePaid);
    var d = new Date(b.datePaid);
    return d - c;
  });

  // const dueDate = new Date(invoice.dueDate);
  // dueDate.setDate(dueDate.getDate() + validity);

  console.log(invoices);

  return (
    <div className="flex flex-col gap-4 w-full p-3 md:mt-6">
      {user.role === "architect" ? (
        <>
          <h1 className="text-2xl font-bold text-center text-blue-900 bg-clip-text">
            Architect Dashboard
          </h1>
          <div className="flex-wrap flex gap-4">
            {/* admin views ----------------- total users, invoices, businesses */}
            {/* show total number of registered users */}
            <AdminDashboardComponent
              totalUsers={totalUsers}
              type="Users"
              heading={"all users"}
              lastMonthUsers={lastMonthUsers}
            />

            {/* show total number of businesses */}
            <AdminDashboardComponent
              totalUsers={totalBusinesses}
              type="Businesses"
              heading={"all businesses"}
              lastMonthUsers={lastMonthBusinesses}
            />

            {/* total clients created */}
            <AdminDashboardComponent
              totalUsers={totalClients}
              type="Clients"
              heading={"all clients"}
              lastMonthUsers={lastMonthClients}
            />

            {/* total invoices created */}
            <AdminDashboardComponent
              totalUsers={totalInvoices}
              type="Invoices"
              heading={"all invoices"}
              lastMonthUsers={lastMonthInvoices}
            />
          </div>
        </>
      ) : user.role === "businessAdmin" ? (
        <h1 className="text-2xl font-bold text-center text-blue-900 bg-clip-text">
          Business Admin Dashboard
        </h1>
      ) : (
        user.role === "businessAdmin" && (
          <h1 className="text-2xl font-bold text-center text-blue-900 bg-clip-text">
            Handler Dashboard
          </h1>
        )
      )}

      <Divider />
      <div className="flex-wrap flex gap-4">
        {/* total for all invoices */}
        <UserDashboardComponents
          totalPaid={invoices
            .filter((invoice) => invoice.status !== "cancelled")
            .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0)
            .toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          text={"Total for Invoices"}
          icon={<SiParamountplus />}
          bgColor="white"
          indicator="bg-blue-600"
        />
        {/* total received for invoices raised */}
        <UserDashboardComponents
          totalPaid={invoices
            .filter(
              (invoice) =>
                (invoice.status === "paid" ||
                  invoice.status === "part-payment") &&
                invoice.status !== "cancelled",
            )
            .reduce(
              (sum, invoice) => sum + Number(invoice.totalAmountReceived || 0),
              0,
            )
            .toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          text={"Total Payments Received"}
          icon={<IoMdCheckmarkCircleOutline />}
          bgColor="white"
          indicator="bg-green-800"
        />
        {/* total pending for invoices raised */}
        <UserDashboardComponents
          totalPaid={(
            invoices
              .filter((invoice) => invoice.status !== "cancelled")
              .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0) -
            invoices
              .filter(
                (invoice) =>
                  invoice.status === "paid" ||
                  invoice.status === "part-payment",
              )
              .reduce(
                (sum, invoice) =>
                  sum + Number(invoice.totalAmountReceived || 0),
                0,
              )
          ).toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
          text={"Total Amount Pending"}
          icon={<FiPieChart />}
          bgColor="white"
          // indicator="green-950"
        />
        {/* total number of invoices raised */}
        <UserDashboardComponents
          totalPaid={invoices.length}
          text={"Number of Invoices Raised"}
          unit={"Invoices"}
          icon={<PiInvoiceBold />}
          bgColor="white"
          // indicator="green-950"
        />
        {/* number of paid invoices */}
        <UserDashboardComponents
          totalPaid={
            invoices.filter((invoice) => invoice.status === "paid").length
          }
          text={"Paid Invoices"}
          icon={<IoMdCheckmarkCircleOutline />}
          bgColor="white"
          indicator="bg-green-800"
        />
        {/* number of partially paid invoices */}
        <UserDashboardComponents
          totalPaid={
            invoices.filter((invoice) => invoice.status === "part-payment")
              .length
          }
          text={"Partially Paid Invoices"}
          icon={<FiPieChart />}
          bgColor="white"
          // indicator="green-950"
        />
        {/* number of unpaid invoices */}
        <UserDashboardComponents
          totalPaid={
            invoices.filter(
              (invoice) =>
                invoice.status === "pending" && invoice.status !== "cancelled",
            ).length
          }
          text={"Unpaid Invoices"}
          icon={<FaRegSadTear />}
          bgColor="white"
          indicator="bg-orange-400"
        />
        {/* number of invoices overdue */}
        <UserDashboardComponents
          totalPaid={
            invoices.filter((invoice) => {
              const expiryDate = new Date(invoice.invDate);

              expiryDate.setDate(
                expiryDate.getDate() + Number(invoice.validity),
              );

              return (
                invoice.invoiceType === "proforma" && expiryDate < new Date()
              );
            }).length
          }
          text={"Overdue Invoices"}
          icon={<IoIosTimer />}
          bgColor="white"
          indicator="bg-red-600"
        />
      </div>
      <div className="flex-wrap flex gap-4 justify-between"></div>

      {/* display recent payments */}
      <div className="w-full bg-slate-50 p-2 rounded">
        {invoices.length > 0 ? (
          <>
            <h1 className="text-lg font-bold">Recent Payments</h1>
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr className="border-b-[2px] border-b-black">
                  <th className="text-left px-2 py-1">Inv No</th>
                  <th className="text-left px-2 py-1">Paid By</th>
                  <th className="text-left px-42py-1">Payment Date</th>
                  <th className="text-right px-2 py-1">Amt Paid</th>
                  <th className="text-left px-2 py-1">Payment Method</th>
                  <th className="text-left px-2 py-1">Received By</th>
                  <th className="text-left px-2 py-1">Notes</th>
                </tr>
              </thead>

              <tbody>
                {invoices
                  ?.flatMap((invoice) =>
                    invoice.paymentRecords.map((record) => ({
                      ...record,
                      invoiceNumber: invoice.invoiceNumber,
                      clientName: invoice.client.client_name,
                    })),
                  )
                  .sort(
                    (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate),
                  )
                  .slice(0, 5)
                  .map((record) => (
                    <tr key={record._id}>
                      <td className="px-2 text-sm">{record.invoiceNumber}</td>
                      <td className="px-2 text-sm">{record.clientName}</td>
                      <td className="px-2 text-sm">
                        {new Date(record.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-2 text-sm text-right">
                        {record.amount.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </td>
                      <td className="px-2 text-sm capitalize">
                        {record.paymentMethod}
                      </td>
                      <td className="px-2 text-sm">
                        {record.receivedBy?.fullname || "-"}
                      </td>
                      <td className="px-2 text-sm">
                        {record.reference || "-"}
                      </td>
                    </tr>
                  ))}

                {sortHistoryByDate?.slice(-10).map((record) => (
                  <tr className="" key={record?._id}>
                    <td>
                      {/* <button>{record?.paidBy?.charAt(0)}</button> */}
                    </td>
                    {/* <td>{record?.paidBy}</td>
                <td>{moment(record?.datePaid).format("MMMM Do YYYY")}</td>
                <td>
                  <h3 style={{ color: "#00A86B", fontSize: "14px" }}>
                    {toCommas(record?.amountPaid)}
                  </h3>
                </td>
                <td>{record?.paymentMethod}</td>
                <td>{record?.note}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h1 className="text-sm font-bold">No payments received yet</h1>
        )}
      </div>
      {/* tables */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {/* <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 flex-1">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div> */}

        {/* second */}
        {/* <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 flex-1">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div> */}
      </div>
      {/* third - SHOWING RECENT POSTS*/}
      {/* <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 flex-1">
        <div className="flex justify-between p-3 text-sm font-semibold">
          <h1 className="text-center p-2">Recent Posts</h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/dashboard?tab=posts"}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts &&
            posts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt="user"
                      className="w-14. h-10 rounded-md bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-96">{post.title}</Table.Cell>
                  <Table.Cell className="w-5">{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div> */}
    </div>
  );
}
