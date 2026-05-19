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
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-20 lg:px-20 text-white border-t-2 border-white bg-blue-950"
    >
      <div className="flex flex-col gap-2 font-light w-full max-w-96 mx-auto items-center justify-center text-center">
        <div className="flex gap-2 items-center">
          <p className="text-lg lg:text-3xl font-bold">Try</p>
          <img src={logo} alt="company_logo" className="w-24 lg:w-40" />
          <p className="text-lg lg:text-3xl font-bold block">Today</p>
        </div>
        <p>
          Get started for <span className="font-bold">FREE</span>.
        </p>
        <p className="w-full max-w-72">
          If you're not satisfied after 30 days, you can walk away without any
          payment!
        </p>

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
      </div>
    </motion.div>
  );
}
