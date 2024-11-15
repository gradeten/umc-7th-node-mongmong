import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { 
  handleUserSignUp, 
  handleAddReview, 
  handleAddMission, 
  handleAddUserMission, 
  handleListStoreReviews,
  handleUserReview,
  handleListStoreMissions,
  handleOngoingUserMission
 } from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/review/post", handleAddReview);
app.get("/api/v1/users/reviews/:userId", handleUserReview);
app.get("/api/v1/users/missions/ongoing/:userId", handleOngoingUserMission);
app.post("/api/v1/mission/post", handleAddMission);
app.post("/api/v1/mission/user/post", handleAddUserMission);
app.get("/api/v1/stores/reviews/:storeId", handleListStoreReviews);
app.get("/api/v1/stores/missions/:storeId", handleListStoreMissions);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});