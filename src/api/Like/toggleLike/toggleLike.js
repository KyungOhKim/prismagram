import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      // user를 사용하기 위해 request
      isAuthenticated(request);
      const { postId } = args; // query인자로 게시물 id를 받음
      const { user } = request; // request에서 user 사용
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOptions); // 해당 게시물에 좋아요가 존재하는지 확인
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions); // 존재하면 없앰
        } else {
          await prisma.createLike({
            // 만들어냄
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
