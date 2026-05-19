import express from "express";

import {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoicePayment,
  // generateInvoicePDF,
} from "../controllers/invoice.controller.js";

// import { protect } from "../middleware/authMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create-invoice", verifyToken, createInvoice);
router.get("/get-invoices", verifyToken, getInvoices);
router.get("/:invoiceId", verifyToken, getInvoice);
router.put("/:invoiceId/update-payment", verifyToken, updateInvoicePayment);
// router.get("/:id/pdf", verifyToken, generateInvoicePDF);

export default router;
