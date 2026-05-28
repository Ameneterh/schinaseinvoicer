import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/rating"
    : "/server/rating";

axios.defaults.withCredentials = true;

export const useRatingStore = create((set) => ({
  rating: null,
  error: null,
  isLoading: false,
  message: null,

  //   send new message
  addRating: async ({ rating, comment, rater }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/send-rating`, {
        rating,
        comment,
        rater,
      });
      set({
        rating: response.data.rating,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error sending rating",
        isLoading: false,
      });
      throw error;
    }
  },

  // general users actions: get all users, get one user, update user, delete user
  // 1. get all messages
  getAllRatings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-ratings`);
      set({
        ratings: response.data.ratings,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Ratings",
        isLoading: false,
      });
      throw error;
    }
  },
}));
