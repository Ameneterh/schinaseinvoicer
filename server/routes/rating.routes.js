import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getRatings, sendRating } from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/send-rating", sendRating);
router.get("/get-ratings", getRatings);

export default router;
