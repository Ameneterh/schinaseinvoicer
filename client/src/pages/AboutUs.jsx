import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import schcomp from "../assets/sch_comp.jpeg";
import complab from "../assets/computer_lab.jpeg";
import sch_bus from "../assets/sch_bus.jpeg";
import security from "../assets/security.jpeg";
import sports from "../assets/sports.jpeg";
import teachers from "../assets/teachers.jpeg";
import teaching_aid from "../assets/teaching_aid.jpeg";
import water from "../assets/water_supply.jpg";

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

export default function AboutUs() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-20 max-w-6xl min-h-screen w-full mx-auto mt-10 p-4 bg-opacity-80 text-black"
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
            <h1 className="text-xl md:text-3xl font-bold border-l-[6px] border-l-orange-600 pl-3 mb-6">
              About Our <br />
              <span className="md:text-5xl">App</span>
            </h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight md:mb-6"
            >
              <hr className="border-t border-gray-100 my-4" />

              {/* vision & mission*/}
              {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700">
                  <h3 className="font-extrabold text-gray-800">Our Vision</h3>
                  <p className="mt-2 text-sm">
                    To contribute to the catholic education and develop children
                    solid foundation for future education and moral support.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-gray-100 bg-gray-50 text-gray-700">
                  <h3 className="font-extrabold">Our Mission</h3>
                  <p className="mt-2 text-sm">
                    To provide a catholic education with a learning community
                    committed to academic excellence; bringing a girl child to
                    her full potential in a safe and conducive environment under
                    the spiritual guidance of the sisters of the Immaculate
                    Heart of Mary, Mother of Christ called to serve God and
                    humanity in humility and compassion.
                  </p>
                </div>
              </div> */}
            </motion.p>

            {/* <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight mb-6"
            >
              <h2 id="mission" className="text-2xl font-semibold">
                Our Brief History
              </h2>
              <p className="mt-4">
                Mater Christi Catholic Nursery and Basic School located at
                Onala-Afao road Ado-Ekiti in the South-Western part of Nigeria
                was established on 20th September 2010 with fourteen (14)
                pioneer pupils and four (4) staff. Today, we are close to one
                thousand with enough staff. To God be the glory.
              </p>
              <p className="mt-3">
                It sits on a large expanse of land with 2 stored rectangular
                building comprising of 30 classrooms. Mater Christi offers a
                range of subjects to suit pupils and is designed so that pupils
                undertake studies from all areas of learning at the age of 2 to
                10 years.
              </p>
              <p className="mt-3">
                The school is highly disciplined. Every student abides by the
                rules and regulations of the school. They observe modes of
                prayers; Angelus, Holy Mass' Prayer, Catechism classes, Moral
                instructions e.t.c. The deeply religious structure of the school
                system is the backbone of the students' lives.
              </p>
              <p className="mt-3">
                Our pupils are not only given theoretical aspect of teaching,
                they are also involved in co-curricular activities with a
                standard playing field with modern-day equipments. We have had
                two inter-house sport competitions with the maiden edition and
                have also attended and participated in other schools inter-house
                sports competition.
              </p>
              <p className="mt-3">
                It is annual event in our school to observe cultural day. We
                believe in first hand information so our school has been going
                on educational visit (excursion) to different places of interest
                every academic session, also we have able hands handling music,
                french, computer (both theory and practical), phonics (diction)
                and chess games. Meals are provided for the pupils each day
                (balanced diet).
              </p>
            </motion.p> */}

            {/* <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight md:mb-6"
            >
              <hr className="border-t border-gray-100 my-4" />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-gray-100 bg-gray-50 text-gray-700">
                  <h3 className="font-extrabold">
                    School Uniforms & Dress Code
                  </h3>
                  <p className="mt-2 text-sm">
                    The uniform is white and blue. On Mondays and Tuesdays,
                    pupils wear the crested uniform; gown, shirt and knickers
                    for girls and boys respectively. On Wednesday, pupils wear
                    yellow and sky blue sport uniform, Thursday they wear white
                    and navy blue, Fridays they wear sky blue track suit with
                    white canvass. Brown leather shoes and blue ankle socks are
                    worn with the uniform on Mondays and Tuesdays.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 bg-slate-50/70 text-gray-700">
                  <h3 className="font-extrabold text-gray-800">
                    Shared/Core Values
                  </h3>
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    <li>Excellent performance</li>
                    <li>High Moral Standard</li>
                    <li>Team Spirit</li>
                    <li>Service to Humanity in Humlity and Compassion</li>
                  </ul>
                </div>
              </div>
            </motion.p> */}

            {/* <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight mb-6"
            >
              <hr className="border-t border-gray-100 my-4" />

              <h2 className="text-2xl font-semibold">
                Spiritual/Moral Education
              </h2>
              <p className="mt-4">
                We believe in all round development of our pupils, our children
                are spiritually balanced. They receive lessons on moral
                instruction which is compulsory every first two periods of every
                Thursday, some attend catechism classes and have received first
                holy communion. They pray Holy rosary every Friday and stations
                of the Cross every Friday of Lent Period. Holy masses are used
                to open and close each term. Angelus is observed everyday by 12
                noon. All these are helping our pupils to grow spiritually in
                loving God and neighbors.
              </p>
            </motion.p> */}

            {/* <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight md:mb-6"
            >
              <hr className="border-t border-gray-100 my-4" />

              <h2 className="text-2xl font-semibold my-4">Admissions</h2>
              <p className="mt-4">
                The school admits children from two years and above in creche,
                kg1 to Basic five. enroll your ward(s) for radiating academic
                culture, regular practical computer/music lessons, reliable
                transportation, experienced teaching staff, reasonable service
                charges, responsive management and lots more . Forms are
                available in the school, hurry and grab your own where your
                child will be comfortable, relax, happy and learn and become
                good citizen of Nigeria.
              </p>
              <p className="mt-3">
                To crown it all, mater christi is the best place for children to
                blossom. They are well cared for, well fed, well trained in all
                aspects of leaning, morally sound e.t.c. They are happy to be in
                mater christi, do not miss the opportunity.
              </p>
              <p className="mt-3">
                Mater Christi is my dream, your dream and our dream.
              </p>

              <div className="mt-4 mb-4">
                <p className="">
                  We would be honoured to walk this journey with you; whenever
                  you are ready.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                aria-label="Contact Infonet Grafix Global"
              >
                Let us mold your child together →
              </Link>
            </motion.p> */}
          </motion.div>
        </motion.section>
      </motion.div>
    </MainLayout>
  );
}
