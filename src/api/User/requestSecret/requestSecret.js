import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        await prisma.updateUser({
          // email 보내기 전에 user정보가 있는지 확인해야함
          data: { loginSecret },
          where: { email }
        });
        await sendSecretMail(email, loginSecret);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
