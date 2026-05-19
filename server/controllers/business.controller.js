import Business from "../models/business.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendHandlerActivationEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendTemporaryHandlerCredentials,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

// create new business
export const addBusiness = async (req, res) => {
  const {
    business_name,
    business_email,
    business_password,
    business_phone,
    business_address,
    banker,
    account_name,
    account_number,
  } = req.body;

  try {
    // check content from req.body
    if (
      !business_name ||
      !business_email ||
      !business_password ||
      !business_phone ||
      !business_address
    ) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const businessAlreadyExists = await Business.findOne({ business_email });
    if (businessAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Business Already Exists!" });
    }

    // hash password and generate verification token
    const hashedPassword = bcryptjs.hashSync(business_password, 10);

    // generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // save new business
    const business = new Business({
      business_name,
      business_email,
      business_password: hashedPassword,
      business_phone,
      business_address,
      banker,
      account_name,
      account_number,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await business.save();

    await sendVerificationEmail(business.business_email, verificationToken);

    res.status(201).json({
      success: true,
      message: "New Business Added Successfully",
      business: { ...business._doc, business_password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const business = await Business.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!business) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    business.isVerified = true;
    business.verificationToken = undefined;
    business.verificationTokenExpiresAt = undefined;
    await business.save();

    await sendWelcomeEmail(business.business_email, business.business_name);

    res.status(200).json({
      success: true,
      message: "Business Email verified successfully",
      business: {
        ...business._doc,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// business login
export const businessLogin = async (req, res) => {
  const { business_email, business_password } = req.body;
  try {
    const business = await Business.findOne({ business_email });

    if (!business) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Business Email!" });
    }

    if (business.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Business not activated, contact support",
      });
    }

    const isValidPassword = bcryptjs.compareSync(
      business_password,
      business.business_password,
    );
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Business Password Credentials!",
      });
    }

    generateTokenAndSetCookie(res, business._id);

    business.lastLogin = new Date();
    await business.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      business: { ...business._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// business logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "Business Logged Out Successfully" });
};

// get all registered businesses
export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();

    res.status(201).json({
      success: true,
      message: "Businesses fetched successfully",
      businesses,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// check authentication
export const BizCheckAuth = async (req, res) => {
  try {
    const business = await Business.findById(req.businessId).select(
      "-business_password",
    );

    if (!business) {
      return res
        .status(400)
        .json({ success: false, message: "Business not found" });
    }

    res.status(200).json({ success: true, business });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
