import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      // firstName + lastName = FullName
      console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, __, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: parentId
            },
            {
              following_some: {
                id: user.id
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, __, { request }) => {
      //check me
      const { user } = request; //현재 로그인한 유저 정보
      const { id: parentId } = parent; // User를 호출한 Query
      if (parentId === user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
