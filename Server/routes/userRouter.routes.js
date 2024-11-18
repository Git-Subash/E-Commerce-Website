import { Router } from "express";
import {
  LoginController,
  LogoutController,
  registerController,
  verifyEmailController,
} from "../controllers/users.controller.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", LoginController);
userRouter.get("/logout", auth, LogoutController);

export default userRouter;
