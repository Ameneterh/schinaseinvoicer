import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["architect", "businessAdmin", "handler"],
      required: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      unique: true,
      // sparse: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      // minlength: 8,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",

      // required: function () {
      //   return this.role !== "architect";
      // },

      default: null,
    },

    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/black-white-handshake-symbol-with-starburst-background_1294240-23568.jpg",
    },

    staff_signature: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/signature-vector-hand-drawn-autograph-600nw-2387543207.jpg",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    verificationToken: String,

    verificationTokenExpiresAt: Date,

    resetPasswordToken: String,

    resetPasswordExpiresAt: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     role: {
//       type: String,
//       enum: ["architect", "businessAdmin", "handler"],
//       required: true,
//     },
//     fullname: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     user_email: {
//       type: String,
//       lowercase: true,
//       trim: true,
//       sparse: true, // allows null + unique
//     },
//     phoneNumber: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     user_password: {
//       type: String,
//       required: true,
//       minlength: 8,
//     },
//     affiliation: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Business",
//       required: true,
//       sparse: true, // allows null + unique
//     },
//     avatar: {
//       type: String,
//       default:
//         "https://img.freepik.com/premium-vector/black-white-handshake-symbol-with-starburst-background_1294240-23568.jpg?semt=ais_hybrid",
//     },
//     staff_signature: {
//       type: String,
//       default:
//         "https://www.shutterstock.com/image-vector/signature-vector-hand-drawn-autograph-600nw-2387543207.jpg",
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//     lastLogin: {
//       type: Date,
//       default: Date.now,
//     },
//     verificationToken: String,
//     verificationTokenExpiresAt: Date,
//     resetPasswordToken: String,
//     resetPasswordExpiresAt: Date,
//   },
//   { timestamps: true },
// );

// const User = mongoose.model("User", userSchema);

// export default User;
