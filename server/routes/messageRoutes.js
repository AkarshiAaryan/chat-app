import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getUsersForSidebar, getMessages, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.use(protectRoute);

router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);
router.put("/mark/:id", markMessageAsSeen);
router.post("/send/:id", sendMessage);

export default router;
