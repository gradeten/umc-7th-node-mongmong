import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToReview, bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { reviewPost, userSignUp, missionPost, usermissionPost } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await reviewPost(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await missionPost(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleAddUserMission = async (req, res, next) => {
  console.log("유저 미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const usermission = await usermissionPost(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: usermission });
};
