const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    message: { type: String, required: true, maxlength: 4000 },
    sender: { type: String, enum: ["user", "bot"], required: true }
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: { type: String, default: "New chat", trim: true, maxlength: 80 },
    messages: [messageSchema]
  },
  { timestamps: true }
);

// Fast "my chats, newest first" lookups
chatSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model("Chat", chatSchema);
