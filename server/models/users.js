// Simple User model
import mongoose from "mongoose";

const documentSchema= new mongoose.Schema({
  panNo: {
      type: String,
      trim: true,
      unique: true,
    },
    aadhar: {
      type: String,
      trim: true,
      unique: true,
      length: 12,
    },
    GST: {
      type: String,
      trim: true,
      unique: true,
    },
    registrationNo: {
      type: String,
      trim: true,
      unique: true,
    },
})

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

  // hashed password (not returned by default)
  // Select : false here ensures that the password field is not returned in queries unless explicitly selected/called for.

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
    type:documentSchema,
  },
  role: { type: String, enum: ["customer", "provider"], default: "customer" },

  ownedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
  rentedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
});

// This is a virtual field that concatenates firstName and lastName to provide a full name.
// It is not stored in the database but can be accessed like a regular field.
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

const User = mongoose.model("User", userSchema);

export default User;
