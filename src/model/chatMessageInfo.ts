const mongoose = require("mongoose");
const AutoIncrement1 = require("mongoose-sequence")(mongoose);

const chatMessageInfoFields = {
  m_index: {
    type: Number,
    trim: true,
    unique: true,
  },
  room_index: { type: Number, trim: true, required: true },
  template_index: { type: Number, trim: true },
  content: { type: Object },
  is_answer: { type: Boolean },
  created_at: { type: Date, required: true },
};

const chatMessageInfoSchema = new mongoose.Schema(chatMessageInfoFields, {
  bufferCommands: true,
});

chatMessageInfoSchema.plugin(AutoIncrement1, { inc_field: "m_index" });

const chatMessageDB = {
  chatMessage: mongoose.model("chat_messages", chatMessageInfoSchema),
};

module.exports = {
  get_db: () => chatMessageDB,
  get_fields: () => chatMessageInfoFields,
};
