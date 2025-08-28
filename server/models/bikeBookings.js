import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    bike: {
      type: Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bikeImage: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    kilometers: { type: Number, default: 0, min: 0 },
    rentedPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirm", "cancelled", "complete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.createdAt = new Date(ret.createdAt).toLocaleString();
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString();
      },
    },
  }
);

const Booking = model("BikeBooking", bookingSchema);

export default Booking;
