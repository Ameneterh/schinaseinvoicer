import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";
import Contact from "../models/contact.model.js";

// create contact message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, text } = req.body;

    // Add validation for required fields
    if (!name || !email || !phone || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const message = await Contact.create({
      name,
      email,
      phone,
      text,
    });

    res.status(201).json({
      success: true,
      message,
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

    const totalInvoices = await Invoice.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthInvoices = await Invoice.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      invoices,
      totalInvoices,
      lastMonthInvoices,
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
