import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/contact"
    : "/server/contact";

axios.defaults.withCredentials = true;

export const useContactStore = create((set) => ({
  contact: null,
  error: null,
  isLoading: false,
  message: null,

  //   send new message
  sendMessage: async ({ name, email, phone, text }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/send-message`, {
        name,
        email,
        phone,
        text,
      });
      set({
        contact: response.data.contact,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || error.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // general users actions: get all users, get one user, update user, delete user
  // 1. get all users
  //   get all businesses
  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-users`);
      set({
        users: response.data.users,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Users",
        isLoading: false,
      });
      throw error;
    }
  },
}));
