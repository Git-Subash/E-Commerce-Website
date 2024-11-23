import { Router } from "express";
import {
  createProductController,
  deleteProduct,
  getProductsDetails,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";
import auth from "../middleware/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, admin, createProductController);
productRouter.get("/get", auth, admin, getProductsDetails);
productRouter.put("/update", auth, admin, updateProductDetails);
productRouter.delete("/delete", auth, admin, deleteProduct);

export default productRouter;
