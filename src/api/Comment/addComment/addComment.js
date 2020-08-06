import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client"; // 다른 폴더에서 열려있으면 import 됨

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request); // 인증을 위해 필요함
      const { text, postId } = args; // 입력한 arguments
      const { user } = request; //request에 있는 user정보
      return prisma.createComment({
        user: {
          connect: {
            id: user.id // request.user.id를 갖고있는 user를 연결해준다는 뜻인 것 같음
          }
        },
        post: {
          connect: {
            id: postId // arguments로 받은 postId를 갖고 있는 post를 comment의 post에 연결해준다는 뜻인 것 같음
          }
        },
        text // text도 넣어줌
      });
    }
  }
};
