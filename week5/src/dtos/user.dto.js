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
      restaurant_id: body.restaurant_id,
      rating: body.rating,
      comment: body.comment,
    };
  };

  export const bodyToMission = (body) => {
  
    return {
      restaurant_id: body.restaurant_id,
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
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth,
      address: {
        main: user.address,
        detail: user.detailAddress,
      },
      phoneNumber: user.phoneNumber,
      preferences: preferences.map((preference) => ({
        name: preference.name,
      })),
    };
  };
