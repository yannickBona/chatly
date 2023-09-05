import { Router } from "express";
import controller from "../controllers/users";
import { requiresAuth } from "../middlewares/requiresAuth";

const userRoutes = Router();

// Gets and Existing user
userRoutes.get("/profile/:username", controller.getUser);
userRoutes.get("/all", controller.getUsers);

// Checks if the user is logged in
userRoutes.get("/session", requiresAuth, controller.session);

/**
 * Logs out an existing user from the application
 * This resets the refresh token
 * */
userRoutes.get("/logout", requiresAuth, controller.logoutUser);

// Gets a list of suggested users to follow
userRoutes.get("/suggested", requiresAuth, controller.getSuggestedUsers);

// Creates a new user
userRoutes.post("/create", controller.createUser);

// Logs an existing user in the application
userRoutes.post("/login", controller.loginUser);

// Creates a new token from a refresh token
userRoutes.post("/token", controller.generateToken);

// Follow / Unfollow a user
userRoutes.post("/follow", requiresAuth, controller.follow);
userRoutes.delete("/follow", requiresAuth, controller.unfollow);

export { userRoutes };
