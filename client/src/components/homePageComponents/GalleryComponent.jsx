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

export default function GalleryComponent({ title, news }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-w-full min-h-screen p-4"
    >
      <h1 className="text-xl lg:text-3xl text-slate-900 font-extrabold">
        {title}
      </h1>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {news.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-slate-950 text-white rounded-lg w-full max-w-xl h-64 bg-top bg-cover bg-no-repeat flex items-end justify-center overflow-hidden"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="flex flex-col items-center px-2 lg:px-4 py-2 w-full h-20 bg-slate-950">
              <p className="flex flex-col w-full">
                <span className="text-md font-bold line-clamp-1">
                  {item.title}
                </span>
                <span className="text-xs font-light">{item.date}</span>
              </p>
              <p className="text-center text-xs font-light w-full line-clamp-2 mt-2">
                {item.content}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <Link
        to="/gallery"
        className="mx-auto max-w-fit mt-5 lg:mt-12 py-2 px-4 bg-gradient-to-r from-green-800 to-emerald-900 rounded-lg hover:from-green-600 hover:to-emerald-700 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-300 cursor-pointer flex items-center justify-center hover:scale-110"
      >
        See More ...
      </Link>
    </motion.div>
  );
}
