import authRouter from "./routes/auth.routes.js";
import clientRouter from "./routes/client.routes.js";
import invoiceRouter from "./routes/invoice.routes.js";
import businessRouter from "./routes/business.routes.js";
// import productRouter from "./routes/product.route.js";
// import bidsRouter from "./routes/bids.routes.js";
// import notificationsRouter from "./routes/notification.route.js";
// import reviewsRouter from "./routes/reviews.route.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

// deployment config
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    (process.env.MONGO_DB =
      "mongodb+srv://ameneterh:invoicerapp@invoicer-app.5jk2c.mongodb.net/invoicer-db?retryWrites=true&w=majority&appName=invoicer-app"),
  )
  .then(() => console.log(`Connected to MongoDb Database!`))
  .catch((error) => console.log(error));

app.use("/server/auth", authRouter);
app.use("/server/client", clientRouter);
app.use("/server/invoice", invoiceRouter);
app.use("/server/business", businessRouter);
// app.use("/backend/products", productRouter);
// app.use("/backend/bids", bidsRouter);
// app.use("/backend/notifications", notificationsRouter);
// app.use("/backend/reviews", reviewsRouter);

// render deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.listen(PORT, () =>
  console.log(`Node/Express Server is running on Port ${PORT}`),
);
