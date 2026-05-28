import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";
import Rating from "../models/rating.model.js";

// create contact message
export const sendRating = async (req, res) => {
  try {
    const { rating, comment, rater } = req.body;

    // Add validation for required fields
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const rate = await Rating.create({
      rating,
      comment,
      rater,
    });

    res.status(201).json({
      success: true,
      rating: rate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all ratings
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({})
      .populate({
        path: "rater",
        populate: {
          path: "business",
          model: "Business",
        },
      })
      .sort({ createdAt: -1 });

    const totalRatings = await Rating.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthRatings = await Rating.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      message: "Ratings fetched successfully",
      ratings,
      totalRatings,
      lastMonthRatings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get one invoice
export const getInvoice = async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await Invoice.findById(invoiceId)
      .populate("client")
      .populate("company")
      .populate("createdBy");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
