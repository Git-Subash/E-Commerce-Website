import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import {
  createSubCategoryController,
  getFilterSubCategory,
  getSubCategoryController,
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, admin, createSubCategoryController);
subCategoryRouter.get("/get", getSubCategoryController);
subCategoryRouter.get("/filter", getFilterSubCategory);

export default subCategoryRouter;
