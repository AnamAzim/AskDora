const express = require("express");
const { getChats, createChat, getChat, updateChat, deleteChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getChats);
router.post("/", createChat);
router.get("/:id", getChat);
router.put("/:id", updateChat);
router.patch("/:id", updateChat);
router.delete("/:id", deleteChat);

module.exports = router;
