import { useState } from "react";
import { motion } from "framer-motion";
import userPix from "../../assets/staff_of_month.jpeg";
import { FaQuoteLeft } from "react-icons/fa";
import { TbStarFilled } from "react-icons/tb";
import StarRating from "./StarRatingComponent";
import { IoMdCloseCircle } from "react-icons/io";

export default function CustomerFeedbackComponent({ ratings }) {
  const [showMessage, setShowMessage] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleReadMessage = (rating) => {
    setSelectedRating(rating);
    setShowMessage(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-20 lg:px-20 bg-white"
    >
      <div className="flex flex-col gap-2 font-light text-center w-full">
        <h1 className="text-xl lg:text-3xl font-extrabold text-yellow-800">
          What Our Clients Say
        </h1>

        <p>
          Real people, real feedback; try it for yourself and see they are right
        </p>
        <div className="flex flex-col md:flex-row items-center w-full justify-center mt-3 gap-x-3">
          <p>Average Star Rating: </p>
          <StarRating
            rating={
              ratings && ratings.length > 0
                ? (
                    ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                    ratings.length
                  ).toFixed(1)
                : 0
            }
          />
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6">
          {ratings?.map((rating, id) => (
            <div
              className="w-full p-3 rounded-md bg-slate-50 border border-gray-400 shadow-md"
              key={id}
            >
              <div className="flex gap-2">
                <img
                  src={rating.rater.avatar}
                  alt="user-picture"
                  className="h-12 w-12 rounded-full"
                />
                <div className="text-left">
                  <p className="font-bold text-sm mb-1">
                    {rating.rater.fullname}
                  </p>
                  <p className="text-xs -mt-[6px]">
                    of {rating.rater.business.business_name}
                  </p>
                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold">{rating.rating}/5</p>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          // onClick={() => setRating(star)}
                          className={`text-3xl ${
                            star <= rating.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <TbStarFilled className="" size={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="h-[1px] bg-gray-400 w-full my-2"></p>
              <p
                className="text-left text-xs line-clamp-6 cursor-pointer"
                onClick={() => handleReadMessage(rating)}
              >
                {rating.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* show modal to view full message */}
      {showMessage && (
        <ReadMessageDetails
          rating={selectedRating}
          setShowMessage={setShowMessage}
        />
      )}
    </motion.div>
  );
}

const ReadMessageDetails = ({ rating, setShowMessage }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white p-4 rounded-lg w-full max-w-96 mx-auto">
        <IoMdCloseCircle
          className="text-red-600 absolute top-1 right-1 size-7 cursor-pointer"
          title="Close"
          onClick={() => setShowMessage(false)}
        />
        <div className="flex gap-2 items-center">
          <img
            src={rating.rater.avatar}
            alt="user-picture"
            className="h-6 w-6 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="text-[14px] font-bold">{rating?.rater?.fullname}</h2>
            <p className="flex gap-1 items-center -mt-1 text-xs">
              <span className="capitalize">{rating?.rater?.role}</span>
              <span className="">
                at{" "}
                <span className="font-bold">
                  {rating?.rater?.business.business_name}
                </span>
              </span>
            </p>
          </div>
        </div>

        <p className="text-xs mt-2">{rating?.comment}</p>
      </div>
    </div>
  );
};
