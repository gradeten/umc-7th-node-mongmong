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

export const upsertUser = async (data) => {
  const user = await prisma.user.upsert({
    where: { email: data.email }, // 레코드를 찾기 위한 고유 조건 (unique key)
    update: { // 레코드가 존재할 경우 업데이트할 필드
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
    create: { // 레코드가 존재하지 않을 경우 삽입할 필드
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });

  return user;
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

export const updatePreferences = async (userId, preferences) => {
  // 기존 선호 카테고리 삭제
  await prisma.userFavorCategory.deleteMany({ where: { userId } });

  // 새로운 선호 카테고리 삽입
  for (const foodCategoryId of preferences) {
    await setPreference(userId, foodCategoryId);
  }
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
  console.log("Checking for existing user mission with", data.user_id, data.mission_id, data.status);
  
  const userMissionExists = await prisma.userMission.findFirst({
    where: {
      userId: data.user_id,
      missionId: data.mission_id,
      status: data.status,
    },
  });


  if (userMissionExists) {
    console.log("Mission already exists for user:", userMissionExists);
    return null;
  }

  const result = await prisma.userMission.create({
    data: {
      status: data.status,
      createdAt: data.created_at,
      dueAt: data.due_at,
      mission: {
        connect: { id: data.mission_id }, // 기존 mission과 연결
      },
      user: {
        connect: { id: data.user_id }, // 기존 user와 연결
      },
    },
  });

  console.log("New userMission created with ID:", result.id);

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
export const getUserReview = async (userId, cursor) => {
  const review = await prisma.userStoreReview.findMany({
    where: { userId: userId, id: { gt: cursor }  },
    // include: {
    //   store: true,  
    //   user: true,  
    // },
  });

  if (!review || review.length === 0) {
    return null;
  }

  return review;
};

// 리뷰 정보 얻기
export const getOngoingUserMissions = async (userId, cursor) => {
  const mission = await prisma.userMission.findMany({
    where: { userId: userId, status: 'ONGOING', id: { gt: cursor }   },
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
  const userMission = await prisma.userMission.findFirst({
    where: { id: missionId },
  });

  if (!userMission) {
    return null;
  }

  return userMission;
};
