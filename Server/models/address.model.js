import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    country: {
      type: String,
    },
    moblie: {
      type: Number,
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("address", addressSchema);

export default addressModel;
