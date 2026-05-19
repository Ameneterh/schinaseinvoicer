import { motion } from "framer-motion";
import userPix from "../../assets/staff_of_month.jpeg";
import { FaQuoteLeft } from "react-icons/fa";

const clientFieldBack = [
  {
    id: 1,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatibus quos voluptatum, non earum eaque reprehenderit, quasi fugit ab tempore aspernatur culpa deleniti ipsa suscipit unde ipsam! Quis, perferendis molestias!",
    avatar: userPix,
    fullname: "Rev Fr SAMINAKA, Terhemba",
    designation: "Vice Principal, Administration",
    affiliation: "Infant Jesus Academy, Kaduna",
  },
  {
    id: 2,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatibus quos voluptatum, non earum eaque reprehenderit, quasi fugit ab tempore aspernatur culpa deleniti ipsa suscipit unde ipsam! Quis, perferendis molestias!",
    avatar: userPix,
    fullname: "Engr BAMIDELE, Innocent O.",
    designation: "Proprietor/School Administrator",
    affiliation: "Nivanna School of Enginnering, Jos",
  },
  {
    id: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatibus quos voluptatum, non earum eaque reprehenderit, quasi fugit ab tempore aspernatur culpa deleniti ipsa suscipit unde ipsam! Quis, perferendis molestias!",
    avatar: userPix,
    fullname: "Dr JOHNSON, Pearson N.",
    designation: "Principal Managing Partner",
    affiliation: "Johnson Group of Schools, Makurdi",
  },
];

export default function CustomerFeedbackComponent() {
  console.log(clientFieldBack);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-2 lg:gap-16 min-w-full p-4 lg:py-20 lg:px-20 bg-white"
    >
      <div className="flex flex-col gap-2 font-light text-center w-full">
        <h1 className="text-xl lg:text-3xl font-extrabold text-yellow-600">
          What Our Clients Say
        </h1>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
          {clientFieldBack?.map((client, id) => (
            <div
              className="w-full p-3 rounded-md bg-slate-50 border border-gray-400 shadow-md"
              key={id}
            >
              <FaQuoteLeft className="" size={50} />
              <p className="text-left text-sm py-3">{client.comment}</p>
              <hr />
              <div className="flex gap-2 py-3">
                <img
                  src={client.avatar}
                  alt="user-picture"
                  className="h-12 w-12 rounded-full"
                />
                <div className="text-left">
                  <p className="font-bold text-sm mb-1">{client.fullname}</p>
                  <p className="text-xs font-bold">{client.designation}</p>
                  <p className="text-xs">{client.affiliation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
