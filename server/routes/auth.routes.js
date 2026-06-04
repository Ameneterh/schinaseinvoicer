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
  addUser,
  updateUser,
  updatePassword,
} from "../controllers/auth.controller.js";
import { addBusiness } from "../controllers/business.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, CheckAuth);
router.post("/add-new-business", addBusiness);
router.post("/add-user", addUser);
router.post("/add-handler", addHandler);
router.put("/update-user/:userId", verifyToken, updateUser);
router.put("/update-password/:userId", verifyToken, updatePassword);
router.post("/verify-email", verifyEmail);

router.post("/user-login", login);
router.post("/logout", logout);

router.get("/get-users", getUsers);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
