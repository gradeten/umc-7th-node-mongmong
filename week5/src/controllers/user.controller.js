import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToReview, bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { reviewPost, userSignUp, missionPost, usermissionPost, getUserReviews, listStoreReviews, getUserMissions, listStoreMissions } from "../services/user.service.js";
import { getAllStoreMissions, getOngoingUserMissions } from "../repositories/user.repository.js";

export const handleUserSignUp = async (req, res, next) => {
   /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);
};

export const handleAddReview = async (req, res, next) => {
   /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              store_id: { type: "number" },
              rating: { type: "number" },
              comment: { type: "string" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  user_id: { type: "number" },
                  store_id: { type: "number" },
                  rating: { type: "number" },
                  comment: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await reviewPost(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handleAddMission = async (req, res, next) => {
  /*
    #swagger.summary = '식당 미션 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "number" },
              price: { type: "number" },
              point: { type: "number" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "식당 미션 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  store_id: { type: "number" },
                  price: { type: "number" },
                  point: { type: "number" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "식당 미션 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await missionPost(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleAddUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미션 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              mission_id: { type: "number" },
              status: { type: "string" },
              created_at: { type: "string", format: "date" },
              due_at: { type: "string", format: "date" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "유저 미션 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  user_id: { type: "number" },
                  mission_id: { type: "number" },
                  status: { type: "string" },
                  created_at: { type: "string", format: "date" },
                  due_at: { type: "string", format: "date" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "유저 미션 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U003" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("유저 미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const usermission = await usermissionPost(bodyToUserMission(req.body));
  console.log("삽입된 usermission:", usermission);
  res.status(StatusCodes.OK).success(usermission);
};


export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        comment: { type: "string" },
                        user: { type: "object", properties: { name: { type: "string" } } },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListStoreMissions = async (req, res, next) => {
/*
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        price: { type: "number" },
                        point: { type: "number" },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

export const handleUserReview = async (req, res, next) => {
   /*
    #swagger.summary = '특정 유저 리뷰 조회 API';
    #swagger.responses[200] = {
      description: "특정 유저 리뷰 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        createdAt: { type: "string", format: "date" },
                        comment: { type: "string" },
                        rating: { type: "number" },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "특정 유저 리뷰 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U004" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const reviews = await getUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleOngoingUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '특정 유저 진행중인 미션 조회 API';
    #swagger.responses[200] = {
      description: "특정 유저 진행중인 미션 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        userId: { type: "number" },
                        missionId: { type: "number" },
                        status: { type: "string" },
                        createdAt: { type: "string", format: "date" },
                        dueAt: { type: "string", format: "date" },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "특정 유저 진행중인 미션 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U004" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
  const missions = await getUserMissions(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};