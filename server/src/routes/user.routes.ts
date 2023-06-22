import { Router } from "express";
import {
  createUserController,
  generateTokenController,
  loginUserController,
  logoutUserController,
  sessionController,
} from "../controllers/users";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

// Creates a new user
userRoutes.post("/create", createUserController);

// Logs an existing user in the application
userRoutes.post("/login", loginUserController);

/**
 * Logs out an existing user from the application
 * This resets the refresh token
 * */
userRoutes.get("/logout", isAuthenticated, logoutUserController);

// Checks if the user is logged in
userRoutes.get("/session", isAuthenticated, sessionController);

// Creates a new token from a refresh token
userRoutes.post("/token", generateTokenController);

export { userRoutes };
