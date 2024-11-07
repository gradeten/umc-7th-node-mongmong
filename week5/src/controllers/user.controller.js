import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToReview, bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { reviewPost, userSignUp, missionPost, usermissionPost, getUserReviews, listStoreReviews, getUserMissions } from "../services/user.service.js";
import { getAllStoreMissions, getOngoingUserMissions } from "../repositories/user.repository.js";

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


export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListStoreMissions = async (req, res, next) => {
  let { storeId } = req.params;
  
  // userId를 정수로 변환하여 userId에 다시 할당
  storeId = parseInt(storeId, 10);

  // userId가 유효한지 체크
  if (isNaN(storeId)) {
    return res.status(400).json({ message: "Invalid userId provided." });
  }

  try {
    const reviews = await getAllStoreMissions(storeId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const handleUserReview = async (req, res, next) => {
  let { userId } = req.params;
  
  // userId를 정수로 변환하여 userId에 다시 할당
  userId = parseInt(userId, 10);

  // userId가 유효한지 체크
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid userId provided." });
  }

  try {
    const reviews = await getUserReviews(userId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const handleOngoingUserMission = async (req, res, next) => {
  let { userId } = req.params;
  
  // userId를 정수로 변환하여 userId에 다시 할당
  userId = parseInt(userId, 10);

  // userId가 유효한지 체크
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid userId provided." });
  }

  try {
    const missions = await getOngoingUserMissions(userId);
    res.status(200).json(missions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};