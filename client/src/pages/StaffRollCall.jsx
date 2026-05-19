import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";
import staffOfMonth from "../assets/staff_of_month.jpeg";
import { useEffect, useState } from "react";
import GalleryComponent from "../components/homePageComponents/GalleryComponent";
import staffList from "../assets/staffdetails.json";
import StaffDetailsComponent from "../components/StaffDetailsComponent";

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

export default function StaffRollCall() {
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
          <h1 className="text-xl md:text-3xl font-bold border-l-[6px] border-l-orange-600 pl-3 mb-6">
            Our Staff <br />
            <span className="md:text-5xl">Members</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 mt-10 lg:mt-20">
            {staffList.map((staff) => (
              <StaffDetailsComponent key={staff.id} stafflist={staff} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* staff of the month modal */}
      {/* {showModal && (
        <div className="absolute top-0 left-0 min-h-screen h-fit w-full flex items-center justify-top bg-black/80 z-50 px-2 lg:px-32">
          <div className="relative w-full lg:w[300px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-3 mb-4 p-4 bg-white rounded-md">
            <div
              className="absolute right-1 top-1 border border-red-300 rounded-full text-red-600 font-semibold w-6 h-6 flex items-center justify-center cursor-pointer hover:text-red-900"
              onClick={() => setShowModal(false)}
            >
              X
            </div>
            <img
              src={staffOfMonth}
              alt="ceo image"
              className="rounded-full mb-2 bg-black/10 shadow-xl h-32 w-32 lg:h-56 lg:w-56"
            />
            <div className="flex flex-col flex-1">
              <h1 className="text-xl md:text-2xl text-orange-600 font-bold mb-2">
                Meet Our Staff of the Month
              </h1>
              <div className="flex flex-col gap-2 mb-3">
                <p>
                  Name:{" "}
                  <span className="font-bold block lg:inline-block">
                    JOHNSON, Oluwadamilola F.
                  </span>
                </p>
                <p>
                  Designation:{" "}
                  <span className="font-bold block lg:inline-block">
                    Class Teacher; Basic 2
                  </span>
                </p>
              </div>
              <p className="text-sm mb-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusantium obcaecati autem optio eveniet enim laboriosam nam
                minus nihil a praesentium blanditiis perferendis, inventore quos
                tenetur? Fugit temporibus maiores exercitationem quam? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Aut error
                soluta voluptate qui eos deleniti nisi nobis sit omnis magni.
                Autem tempora sequi vitae laudantium accusantium architecto qui
                assumenda. Maiores?
              </p>
            </div>
          </div>
        </div>
      )} */}
    </MainLayout>
  );
}
