import bcryptjs from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.model.js";
import Business from "../models/business.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendHandlerActivationEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendTemporaryHandlerCredentials,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { log } from "console";

// add new user
export const addUser = async (req, res) => {
  const {
    fullname,
    email,
    phoneNumber,
    password,
    role,
    avatar,
    staff_signature,
    business_logo,
    website,
    plan,
    business_name,
    business_email,
    business_phone,
    business_address,
    banker,
    account_name,
    account_number,
  } = req.body;

  try {
    // check content from req.body
    if (!fullname || !email || !phoneNumber || !password || !role) {
      throw new Error("All fields are required!");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password and generate verification token
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // save new user
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      avatar,
      staff_signature,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // after saving user, save business affiliation
    const savedUser = await User.findOne({ email });

    if (role === "businessAdmin") {
      // check if business already exists
      const businessAlreadyExists = await Business.findOne({ business_email });
      if (businessAlreadyExists) {
        return res
          .status(400)
          .json({ success: false, message: "Business Already Exists!" });
      }

      let invoiceLimit = "";
      let maxHandlers = "";

      if (plan === "trial") {
        invoiceLimit = 5;
        maxHandlers = 0;
      } else if (plan === "basic") {
        invoiceLimit = 50;
        maxHandlers = 2;
      } else {
        invoiceLimit = 100;
        maxHandlers = 10;
      }

      // save new business
      const business = await Business.create({
        business_logo,
        website,
        business_name,
        business_email,
        business_phone,
        business_address,
        banker,
        plan,
        invoiceLimit,
        maxHandlers,
        account_name,
        account_number,
        owner: user._id,
      });

      await business.save();
      user.business = business._id;
    }

    await user.save();

    // generate cookie with jwt
    generateTokenAndSetCookie(res, user._id);
    // await sendTemporaryHandlerCredentials(user.email, password);

    // const savedUser = await User.findOne({ email }).populate("business");

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "New Business and Owner Created Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// verify handler registration
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).populate("business");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isActive = true;
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    if (user.role === "businessAdmin") {
      await sendWelcomeEmail(user.email, user.fullname);
    }

    res.status(200).json({
      success: true,
      message: "User Account Activated Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in verifyHandlerRegistration", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// add handler
export const addHandler = async (req, res) => {
  const {
    fullname,
    email,
    phoneNumber,
    role,
    avatar,
    staff_signature,
    business,
  } = req.body;

  try {
    // check content from req.body
    if (!fullname || !email || !phoneNumber || !role) {
      throw new Error("All fields are required!");
    }

    const [handlerCount, businessRecord] = await Promise.all([
      User.countDocuments({
        business: business,
        role: "handler",
      }),
      Business.findById(business),
    ]);

    if (!businessRecord) {
      throw new Error("Business not found");
    }

    if (handlerCount >= businessRecord.maxHandlers) {
      throw new Error(
        `Handler limit reached. Your plan allows a maximum of ${businessRecord.maxHandlers} handlers.`,
      );
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // generate temporary password
    const tempPassword =
      "InvoiceCore@app" +
      Math.floor(100000 + Math.random() * 900000).toString();

    // hash password and generate verification token
    const hashedPassword = bcryptjs.hashSync(tempPassword, 10);

    // generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // save new user
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      avatar,
      staff_signature,
      business,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // generate cookie with jwt
    generateTokenAndSetCookie(res, user._id);

    const savedUser = await User.findOne({ email }).populate({
      path: "business",
      populate: {
        path: "owner",
      },
    });

    await sendHandlerActivationEmail(
      savedUser.business.owner.email,
      verificationToken,
    );

    await sendTemporaryHandlerCredentials({
      email: savedUser.email,
      fullname: savedUser.fullname,
      password: tempPassword,
      owner: savedUser.business.owner.fullname,
      business_name: savedUser.business.business_name,
    });

    res.status(201).json({
      success: true,
      message: "New Business and Owner Created Successfully",
      user: { ...user._doc, password: undefined },
      business,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const existingUser = await User.findById(userId).populate("business");

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updates = {};

    // Only update fields that were actually sent
    const allowedFields = [
      "fullname",
      "email",
      "phoneNumber",
      "avatar",
      "isDeleted",
      "isActive",
    ];

    for (const field of allowedFields) {
      if (
        req.body[field] !== undefined &&
        String(req.body[field]) !== String(existingUser[field] ?? "")
      ) {
        updates[field] = req.body[field];
      }
    }

    // Avatar plan restriction
    if (updates.avatar) {
      const business = existingUser.business;

      if (business?.plan?.toLowerCase() === "trial") {
        return res.status(403).json({
          success: false,
          message:
            "Avatar updates are available only on Basic and Premium plans. Upgrade your subscription to update avatar.",
        });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        new: true,
        // runValidators: true,
      },
    ).populate("business");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// update user password
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, password } = req.body;

    // check user exists
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check if old password supplied matches password on record
    const isValidPassword = bcryptjs.compareSync(
      oldPassword,
      existingUser.password,
    );

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect!",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    const isSamePassword = bcryptjs.compareSync(
      password,
      existingUser.password,
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password",
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const updates = {
      password: hashedPassword,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        new: true,
      },
    ).populate("business");

    return res.status(200).json({
      success: true,
      message: "User password updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Password Error:", error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Failed to update user password",
    });
  }
};

// user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("business");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Email!" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "User not activated, contact HR" });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid User Password Credentials!",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// user logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User not found!`,
      });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );

    res.status(200).json({
      success: true,
      message: "Passowrd reset link set to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Reset Token!" });
    }

    // update password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.user_email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// check authentication
export const CheckAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("business")
      .select("-user_password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ sucess: false, message: error.message });
  }
};

// general users actions
// 1. get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("business", "business_name");

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(201).json({
      success: true,
      message: "Users fetched successfully",
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
