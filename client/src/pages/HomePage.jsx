import React from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../../../server/utils/date";
import MainLayout from "../layout/MainLayout";
import ButtonSpecial from "../components/ButtonSpecial";
import HeroComponent from "../components/homePageComponents/HeroComponent";
import AboutUsComponent from "../components/homePageComponents/AboutUsComponent";
import NewsAndEventsComponent from "../components/homePageComponents/NewsAndEventsComponent";
import GalleryComponent from "../components/homePageComponents/GalleryComponent";
import news from "../components/homePageComponents/gallery.json";
import CallToActionComponent from "../components/homePageComponents/CallToActionComponent";
import CustomerFeedbackComponent from "../components/homePageComponents/CustomerFeedbackComponent";
import BillingPlansComponent from "../components/homePageComponents/BillingPlansComponent";
import PossibleClientsComponent from "../components/homePageComponents/PossibleClientsComponent";
import OurClientListComponent from "../components/homePageComponents/OurClientListComponent";
import registeredBusiness from "../assets/registeredBusiness.json";

export default function HomePage() {
  const { user, logout, isLoading } = useAuthStore();

  const slicedNews = news.slice(0, 8);

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      <HeroComponent />
      <PossibleClientsComponent />
      <AboutUsComponent />
      <BillingPlansComponent />
      {/* <div className="px-20 mt-10 bg-white">
        <GalleryComponent title="View Gallery" news={slicedNews} />
      </div> */}
      <CustomerFeedbackComponent />
      <CallToActionComponent />
      {registeredBusiness.length > 0 && (
        <OurClientListComponent clients={registeredBusiness} />
      )}
    </MainLayout>
  );
}
