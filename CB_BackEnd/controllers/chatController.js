const mongoose = require("mongoose");
const Chat = require("../models/Chat");

const MAX_MESSAGES = 500;

function cleanTitle(value, fallback = "New chat") {
  if (typeof value !== "string") return fallback;
  const t = value.replace(/\s+/g, " ").trim().slice(0, 80);
  return t || fallback;
}

// Accepts only well-formed messages; ignores anything else
function cleanMessages(value) {
  if (!Array.isArray(value)) return null;
  return value
    .slice(-MAX_MESSAGES)
    .filter(
      (m) =>
        m &&
        typeof m.message === "string" &&
        m.message.trim() &&
        (m.sender === "user" || m.sender === "bot")
    )
    .map((m) => ({
      id: String(m.id || new mongoose.Types.ObjectId()),
      message: m.message.slice(0, 4000),
      sender: m.sender
    }));
}

function validId(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404).json({ message: "Chat not found" });
    return false;
  }
  return true;
}

// List (lightweight - no messages) of ONLY the logged-in user's chats
async function getChats(req, res) {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .select("title updatedAt createdAt")
      .sort({ updatedAt: -1 })
      .limit(200)
      .lean();
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch chats" });
  }
}

async function createChat(req, res) {
  try {
    const messages = cleanMessages(req.body.messages) || [];
    const chat = await Chat.create({
      userId: req.userId,
      title: cleanTitle(req.body.title),
      messages
    });
    res.status(201).json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create chat" });
  }
}

async function getChat(req, res) {
  try {
    if (!validId(req, res)) return;
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch chat" });
  }
}

// Save messages (and optionally title) - only fields that were sent are changed
async function updateChat(req, res) {
  try {
    if (!validId(req, res)) return;
    const update = {};

    const messages = cleanMessages(req.body.messages);
    if (messages) update.messages = messages;
    if (typeof req.body.title === "string") update.title = cleanTitle(req.body.title);

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      update,
      { new: true }
    );
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update chat" });
  }
}

async function deleteChat(req, res) {
  try {
    if (!validId(req, res)) return;
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json({ message: "Chat deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete chat" });
  }
}

module.exports = { getChats, createChat, getChat, updateChat, deleteChat };
