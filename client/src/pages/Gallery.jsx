import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";
import staffOfMonth from "../assets/staff_of_month.jpeg";
import { useEffect, useState } from "react";
import GalleryComponent from "../components/homePageComponents/GalleryComponent";
import news from "../components/homePageComponents/gallery.json";

export default function Gallery() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-20 max-w-6xl min-h-screen w-full mx-auto mt-10 p-4 bg-opacity-80 text-white"
      >
        <motion.div className="mt-6 w-full rounded-md font-extralight">
          <h1 className="text-xl md:text-3xl font-bold border-l-[6px] border-l-orange-600 pl-3 mb-6">
            View Our <br />
            <span className="md:text-5xl">Gallery</span>
          </h1>
          <GalleryComponent news={news} />
        </motion.div>
      </motion.div>

      {/* staff of the month modal */}
      {showModal && (
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
      )}
    </MainLayout>
  );
}
