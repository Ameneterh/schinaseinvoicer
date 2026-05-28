import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";
// import news from "../components/homePageComponents/gallery.json";
import { useParams } from "react-router-dom";
import {
  MdOutlineAccessTime,
  MdOutlineDateRange,
  MdLocationOn,
} from "react-icons/md";

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

export default function NewsAndEventDetail() {
  const { id } = useParams();
  const selectedNews = news.filter((selected) => selected.id == id);
  const item = selectedNews[0];

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-20 min-h-screen w-full mx-auto bg-opacity-80"
      >
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="py-10 lg:py-20 px-2 lg:px-20 w-full mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 bg-white"
        >
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 max-w-7xl">
            <div className="flex flex-col gap-2 items-center text-center justify-center border border-blue-700 rounded-lg py-2 px-8 bg-slate-200">
              <MdOutlineDateRange size={30} className="text-blue-700" />
              <h1 className="w-full text-center font-bold text-lg">
                Event Date
              </h1>
              <p>{item.date}</p>
            </div>
            <div className="flex flex-col gap-2 items-center text-center justify-center border border-blue-700 rounded-lg py-2 px-8 bg-slate-200">
              <MdOutlineAccessTime size={30} className="text-green-700" />
              <h1 className="w-full text-center font-bold text-lg">
                Event Time
              </h1>
              <p>{item.time}</p>
            </div>
            <div className="flex flex-col gap-2 items-center text-center justify-center border border-blue-700 rounded-lg py-2 px-8 bg-slate-200">
              <MdLocationOn size={30} className="text-red-600" />
              <h1 className="w-full text-center font-bold text-lg">
                Event Venue
              </h1>
              <p>{item.venue}</p>
            </div>
          </div>
        </motion.section>

        {/* second */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full px-2 lg:px-20"
        >
          <div className="flex flex-col lg:flex-row gap-5 py-6 mt-2 lg:mt-20 text-white">
            <div
              className="w-full lg:w-1/3 p-4 bg-white h-28 lg:h-60 rounded-xl bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="flex-1">
              <h1 className="text-lg lg:text-2xl font-bold">{item.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: item.content }}
                className="flex flex-col gap-3 text-sm mt-3"
              ></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
