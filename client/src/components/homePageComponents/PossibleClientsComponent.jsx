import { motion } from "framer-motion";
import schinaseCoverage from "../../assets/Schinase_coverage.png";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PossibleClientsComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-10 lg:px-20 text-white border-t-2 border-white bg-blue-950"
    >
      <div className="flex flex-col lg:flex-row gap-x-20 font-light w-full items-center justify-center">
        <div className="flex flex-1 gap-2 items-center">
          <img src={schinaseCoverage} alt="company_logo" className="w-fit" />
        </div>

        <div className="flex flex-col w-1/2 mt-8 gap-4">
          <h1 className="text-lg lg:text-3xl text-white font-bold">
            All Work Together
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            eveniet soluta id sequi expedita necessitatibus rem, illo ut
            consectetur. Necessitatibus totam enim debitis aperiam tempore
            sequi, eveniet dicta repellat culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Rerum quos, nam libero nulla
            assumenda ad officiis. Ab, eveniet temporibus placeat, esse
            consectetur officiis eaque nesciunt libero exercitationem debitis
            quis sint?
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
      </div>
    </motion.div>
  );
}
