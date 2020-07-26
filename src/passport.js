import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // .env파일에 있음.
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id }); //payload의 id 가 있는 유저인지 확인
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    // 콜백함수
    if (user) {
      //유저가 있다면 request에 user를 넣어줍니다.
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser)); // 만들어놓은 option과 유저확인 함수로 토큰을 인증함.
passport.initialize();
