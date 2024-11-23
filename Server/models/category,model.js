import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      require: true,
    },
    image: {
      type: String,
      default: null,
      require: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
