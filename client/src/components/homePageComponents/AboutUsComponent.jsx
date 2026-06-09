import { motion } from "framer-motion";
import schinaseLogo from "../../assets/InvoiceCore_logoName.png";
import { Link } from "react-router-dom";
import { company_info } from "../../assets/company_info";
import {
  MdLocationOn,
  MdOutlineMarkEmailRead,
  MdOutlinePhoneInTalk,
  MdWhatsapp,
} from "react-icons/md";
import { GiClockwork } from "react-icons/gi";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AboutUsComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-20 lg:px-40 bg-white items-center"
    >
      <div className="py-4 flex flex-col gap-4 flex-1 items-center">
        <div
          className="relative h-20 w-64 bg-cover bg-center bg-no-repeat text-black mb-5 bg-blue-950 p-2 rounded-md"
          style={{
            backgroundImage: `url(${schinaseLogo})`,
          }}
        ></div>
        <h1 className="font-extrabold text-xl lg:text-3xl text-yellow-800">
          Schinase Tech Hubb, Ado-Ekiti,
        </h1>
        <p className="text-center text-sm font-extralight">
          At Schinase Tech Hubb, we believe technology should solve real
          problems, simplify processes, and create opportunities for growth.
          Founded through the collaboration of pharmacists and computer
          scientists, our company combines practical industry experience with
          modern digital innovation to deliver solutions that are both
          functional and impactful.
        </p>
        <Link
          to="/about"
          className="max-w-fit mt-5 py-2 px-4 bg-gradient-to-r from-green-800 to-emerald-900 rounded-lg hover:from-green-600 hover:to-emerald-700 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-300 cursor-pointer flex items-center justify-center hover:scale-110"
        >
          Read More ...
        </Link>
      </div>

      {/* 2nd side */}
      <div className="flex flex-col gap-2 w-full lg:w-1/2">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-extralight md:mb-6"
        >
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* address field */}
            <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700 flex flex-col gap-2">
              <h3 className="flex items-center gap-1 font-extrabold text-gray-800">
                <MdLocationOn size={40} className="text-red-600" />
                Business Address:
              </h3>
              <span className="">{company_info.address}</span>
            </div>

            {/* contact phones */}
            <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700 flex flex-col gap-2">
              <h3 className="flex items-center gap-1 font-extrabold text-gray-800">
                <MdOutlinePhoneInTalk size={40} className="text-red-600" />
                Business Contacts:
              </h3>
              <p className="flex flex-col items-start">
                <span className="flex items-center gap-1">
                  <MdOutlinePhoneInTalk size={16} />
                  <a
                    href={`tel:${company_info.call_number}`}
                    className="hover:scale-105 hover:underline underline-offset-2"
                  >
                    {company_info.call_number}
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <MdWhatsapp size={16} />
                  <a
                    href={`https://wa.me/${company_info.call_number}`}
                    target="_blank"
                    className="hover:scale-105 hover:underline underline-offset-2"
                  >
                    {company_info.whatsapp_number}
                  </a>
                </span>
              </p>
            </div>

            {/* email field */}
            <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700 flex flex-col gap-2">
              <h3 className="flex items-center gap-1 font-extrabold text-gray-800">
                <MdOutlineMarkEmailRead size={40} className="text-red-600" />
                Business Emails:
              </h3>
              <span className="flex items-center w-full gap-2">
                <MdOutlineMarkEmailRead size={18} />
                <Link
                  to={`mailto:${company_info.email}`}
                  className="hover:underline underline-offset-2 hover:scale-105"
                >
                  {company_info.email}
                </Link>
              </span>
            </div>

            {/* contact times */}
            <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700 flex flex-col gap-2">
              <h3 className="flex items-center gap-1 font-extrabold text-gray-800">
                <GiClockwork size={40} className="text-red-600" />
                Contact Times:
              </h3>
              <p className="flex flex-col">
                <span className="">{company_info.contact_days}</span>
                <span className="-mt-1">{company_info.contact_times}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
