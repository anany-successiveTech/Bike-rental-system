import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked" },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
