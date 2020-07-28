import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: (_, args) => {
      const { term } = args;
      const posts = prisma.posts({
        where: {
          OR: [{ caption_contains: term }, { location_contains: term }]
        }
      });
      return posts;
    }
  }
};
