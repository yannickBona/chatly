import { Router } from "express";
import {
  createUserController,
  generateTokenController,
  loginUserController,
  logoutUserController,
  sessionController,
} from "../controllers/users";
import { requiresAuth } from "../middlewares/requiresAuth";

const userRoutes = Router();

// Creates a new user
userRoutes.post("/create", createUserController);

// Logs an existing user in the application
userRoutes.post("/login", loginUserController);

/**
 * Logs out an existing user from the application
 * This resets the refresh token
 * */
userRoutes.get("/logout", requiresAuth, logoutUserController);

// Checks if the user is logged in
userRoutes.get("/session", requiresAuth, sessionController);

// Creates a new token from a refresh token
userRoutes.post("/token", requiresAuth, generateTokenController);

export { userRoutes };
