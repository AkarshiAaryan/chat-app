import express from "express";
import { signup, login, checkAuth } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";
// updateProfile will be implemented in the controller later
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
