import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  CheckAuth,
  addHandler,
  getUsers,
} from "../controllers/auth.controller.js";
import { addBusiness } from "../controllers/business.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, CheckAuth);
router.post("/add-handler", addHandler);
router.post("/verify-email", verifyEmail);
router.post("/add-new-business", addBusiness);

router.post("/user-login", login);
router.post("/logout", logout);

router.get("/get-users", getUsers);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
