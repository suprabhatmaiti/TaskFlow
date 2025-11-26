import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  refreshToken,
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/update-profile", verifyToken, updateProfile);

export default router;
