import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import schcomp from "../assets/sch_comp.jpeg";
import news from "../components/homePageComponents/gallery.json";
import { MdOutlineSearch, MdArrowForward } from "react-icons/md";
import { useState } from "react";
import NewsDetailsComponent from "../components/NewsDetailsComponent";

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

export default function NewsAndEvents() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-20 max-w-6xl min-h-screen w-full mx-auto mt-10 p-4 bg-opacity-80 text-white"
      >
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-10"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <h1 className="text-xl md:text-3xl font-bold border-l-[6px] border-l-orange-600 pl-3 mb-12">
              News, Events & <br />
              <span className="md:text-5xl">Calendar</span>
            </h1>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {news.map((item) => (
                <NewsDetailsComponent item={item} />
              ))}
            </motion.div>
          </motion.div>

          {/* right side panel */}
          <motion.div className="w-full max-w-sm">
            <h1 className="text-xl md:text-2xl font-bold text-orange-400">
              School Calendar
            </h1>
            <p className="text-sm font-bold mb-4">
              2nd Term: 2025/2026 Session
            </p>

            <div className="flex flex-col w-full gap-5">
              <table className="w-full font-extralight">
                <thead className="w-full bg-slate-700 px-1">
                  <th className="w-1/3 p-1 text-left text-sm">Date</th>
                  <th className="w-2/3 p-1 text-left text-sm">Activity</th>
                </thead>
                <tr className="">
                  <td className="text-sm p-1">18th - 22nd Jan</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">25th - 26th Jan</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">27th January</td>
                  <td className="text-sm p-1">Opening Mass</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">28th - 29th Jan</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">1st - 5th Feb</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">8th - 11th Feb</td>
                  <td className="text-sm p-1">1st Periodic Test</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">12th February</td>
                  <td className="text-sm p-1">Open Day</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">15th - 16th Feb</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">7th - 18th & 19th Feb</td>
                  <td className="text-sm p-1">
                    PTD Meeting/Ash Wednesday Mid-Term Break
                  </td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">22nd - 26th Feb</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">1st - 5th Mar</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">8th - 12th Mar</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">15th - 19th Mar</td>
                  <td className="text-sm p-1">Normal School Activities</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">22nd - 26th Mar</td>
                  <td className="text-sm p-1">Examinations</td>
                </tr>
                <tr className="">
                  <td className="text-sm p-1">26th March</td>
                  <td className="text-sm p-1">Examinations/Vacation</td>
                </tr>
              </table>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full flex items-center justify-center py-10">
          <Link className="border border-transparent hover:border hover:border-white px-2 rounded-md text-white">
            Prev
          </Link>
          <Link className="border border-white hover:border hover:border-white px-2 rounded-md text-white">
            1
          </Link>
          <Link className="border border-transparent hover:border hover:border-white px-2 rounded-md text-white">
            next
          </Link>
        </div>
      </motion.div>
    </MainLayout>
  );
}
