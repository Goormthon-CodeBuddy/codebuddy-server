const mongoose = require("mongoose");

const chatMessageInfoFields = {
  index: { type: Number, trim: true, required: true },
  room_index: { type: Number, trim: true, required: true },
  template_index: { type: Number, trim: true },
  content: { type: Object },
  is_answer: { type: Boolean },
  created_at: { type: Date, required: true },
};

const chatMessageInfoSchema = new mongoose.Schema(chatMessageInfoFields, {
  bufferCommands: true,
});

const chatMessageDB = {
  chatMessage: mongoose.model("chat_messages", chatMessageInfoSchema),
};

module.exports = {
  get_db: () => chatMessageDB,
  get_fields: () => chatMessageInfoFields,
};
