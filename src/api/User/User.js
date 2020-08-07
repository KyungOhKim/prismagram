import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      // firstName + lastName = FullName
      console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent, __, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;
      try {
        return prisma.$exists.user({
          AND: [
            { id: parentId }, // 팔로잉하려는 사람의 ID가 존재하면서
            {
              followers_some: {
                id: user.id
              }
            } // 그사람의 팔로워에 내가 있는가?
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
    },
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count()
  }
};
