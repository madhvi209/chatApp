import express from "express";
import {
  registerUser,
  authUser,
  allUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUser);
router.route("/login").post(authUser);

export default router;