import { Router } from "express";
import {
  deleteUser,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/users.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.put("/update", auth, updateUser);
router.delete("/delete", auth, deleteUser);

export default router;
