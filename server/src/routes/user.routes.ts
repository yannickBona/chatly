import { Router } from "express";
import controller from "../controllers/users";
import { requiresAuth } from "../middlewares/requiresAuth";

const userRoutes = Router();

// Creates a new user
userRoutes.post("/create", controller.createUser);

// Logs an existing user in the application
userRoutes.post("/login", controller.loginUser);

/**
 * Logs out an existing user from the application
 * This resets the refresh token
 * */
userRoutes.get("/logout", requiresAuth, controller.logoutUser);

// Checks if the user is logged in
userRoutes.get("/session", requiresAuth, controller.session);

// Creates a new token from a refresh token
userRoutes.post("/token", requiresAuth, controller.generateToken);

// Gets a list of suggested users to follow
userRoutes.get("/suggested", controller.getSuggestedUsers);

export { userRoutes };
