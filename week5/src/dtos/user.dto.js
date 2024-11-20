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

  export const responseFromMissions = (missions) => {
    return {
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].id : null,
      },
    };
  };

  export const responseFromUserReview = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
};

export const responseFromUserMission = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};

