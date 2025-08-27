import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0 },
    tripLimit: { type: Number, default: 0 },
    securityDeposit: { type: Number, required: true, min: 0 },
    rentPrice: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    vehicleRegistration: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      set: (v) => (typeof v === "string" ? v.replace(/\s+/g, "") : v),
      match: [
        /^[A-Z]{2}[0-9A-Z]{1,2}[A-Z]{1,2}[0-9]{4}$/,
        "Invalid vehicle registration format",
      ],
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        // normalize id
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        // convert timestamps to human-readable strings (always set)
        ret.createdAt = new Date(ret.createdAt).toLocaleString();
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString();
      },
    },
    toObject: { virtuals: true },
  }
);

bikeSchema.index({ vehicleRegistration: 1 }, { unique: true });

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
