import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent, __, { request }) => {
      // firstName + lastName = FullName
      console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, __, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;
      try {
        const exists = await prisma.$exists.user({
          AND: [
            { id: parentId }, // 팔로잉하려는 사람의 ID가 존재하면서
            {
              followers_some: {
                id: user.id
              }
            } // 그사람의 팔로워에 내가 있는가?
          ]
        });
        console.log(exists);
        if (exists) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
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
