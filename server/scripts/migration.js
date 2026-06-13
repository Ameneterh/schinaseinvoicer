import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const removeField = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ameneterh:invoicerapp@invoicer-app.5jk2c.mongodb.net/invoicer-db?retryWrites=true&w=majority&appName=invoicer-app",
    );

    console.log("Database connected");

    const result = await User.updateMany(
      {},
      {
        $unset: {
          isActive: "",
        },
      },
    );

    console.log("Updated documents:", result.modifiedCount);

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

removeField();
