import { Router } from "express";
import { CreateProductContoller } from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";
import auth from "../middleware/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, admin, CreateProductContoller);

export default productRouter;
