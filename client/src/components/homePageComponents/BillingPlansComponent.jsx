import { motion } from "framer-motion";
import logo from "../../assets/InvoiceCore_logoName.png";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CallToActionComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-10 lg:px-20 text-white border-t-2 border-white bg-blue-950"
    >
      <div className="flex flex-col gap-2 font-light w-full items-center justify-center text-center">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="company_logo" className="w-24 lg:w-40" />
        </div>
        <p className="text-lg lg:text-3xl font-bold block">Choose Your Plan</p>

        <div className="flex flex-col items-center w-full mt-8 text-black">
          <div className="grid gric-cols-1 md:grid-cols-3 gap-x-10 gap-y-4 w-full items-center">
            {/* free tier */}
            <div className="p-4 w-full h-fit bg-white rounded-lg">
              <h3 className="font-bold w-full p-2 rounded bg-[#CD7f32]">
                TRIAL PLAN
                <br />
                ₦0.00/MONTH
              </h3>
              <p>Experience the app without commitment</p>
              {/* positioning */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Ideal For</p>
                <ul className="-mt-3">
                  <li className="list-disc">
                    Small businesses testing digital invoicing
                  </li>
                  <li className="list-disc">
                    Pharmacies, shops, freelancers, and startups
                  </li>
                  <li className="list-disc">
                    Businesses currently using paper/manual records
                  </li>
                </ul>
              </div>

              {/* services included */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Included Services</p>
                <ul className="-mt-3">
                  <li className="list-disc">
                    Invoice, Quote/Proforma Invoice generation
                  </li>
                  <li className="list-disc">PDF invoice download</li>
                  <li className="list-disc">Basic customer management</li>
                  <li className="list-disc">Payment tracking</li>
                  <li className="list-disc">Dashboard overview</li>
                  <li className="list-disc">
                    Up to a limited 10 invoices per month
                  </li>
                </ul>
              </div>
              {/* Restrictions */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Restrictions</p>
                <ul className="-mt-3">
                  <li className="list-disc">Schinase branding on invoices</li>
                  <li className="list-disc">No advanced reports</li>
                  <li className="list-disc">No staff accounts</li>
                  <li className="list-disc">No custom branding/logo upload</li>
                </ul>
              </div>

              <div className="mt-4 w-full flex justify-center">
                <Link
                  to="/add-new-business"
                  className="mt-5 max-w-48 py-2 px-4 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 border border-green-700 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 cursor-pointer text-white flex items-center justify-center hover:scale-110 transition-all duration-500"
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" />
                  ) : (
                    "Try InvoiceCore Now!"
                  )}
                </Link>
                {/* <Link
                  to="add-new-business"
                  className="bg-blue-600 hover:bg-blue-400 text-white hover:scale-125 transition-all duration-300 p-2 rounded"
                >
                  Start free for 30 days — no card required
                </Link> */}
              </div>
            </div>

            {/* premium tier */}
            <div className="p-4 w-full h-fit bg-white rounded-lg">
              <h3 className="font-bold w-full p-2 rounded bg-[#DAA520]">
                PREMIUM PLAN <br />
                ₦20,000 – ₦75,000/MONTH
              </h3>
              <p>Full business management solution for growing businesses</p>
              {/* positioning */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Ideal For</p>
                <ul className="-mt-3">
                  <li className="list-disc">Medium to Large Businesses</li>
                  <li className="list-disc">Multi-branch businesses</li>
                  <li className="list-disc">
                    Businesses with accountants/cashiers/staff
                  </li>
                  <li className="list-disc">
                    Businesses needing analytics and automation
                  </li>
                </ul>
              </div>

              {/* services included */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Included Services</p>
                <ul className="-mt-3">
                  <li className="list-disc">All services in Starter Pack +</li>
                  <li className="list-disc">Multi-user role management</li>
                  <li className="list-disc">Advanced analytics & reports</li>
                  <li className="list-disc">Multi-branch support</li>
                  <li className="list-disc">Audit logs/activity tracking</li>
                  <li className="list-disc">Custom branding</li>
                  <li className="list-disc">Priority support</li>
                  <li className="list-disc">Accountant/owner dashboard</li>
                </ul>
              </div>
              {/* Restrictions */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Premium Benefits:</p>
                <ul className="-mt-3">
                  <li className="list-disc">Faster support response</li>
                  <li className="list-disc">Dedicated onboarding assistance</li>
                  <li className="list-disc">Data migration support</li>
                  <li className="list-disc">Priority feature requests</li>
                </ul>
              </div>

              <div className="mt-4 w-full flex justify-center">
                <p className="bg-red-300 p-2 rounded w-full text-center font-bold font-serif text-white">
                  To be available soon!
                </p>
                {/* <Link
                  to="/add-new-business"
                  className="mt-5 max-w-48 py-2 px-4 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 border border-green-700 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 cursor-pointer text-white flex items-center justify-center hover:scale-110 transition-all duration-500"
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" />
                  ) : (
                    "Try InvoiceCore Now!"
                  )}
                </Link> */}
              </div>
            </div>

            {/* starter tier */}
            <div className="p-4 w-full h-fit bg-white rounded-lg">
              <h3 className="font-bold w-full p-2 rounded bg-[#C4C4C4]">
                STARTER PACK <br />
                ₦5,000 – ₦15,000/MONTH
              </h3>
              <p>Affordable entry-level for small businesses</p>
              {/* positioning */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Ideal For</p>
                <ul className="-mt-3">
                  <li className="list-disc">Small businesses</li>
                  <li className="list-disc">Warehouses and Wholesalers</li>
                  <li className="list-disc">Single-location businesses</li>
                  <li className="list-disc">
                    Business owners managing operations themselves
                  </li>
                </ul>
              </div>

              {/* services included */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Included Services</p>
                <ul className="-mt-3">
                  <li className="list-disc">
                    All services of Free Trial Tier +
                  </li>
                  <li className="list-disc">Unlimited invoices generation</li>
                  <li className="list-disc">Business logo on invoices</li>
                  <li className="list-disc">1–2 handler accounts</li>
                  <li className="list-disc">Email support</li>
                </ul>
              </div>
              {/* Restrictions */}
              <div className="text-left text-sm">
                <p className="font-bold mt-2">Optional Add-ons</p>
                <ul className="-mt-3">
                  <li className="list-disc">Additional Handlers</li>
                  <li className="list-disc">SMS reminders</li>
                  <li className="list-disc">Custom invoice templates</li>
                  <li className="list-disc">custom branding/logo upload</li>
                </ul>
              </div>

              <div className="mt-4 w-full flex justify-center">
                <Link
                  to="/add-new-business"
                  className="mt-5 max-w-48 py-2 px-4 bg-gradient-to-r from-green-700 to-emerald-700 font-normal rounded-lg hover:from-green-800 hover:to-emerald-800 border border-green-700 focus:outline-none focus:ring-1 focus:ring-green-800 focus:ring-offset-1 focus:ring-offset-gray-900 cursor-pointer text-white flex items-center justify-center hover:scale-110 transition-all duration-500"
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" />
                  ) : (
                    "Try InvoiceCore Now!"
                  )}
                </Link>
                {/* <Link
                  to="add-new-business"
                  className="bg-blue-600 hover:bg-blue-400 text-white hover:scale-125 transition-all duration-300 p-2 rounded"
                >
                  Start free for 30 days — no card required
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
