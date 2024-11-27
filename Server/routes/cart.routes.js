import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCartController } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartController);

export default cartRouter;
