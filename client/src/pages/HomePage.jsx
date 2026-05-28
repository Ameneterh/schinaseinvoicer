import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useBusinessStore } from "../store/businessStore";
import { formatDate } from "../../../server/utils/date";
import MainLayout from "../layout/MainLayout";
import ButtonSpecial from "../components/ButtonSpecial";
import HeroComponent from "../components/homePageComponents/HeroComponent";
import AboutUsComponent from "../components/homePageComponents/AboutUsComponent";
import CallToActionComponent from "../components/homePageComponents/CallToActionComponent";
import CustomerFeedbackComponent from "../components/homePageComponents/CustomerFeedbackComponent";
import BillingPlansComponent from "../components/homePageComponents/BillingPlansComponent";
import PossibleClientsComponent from "../components/homePageComponents/PossibleClientsComponent";
import OurClientListComponent from "../components/homePageComponents/OurClientListComponent";
import registeredBusiness from "../assets/registeredBusiness.json";
import { useRatingStore } from "../store/ratingStore";

export default function HomePage() {
  const { user, logout, isLoading } = useAuthStore();
  const { getAllBusinesses } = useBusinessStore();
  const { getAllRatings } = useRatingStore();

  const [businesses, setBusinesses] = useState([]);
  const [ratings, setRatings] = useState([]);

  // const slicedNews = news.slice(0, 8);

  const handleLogout = () => {
    logout();
  };

  const getBusinesses = async () => {
    try {
      const { businesses } = await getAllBusinesses();

      setBusinesses(businesses);
    } catch (error) {
      console.log(error);
    }
  };

  const getRatings = async () => {
    try {
      const { ratings } = await getAllRatings();

      setRatings(ratings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesses();
    getRatings();
  }, []);

  return (
    <MainLayout>
      <HeroComponent />
      <PossibleClientsComponent />
      <AboutUsComponent />
      <BillingPlansComponent />
      {/* <div className="px-20 mt-10 bg-white">
        <GalleryComponent title="View Gallery" news={slicedNews} />
      </div> */}

      {ratings?.length > 0 ? (
        <CustomerFeedbackComponent ratings={ratings} />
      ) : (
        <></>
      )}

      <CallToActionComponent />
      {registeredBusiness.length > 0 && (
        <OurClientListComponent clients={businesses} />
      )}
    </MainLayout>
  );
}
