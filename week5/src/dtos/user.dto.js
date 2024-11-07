export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  export const bodyToReview = (body) => {
  
    return {
      user_id: body.user_id,
      store_id: body.store_id,
      rating: body.rating,
      comment: body.comment,
    };
  };

  export const bodyToMission = (body) => {
  
    return {
      store_id: body.store_id,
      price: body.price,
      point: body.point,
    };
  };

  export const bodyToUserMission = (body) => {
    const created_at = new Date(body.created_at);
    const due_at = new Date(body.due_at);
  
    return {
      user_id: body.user_id,
      mission_id: body.mission_id,
      status: body.status,
      created_at,
      due_at,
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
      (preference) => preference.foodCategory.name
    );
  
    return {
      email: user.email,
      name: user.name,
      preferCategory: preferFoods,
    };
  };

  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };

  export const responseFromUserReview = (reviews) => {
    return reviews.map((review) => ({
      id: review.id,
      storeName: review.store.name,
      comment: review.comment,
      rating: review.rating,
      createdAt: review.createdAt,
    }));
};

export const responseFromUserMission = (missions) => {
  const created_at = new Date(missions.created_at);
  const due_at = new Date(missions.due_at);

  return missions.map((mission) => ({
    id: mission.id,
    user_id: mission.user_id,
    mission_id: mission.mission_id,
    status: mission.status,
    created_at,
    due_at,
  }));
};

