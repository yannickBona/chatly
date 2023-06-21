import { Router } from "express";
import {
  createUserController,
  generateTokenController,
  loginUserController,
  sessionController,
} from "../controllers/users";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

userRoutes.post("/create", createUserController);
userRoutes.post("/login", loginUserController);
userRoutes.get("/session", isAuthenticated, sessionController);
userRoutes.post("/token", generateTokenController);

export { userRoutes };
