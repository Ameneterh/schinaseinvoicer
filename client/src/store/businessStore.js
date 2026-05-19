import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/business"
    : "/server/business";

axios.defaults.withCredentials = true;

export const useBusinessStore = create((set) => ({
  business: null,
  isBizAuthenticated: false,
  bizError: null,
  isBizLoading: false,
  isBizCheckingAuth: true,
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

  //   business login
  businessLogin: async (business_email, business_password) => {
    set({ isBizLoading: true, bizError: null });
    try {
      const response = await axios.post(`${API_URL}/business-login`, {
        business_email,
        business_password,
      });

      set({
        isBizAuthenticated: true,
        business: response.data.business,
        bizError: null,
        isBizLoading: false,
      });
    } catch (error) {
      set({
        bizError: error.response?.data?.message || "Error logging in",
        isBizLoading: false,
      });
      throw error;
    }
  },

  // business log out
  logout: async () => {
    set({ isBizLoading: true, bizError: null });
    try {
      await axios.post(`${API_URL}/business-logout`);
      set({
        business: null,
        isBizAuthenticated: false,
        bizError: null,
        isBizLoading: false,
      });
    } catch (error) {
      set({ bizError: "Error logging out", isBizLoading: false });
      throw error;
    }
  },

  // check business authentication
  bizCheckAuth: async () => {
    set({ isBizCheckingAuth: true, bizError: null });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        token,
        business: response.data.business,
        isBizAuthenticated: true,
        isBizCheckingAuth: false,
      });
    } catch (error) {
      set({ bizError: null, isBizCheckingAuth: false });
    }
  },

  // forget password
  forgotPassword: async (email) => {
    set({ isBizLoading: true, bizError: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isBizLoading: false });
    } catch (error) {
      set({
        isBizLoading: false,
        bizError:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  // password reset
  resetPassword: async (token, password) => {
    set({ isBizLoading: true, bizError: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isBizLoading: false });
    } catch (error) {
      set({
        isBizLoading: false,
        bizError: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
