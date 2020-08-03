import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        // 방이 없기 때문에 새로 만들어야 함.
        if (user.id !== to) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
        if (!room) {
          throw Error("Room not found");
        }
      }
      return null;
    }
  }
};
