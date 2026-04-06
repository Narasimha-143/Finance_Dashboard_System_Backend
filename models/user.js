const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
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
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["viewer", "analyst", "admin"],
      default: "viewer",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ✅ SOFT DELETE FIELD
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // ✅ Track when deleted (optional but recommended)
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});


module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);