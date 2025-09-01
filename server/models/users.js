// Simple User model
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  panNo: { type: String, trim: true },
  aadhar: { type: String, trim: true, length: 12 },
  GST: { type: String, trim: true },
  registrationNo: { type: String, trim: true },
});

// Sparse unique index for panNo (only enforced if value exists)
documentSchema.index({ panNo: 1 }, { unique: true, sparse: true });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 30 },
  lastName: { type: String, required: true, trim: true, maxlength: 30 },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },

  mobileNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /^\d{10}$/,
  },

  password: { type: String, required: true, select: false },

  gender: { type: String, enum: ["male", "female", "other"] },

  address: {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
  },

  businessName: { type: String, trim: true, maxlength: 100 },

  document: {
    type: documentSchema,
    required: function () {
      return this.role === "provider";
    },
  },

  role: { type: String, enum: ["customer", "provider"], default: "customer" },

  ownedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
  rentedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
});
userSchema.index(
  { "document.panNo": 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: "provider",
      "document.panNo": { $exists: true },
    },
  }
);

// Virtual field for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

const User = mongoose.model("User", userSchema);

export default User;
