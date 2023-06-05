const chatMessageModel = require("./chatMessageInfo");
const messagedb = chatMessageModel.get_db();

module.exports = {
  createMessage: async (query: any) =>
    await messagedb.chatMessage.create({ ...query, created_at: new Date() }),
};
