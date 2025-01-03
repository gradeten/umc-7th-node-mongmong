import { responseFromUser, responseFromUserReview, responseFromReviews, responseFromUserMission, responseFromMissions} from "../dtos/user.dto.js";
import {
  addReview,
  addUser,
  upsertUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updatePreferences,
  getReview,
  addMission,
  getMission,
  addUserMission,
  getUserMission,
  getUserReview,
  getAllStoreReviews,
  getAllStoreMissions,
  getOngoingUserMissions,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError, NoStoreError, DuplicateMissionError, DataNotExistError } from "../error.js";

export const userSignUp = async (data) => {
  const user = await upsertUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  const userId = user.id;

  // 기존 선호 카테고리 삭제 후 새로운 카테고리 삽입
  await updatePreferences(userId, data.preferences);

  const updatedUser = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user: updatedUser, preferences });
};

export const reviewPost = async (data) => {
  const reviewId = await addReview({
    user_id: data.user_id,
    store_id: data.store_id,
    rating: data.rating,
    comment: data.comment,
  });

  if (reviewId === null) {
    throw new NoStoreError("존재하지 않는 식당입니다.", data);
  }

  const review = await getReview(reviewId);

  return review;
};

export const missionPost = async (data) => {
  const missionId = await addMission({
    store_id: data.store_id,
    price: data.price,
    point: data.point,
  });

  if (missionId === null) {
    throw new NoStoreError("존재하지 않는 식당입니다.", data);
  }

  const mission = await getMission(missionId);

  return mission;
};

export const usermissionPost = async (data) => {
  const usermissionId = await addUserMission({
    user_id: data.user_id,
    mission_id: data.mission_id,
    status: data.status,
    created_at: data.created_at,
    due_at: data.due_at,
  });

  if (usermissionId === null) {
    throw new DuplicateMissionError("이미 진행중인 미션입니다.", data);
  }

  const usermission = await getUserMission(usermissionId);

  return usermission;
};

export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};

// Function to get a user's reviews by userId
export const getUserReviews = async (userId, cursor) => {
  const reviews = await getUserReview(userId, cursor);
  
  if (!reviews) {
    throw new DataNotExistError("해당 유저의 리뷰가 없습니다.");
  }

  return responseFromUserReview(reviews);
};

// Function to get a user's ongoing missions
export const getUserMissions = async (userId) => {
  const missions = await getOngoingUserMissions(userId);
  
  if (!missions) {
    throw new DataNotExistError("해당되는 유저의 미션이 없습니다.");
  }

  return responseFromUserMission(missions);
};
