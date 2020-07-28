import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;
      console.log(term);
      const user = prisma.users({
        where: {
          OR: [
            { username_contains: term },
            { lastName_starts_with: term },
            { firstName_starts_with: term }
          ]
        }
      });
      return user;
    }
  }
};
