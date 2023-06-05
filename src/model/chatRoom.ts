const chatRoomModel = require("./chatRoomInfo");
const roomdb = chatRoomModel.get_db();

module.exports = {
  createRoom: async ({ containerUid }: { containerUid: { type: string } }) =>
    // await roomdb.chatRoom.create({
    //   container_uid: containerUid,
    //   created_at: new Date(),
    // }),
    {
      console.log("mode1111");
      try {
        await roomdb.chatRoom.create({
          container_uid: containerUid,
          created_at: new Date(),
        });
        console.log("model2222");
      } catch (error) {
        console.error(error);
      }
    },

  getRoomList: async ({ containerUid }: { containerUid: { type: string } }) => {
    try {
      const rooms = await roomdb.chatRoom.find({ container_uid: containerUid });
      return rooms;
    } catch (error) {
      throw error;
    }
  },
};
