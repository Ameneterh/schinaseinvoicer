import { motion } from "framer-motion";
import schinaseLogo from "../../assets/InvoiceCore_logoName.png";
import aboutcontent from "./aboutcontent.json";
import { Link } from "react-router-dom";

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
            {aboutcontent.map((content) => (
              <div
                key={content.id}
                className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700 flex flex-col gap-2"
              >
                <img
                  src={content.logo}
                  alt={content.title}
                  className="w-10 h-10 rounded-full"
                />
                <h3 className="font-extrabold text-gray-800">
                  {content.title}
                </h3>
                <p className="text-sm">{content.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
