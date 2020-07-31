import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      // firstName + lastName = FullName
      console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            }, // 팔로잉하려는 사람의 ID가 존재하면서
            {
              following_some: {
                id: parentId
              }
            } // 그사람의 팔로워에 내가 있는가?
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
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
