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

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  // to change later
  const [invoices, setInvoices] = useState("");

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [user]);

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

  return (
    <div className="flex flex-col gap-4 w-full p-3">
      <div className="flex-wrap flex gap-4 justify-between">
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
          totalUsers={totalComments}
          type="Businesses"
          heading={"all businesses"}
          lastMonthUsers={lastMonthComments}
        />

        {/* total invoices created */}
        <AdminDashboardComponent
          totalUsers={totalPosts}
          type="Clients"
          heading={"all clients"}
          lastMonthUsers={lastMonthPosts}
        />

        {/* total invoices created */}
        <AdminDashboardComponent
          totalUsers={totalPosts}
          type="Invoices"
          heading={"all invoices"}
          lastMonthUsers={lastMonthPosts}
        />
      </div>

      <Divider />
      <div className="flex-wrap flex gap-4 justify-between">
        {/* total for all invoices */}
        <UserDashboardComponents
          totalPaid={100000}
          text={"Total for Invoices"}
          icon={<SiParamountplus />}
          bgColor="white"
          indicator="bg-blue-600"
        />

        {/* total received for invoices raised */}
        <UserDashboardComponents
          totalPaid={10000}
          text={"Total Payments Received"}
          icon={<IoMdCheckmarkCircleOutline />}
          bgColor="white"
          indicator="bg-green-800"
        />

        {/* total pending for invoices raised */}
        <UserDashboardComponents
          totalPaid={90000}
          text={"Total Amount Pending"}
          icon={<FiPieChart />}
          bgColor="white"
          // indicator="green-950"
        />

        {/* total number of invoices raised */}
        <UserDashboardComponents
          totalPaid={2}
          text={"Number of Invoices Raised"}
          icon={<PiInvoiceBold />}
          bgColor="white"
          // indicator="green-950"
        />

        {/* number of paid invoices */}
        <UserDashboardComponents
          totalPaid={1}
          text={"Paid Invoices"}
          icon={<IoMdCheckmarkCircleOutline />}
          bgColor="white"
          indicator="bg-green-800"
        />

        {/* number of partially paid invoices */}
        <UserDashboardComponents
          totalPaid={0}
          text={"Partially Paid Invoices"}
          icon={<FiPieChart />}
          bgColor="white"
          // indicator="green-950"
        />

        {/* number of unpaid invoices */}
        <UserDashboardComponents
          totalPaid={1}
          text={"Unpaid Invoices"}
          icon={<FaRegSadTear />}
          bgColor="white"
          indicator="bg-orange-400"
        />

        {/* number of invoices overdue */}
        <UserDashboardComponents
          totalPaid={1}
          text={"Overdue Invoices"}
          icon={<IoIosTimer />}
          bgColor="white"
          indicator="bg-red-600"
        />
      </div>
      <div className="flex-wrap flex gap-4 justify-between"></div>

      {/* display recent payments */}
      <div className="w-full bg-slate-50 p-2 rounded">
        <h1 className="text-center py-4 font-bold">
          {paymentHistory.length
            ? "Recent Payments"
            : "No payments received yet"}
        </h1>
        <table className="w-full">
          <tbody>
            {/* {paymentHistory?.length !== 0 && ( */}
            <tr>
              <th style={{ padding: "15px" }}></th>
              <th style={{ padding: "15px" }}>Paid By</th>
              <th style={{ padding: "15px" }}>Date Paid</th>
              <th style={{ padding: "15px" }}>Amount Paid</th>
              <th style={{ padding: "15px" }}>Payment Method</th>
              <th style={{ padding: "15px" }}>Note</th>
            </tr>
            {/* )} */}

            {sortHistoryByDate?.slice(-10).map((record) => (
              <tr className="" key={record?._id}>
                <td>{/* <button>{record?.paidBy?.charAt(0)}</button> */}</td>
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
