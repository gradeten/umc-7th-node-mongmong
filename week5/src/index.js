import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { googleStrategy, naverStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import {
  handleUserSignUp,
  handleAddReview,
  handleAddMission,
  handleAddUserMission,
  handleListStoreReviews,
  handleUserReview,
  handleListStoreMissions,
  handleOngoingUserMission,
} from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Swagger 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 세션 설정
app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, secure: false },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport 초기화
passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// 미들웨어 설정
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 커스텀 응답 메서드 등록
app.use((req, res, next) => {
  res.success = function (data) {
    this.status(this.statusCode || 200).json({
      resultType: "SUCCESS",
      error: null,
      success: data,
    });
    return this;
  };

  res.error = function ({ errorCode = "unknown", reason = null, data = null }) {
    this.status(this.statusCode || 500).json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
    return this;
  };

  next();
});

// 네이버 OAuth 경로 설정
app.get("/auth/naver", passport.authenticate("naver"));
app.get(
  "/auth/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/auth/naver",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/"); // 인증 성공 시 리다이렉트
  }
);

// 구글 OAuth 경로 설정
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/"); // 인증 성공 시 리다이렉트
  }
);

// API 경로 설정
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/review/post", handleAddReview);
app.get("/api/v1/users/reviews/:userId", handleUserReview);
app.get("/api/v1/users/missions/ongoing/:userId", handleOngoingUserMission);
app.post("/api/v1/mission/post", handleAddMission);
app.post("/api/v1/mission/user/post", handleAddUserMission);
app.get("/api/v1/stores/reviews/:storeId", handleListStoreReviews);
app.get("/api/v1/stores/missions/:storeId", handleListStoreMissions);

// 에러 핸들러
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
   // #swagger.ignore = true
  console.log(req.user);
  // req.session.user = {
  //   id: req.user.id,
  //   username: req.user.name,
  // };
  res.send("Hello World!");
});
