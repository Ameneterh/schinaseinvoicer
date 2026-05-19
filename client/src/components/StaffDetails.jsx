import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import staffList from "../assets/staffdetails.json";

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

export default function StaffDetails() {
  const { id } = useParams();
  const selectedStaff = staffList.filter((selected) => selected.id == id);
  const staff = selectedStaff[0];

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="py-10 sm:py-20 max-w-6xl min-h-screen w-full mx-auto mt-10 p-4 bg-opacity-80 text-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full mx-auto bg-opacity-80"
        >
          <h1 className="lg:text-xl font-bold border-l-[6px] border-l-orange-600 pl-3 mb-6 text-orange-500">
            Profile of: <br />
            <span className="lg:text-2xl text-white">{staff.name}</span>
          </h1>

          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="w-full h-auto flex flex-col lg:flex-row gap-4 lg:gap-10 text-sm"
          >
            <div
              className="w-full lg:w-[300px] lg:h-[300px] bg-cover bg-center bg-no-repeat rounded-full shadow-lg"
              style={{ backgroundImage: `url(${staff.image})` }}
            ></div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="-full flex-1 flex flex-col"
            >
              <p className="font-extralight flex items-center gap-8">
                Staff ID No:{" "}
                <span className="font-bold text-sm">{staff.staff_id}</span>
              </p>
              <p className="font-extralight flex items-center gap-8">
                Designation:{" "}
                <span className="font-bold text-sm">{staff.designation}</span>
              </p>
              <p className="font-extralight flex items-center gap-8">
                Employment Date:{" "}
                <span className="font-bold text-sm">
                  {staff.employment_date}
                </span>
              </p>
              <p className="font-extralight flex items-center gap-8">
                Qualification:{" "}
                <span className="font-bold text-sm">
                  {staff.latest_qualification}
                </span>
              </p>
              <p className="font-extralight flex items-center gap-8">
                Specialty:{" "}
                <span className="font-bold text-sm">{staff.Speciality}</span>
              </p>

              {staff.assigned_class !== "Nil" ? (
                <p className="font-extralight flex items-center gap-8">
                  Assigned Class:{" "}
                  <span className="font-bold text-sm">
                    {staff.assigned_class}
                  </span>
                </p>
              ) : (
                <></>
              )}

              <div
                className="flex flex-col gap-2 font-light mt-3"
                dangerouslySetInnerHTML={{
                  __html: staff && staff.short_comment,
                }}
              ></div>

              <a
                href={staff.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1 rounded-md border border-blue-500 w-fit shadow-lg hover:bg-blue-400 transition-all duration-500 mt-4"
              >
                <button>View Staff Resume</button>
              </a>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
