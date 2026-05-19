import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";

// create invoice
export const createInvoice = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { invoiceNumber, invoiceType, validity, items, notes, client } =
      req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items must be an array",
      });
    }

    const subtotal = items.reduce((acc, item) => acc + Number(item.amount), 0);

    const tax = 0;
    const discount = 0;

    const total = subtotal + tax - discount;

    const invoice = await Invoice.create({
      invoiceNumber,
      invoiceType,
      validity,
      items,
      notes,
      subtotal,
      tax,
      discount,
      total,

      company: user.business._id,
      createdBy: user._id,
      client,
    });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all invoices
export const getInvoices = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // const invoices = await Invoice.find({
    //   company: user.business._id,
    // })
    const invoices = await Invoice.find({})
      .populate("company")
      .populate("client")
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      invoices,
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

// update invoice payment
export const updateInvoicePayment = async (req, res) => {
  try {
    const { paymentAmount } = req.body;
    const invoiceId = req.params.invoiceId;

    // Validate payment
    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    // Find invoice
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Update total payment made
    invoice.totalAmountReceived += Number(paymentAmount);

    // Prevent overpayment
    if (invoice.totalAmountReceived > invoice.totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Payment exceeds invoice total",
      });
    }

    // Calculate balance
    invoice.balanceDue = invoice.totalAmount - invoice.totalAmountReceived;

    // Update payment status
    if (invoice.balanceDue === 0) {
      invoice.status = "paid";
    } else {
      invoice.status = "part-payment";
    }

    await invoice.save();

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      invoice,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
