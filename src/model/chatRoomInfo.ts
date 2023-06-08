const mongose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongose);

const chatRoomInfoFields = {
  index: {
    type: Number,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    default: function (this: { index: number }) {
      return "room" + this.index;
    },
  },
  container_uid: { type: String, trim: true, required: true },
  created_at: { type: Date, required: true },
};

const chatRoomInfoSchema = new mongose.Schema(chatRoomInfoFields, {
  bufferCommands: true,
});

chatRoomInfoSchema.plugin(AutoIncrement, { inc_field: "index" });

const chatDB = {
  chatRoom: mongose.model("chat_rooms", chatRoomInfoSchema),
};

module.exports = {
  get_db: () => chatDB,
  get_fields: () => chatRoomInfoFields,
};
