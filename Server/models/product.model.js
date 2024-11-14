import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: Array,
    default: [],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
  },
  sub_categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "subCategory",
  },
  unit: {
    type: String,
    default: null,
  },
  stock: {
    type: Number,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  discount: {
    type: Number,
    default: null,
  },
  more_details: {
    type: Object,
    default: {},
  },
});

const poductModel = mongoose.model("product", productSchema);

export default poductModel;
