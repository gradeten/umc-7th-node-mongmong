import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import { prisma } from "./db.config.js";

dotenv.config();

export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
      clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails?.[0]?.value || profile._json.email;
        if (!email) {
          throw new Error(`Profile email not found: ${JSON.stringify(profile)}`);
        }
  
        let user = await prisma.user.findFirst({ where: { email } });
  
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName || profile._json.nickname,
              gender: profile._json.gender || "Unknown",
              birth: new Date(1970, 0, 1), // Placeholder for now
              address: "추후 수정",
              detailAddress: "추후 수정",
              phoneNumber: profile._json.mobile || "추후 수정",
            },
          });
        }
  
        return cb(null, { id: user.id, email: user.email, name: user.name });
      } catch (error) {
        return cb(error);
      }
    }
  );

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["email", "profile"],
    state: true,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        detailAddress: "추후 수정",
        phoneNumber: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };