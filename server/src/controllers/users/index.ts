import { createUser } from "./createUser";
import { loginUser } from "./loginUser";
import { session } from "./session";
import { generateToken } from "./generateToken";
import { getSuggestedUsers } from "./getSuggestedUsers";
import { logoutUser } from "./logoutUser";
import { follow, unfollow } from "./manageFollow";
import { getUser } from "./getUser";
import { getUsers } from "./getUsers";

export default {
  createUser,
  loginUser,
  session,
  logoutUser,
  generateToken,
  getSuggestedUsers,
  follow,
  unfollow,
  getUser,
  getUsers,
};
