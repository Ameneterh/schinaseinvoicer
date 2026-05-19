import { Link } from "react-router-dom";
import logoImage from "../assets/InvoiceCore_logo.png";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdAddCall, MdAlternateEmail, MdLocationOn } from "react-icons/md";

export default function FooterComponent() {
  return (
    <footer className="py-10 px-4 bg-black flex flex-col items-center font-extralight text-white z-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
        <div className="w-full flex flex-col justify-between text-sm font-extralight gap-5 text-center">
          <div className="flex flex-col lg:flex-row gap-2 items-center">
            <img src={logoImage} className="w-10 h-10 md:w-12 md:h-12" />
            <p className="text-sm flex-1 text-center">
              A powerful business invoicing platform designed to help companies
              register, manage accounts, and generate professional invoices with
              ease
            </p>
          </div>
          <div>
            <Link
              to="/privacy-terms"
              className="hover:text-blue-600 hover:underline underline-offset-2"
            >
              Privacy Policy | Terms of Use
            </Link>
          </div>
        </div>

        {/* mid section */}
        <div className="w-full flex flex-col my-5 md:my-0">
          <h3 className="text-orange-700 font-bold">Useful Links</h3>
          <ul className="text-sm list-none -ml-5">
            <li className="">
              <Link
                to="/faqs"
                className="hover:underline hover:font-semibold underline-offset-2"
              >
                FAQs
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/awards"
                className="hover:underline hover:font-semibold underline-offset-2"
              >
                Awards & Prices
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/admissions"
                className="hover:underline hover:font-semibold underline-offset-2"
              >
                Video Tutorial
              </Link>
            </li>
            <li className="mt-2">
              <p className="flex items-center gap-2">
                <span className="text-orange-600">Follow us:</span>
                <Link
                  to="/twitter"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaTwitter size={20} className="hover:text-blue-700" />
                </Link>
                <Link
                  to="/facebook"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaFacebook size={20} className="hover:text-blue-700" />
                </Link>
                <Link
                  to="/linkedin"
                  className="hover:underline hover:font-semibold underline-offset-2"
                >
                  <FaLinkedin size={20} className="hover:text-blue-700" />
                </Link>
              </p>
            </li>
          </ul>
        </div>

        {/* right side */}
        <div className="w-full flex flex-col items-start">
          <h3 className="text-orange-700 font-bold">Contact Us:</h3>
          <ul className="text-sm list-none -ml-5">
            <li className="flex gap-2 items-center">
              <MdAddCall size={16} className="" />
              <div className="flex items-start gap-1 w-full">
                <span>08154230654.</span> <span>08100000000.</span>
              </div>
            </li>
            <li className="mt-2 flex gap-2 items-center">
              <MdAlternateEmail size={16} />
              <Link
                to="mailto:materchristibasicschool@gmail.com
"
              >
                schinase.industries@gmail.com
              </Link>
            </li>
            <li className="mt-2 flex gap-2 items-start">
              <MdLocationOn size={16} />
              Onala, Afao Road, Ado-Ekiti, Ekiti State, Nigeria.
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm border-t border-t-slate-800 w-full pt-5">
        All Rights Reserved{" "}
        <span className="block md:inline">
          &copy; {new Date().getFullYear()} Schinase Tech Hubb.
        </span>
      </div>
    </footer>
  );
}
