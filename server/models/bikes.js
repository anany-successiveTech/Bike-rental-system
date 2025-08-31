import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },

    tripLimit: { type: Number, default: 0 },
    securityDeposit: { type: Number, required: true, min: 0 },
    rentPrice: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    bikeImage: { type: String, trim: true },
    vehicleRegistration: {
      type: String,
      uppercase: true,
      trim: true,
      required: true,
      unique: [true, "Vehicle registration must be unique"],
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

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
