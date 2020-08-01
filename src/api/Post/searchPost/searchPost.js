import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      console.log(term);
      const posts = prisma.posts({
        where: {
          OR: [
            { location_starts_with: args.term },
            { caption_starts_with: args.term }
          ]
        }
      });
      return posts;
    }
  }
};
