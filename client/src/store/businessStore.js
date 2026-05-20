import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/business"
    : "/server/business";

axios.defaults.withCredentials = true;

export const useBusinessStore = create((set) => ({
  business: null,
  error: null,
  isLoading: false,
  message: null,

  //   get all businesses
  getAllBusinesses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-businesses`);
      set({
        businesses: response.data.businesses,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Invoices",
        isLoading: false,
      });
      throw error;
    }
  },

  // verify email
  verifyBusiness: async (code) => {
    set({ isBizLoading: true, bizError: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });
      set({
        business: response.data.business,
        isBizAuthenticated: true,
        isBizLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        bizError: error.response.data.message || "Error verifying email",
        isBizLoading: false,
      });
      throw error;
    }
  },
}));
