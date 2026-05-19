import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import schcomp from "../assets/sch_comp.jpeg";
import news from "../components/homePageComponents/gallery.json";
import { MdOutlineSearch, MdArrowForward } from "react-icons/md";
import { useState } from "react";

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

export default function NewsDetailsComponent({ item }) {
  return (
    <motion.div
      key={item.id}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="py-2 text-white rounded-lg w-full max-w-xl h-fit flex items-center gap-2"
    >
      <div
        className="w-28 lg:w-36 h-28 rounded-md overflow-hidden bg-top bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>
      <div className="flex flex-col justify-between gap-3 px-2 h-full w-full">
        <p className="w-full text-slate-50 font-semibold line-clamp-1">
          {item.title}
        </p>
        <p className="text-xs font-light w-full line-clamp-2">{item.content}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-200 font-light">{item.date}</p>
          <Link to={`/news-events/${item.id}`}>
            <MdArrowForward />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
