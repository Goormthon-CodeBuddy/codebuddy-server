const chatMessageModel = require("./chatMessageInfo");
const messagedb = chatMessageModel.get_db();

module.exports = {
  createMessage: async (message: any) =>
    await messagedb.chatMessage.create({
      ...message,
      is_answer: false,
      created_at: new Date(),
    }),

  saveAnswer: async (answer: any) =>
    await messagedb.chatMessage.create({
      ...answer,
      is_answer: true,
      created_at: new Date(),
    }),

  getHistory: async (room_index: number) => {
    try {
      const messages = await messagedb.chatMessage.find({ room_index });
      return messages;
    } catch (error) {
      throw error;
    }
  },
};
