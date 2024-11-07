import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// Store에 대한 모든 리뷰 가져오기
export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      comment: true,
      user: { select: { name: true } },
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

// Store에 대한 모든 미션 가져오기
export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

// Review 데이터 삽입
export const addReview = async (data) => {
  const storeExists = await prisma.store.findFirst({
    where: { id: data.store_id },
  });

  if (!storeExists) {
    return null;
  }

  const result = await prisma.userStoreReview.create({
    data: {
      userId: data.user_id, // Prisma에서 사용되는 필드명은 camelCase입니다.
      storeId: data.store_id,
      rating: data.rating,
      comment: data.comment,
    },
  });

  return result.id;
};

// Mission 데이터 삽입
export const addMission = async (data) => {
  const storeExists = await prisma.store.findFirst({
    where: { id: data.store_id },
  });

  if (!storeExists) {
    return null;
  }

  const result = await prisma.mission.create({
    data: {
      storeId: data.store_id,
      userId: data.user_id,
      point: data.point,
      status: data.status,
      price: data.price,
    },
  });

  return result.id;
};

export const addUserMission = async (data) => {
  const userMissionExists = await prisma.userMission.findFirst({
    where: {
      userId: data.user_id,
      missionId: data.mission_id,
      status: data.status,
    },
  });

  if (userMissionExists) {
    return null;
  }

  const result = await prisma.userMission.create({
    data: {
      userId: data.user_id,
      missionId: data.mission_id,
      status: data.status,
      createdAt: data.created_at,
      dueAt: data.due_at,
      mission: {
        connect: { id: data.missionId }, // 기존 mission과 연결
      },
      user: {
        connect: { id: data.userId }, // 기존 user와 연결
      },
    },
  });

  return result.id;
};

// 리뷰 정보 얻기
export const getReview = async (reviewId) => {
  const review = await prisma.userStoreReview.findFirst({
    where: { id: reviewId },
  });

  if (!review) {
    return null;
  }

  return review;
};

// 리뷰 정보 얻기
export const getUserReview = async (userId) => {
  const review = await prisma.userStoreReview.findMany({
    where: { userId: userId },
    include: {
      store: true,  // Fetch the related store details
      user: true,   // Optionally, fetch the related user details
    },
  });

  if (!review || review.length === 0) {
    return null;
  }

  return review;
};

// 리뷰 정보 얻기
export const getOngoingUserMissions = async (userId) => {
  const mission = await prisma.userMission.findMany({
    where: { userId: userId, status: 'ONGOING' },
  });

  if (!mission || mission.length === 0) {
    return null;
  }

  return mission;
};


// 미션 정보 얻기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirst({
    where: { id: missionId },
  });

  if (!mission) {
    return null;
  }

  return mission;
};

// 사용자 미션 정보 얻기
export const getUserMission = async (missionId) => {
  const userMission = await prisma.mission.findFirst({
    where: { id: missionId },
  });

  if (!userMission) {
    return null;
  }

  return userMission;
};
