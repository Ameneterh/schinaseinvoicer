import { motion } from "framer-motion";
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

export default function StaffDetailsComponent({ stafflist }) {
  console.log(stafflist);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col justify-center items-center gap-2 bg-white/10 p-2 py-4 rounded-md shadow-md border border-white/30"
    >
      <div className="flex flex-col gap-2 text-center">
        <div
          className="h-20 w-20 lg:h-28 lg:w-28 mx-auto rounded-full bg-cover bg-no-repeat bg-top bg-yellow-700"
          style={{
            backgroundImage: `url(${stafflist.image})`,
          }}
        ></div>
        <p className="flex flex-col">
          <span className="font-extralight text-xs -mb-1">Staff Name</span>
          <span className="font-bold text-lg">{stafflist.name}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-extralight text-xs -mb-1">Staff ID No:</span>
          <span className="font-bold">{stafflist.staff_id}</span>
        </p>

        <Link
          to={`/staff-roll/${stafflist.id}`}
          className="w-fit mx-auto  mt-2 px-5 py-1 bg-slate-800 text-white text-sm hover:bg-slate-500 rounded-md transition-all duration-300"
        >
          See Staff Profile
        </Link>
      </div>
    </motion.section>
  );
}
