import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
