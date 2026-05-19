import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";

export default function AwardsAndPrices() {
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
            Awards & <br />
            <span className="md:text-5xl">Prices</span>
          </h1>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
