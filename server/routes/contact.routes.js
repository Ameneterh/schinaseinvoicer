import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMessage } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/send-message", sendMessage);

export default router;
