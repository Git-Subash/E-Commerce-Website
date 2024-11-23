import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import {
  createCategoryController,
  getCategoryController,
} from "../controllers/category.controller.js";
import upload from "../middleware/multer.js";

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  auth,
  admin,
  upload.single("image"),
  createCategoryController
);
categoryRouter.get("/get", getCategoryController);

export default categoryRouter;
