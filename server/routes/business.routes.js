import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  addBusiness,
  verifyEmail,
  businessLogin,
  logout,
  getBusinesses,
  BizCheckAuth,
} from "../controllers/business.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, BizCheckAuth);

router.post("/add-new-business", addBusiness);
router.post("/verify-email", verifyEmail);
router.post("/business-login", businessLogin);
router.post("/business-logout", logout);
router.get("/get-businesses", verifyToken, getBusinesses);

// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password/:token", resetPassword);

export default router;
