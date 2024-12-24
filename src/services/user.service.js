import { responseFromUser } from "../dtos/user.dto.js";
import {
  addReview,
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getReview,
  addMission,
  getMission,
  addUserMission,
  getUserMission
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const reviewPost = async (data) => {
  const reviewId = await addReview({
    user_id: data.user_id,
    restaurant_id: data.restaurant_id,
    rating: data.rating,
    comment: data.comment,
  });

  if (reviewId === null) {
    throw new Error("존재하지 않는 식당입니다.");
  }

  const review = await getReview(reviewId);

  return review;
};

export const missionPost = async (data) => {
  const missionId = await addMission({
    restaurant_id: data.restaurant_id,
    price: data.price,
    point: data.point,
  });

  if (missionId === null) {
    throw new Error("존재하지 않는 식당입니다.");
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
    throw new Error("이미 진행중인 미션입니다.");
  }

  const mission = await getUserMission(usermissionId);

  return mission;
};