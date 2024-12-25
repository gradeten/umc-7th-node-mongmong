export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    statusCode = 400;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class NoStoreError extends Error {
    errorCode = "U002";
    statusCode = 400;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class DuplicateMissionError extends Error {
    errorCode = "U003";
    statusCode = 400;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class DataNotExistError extends Error {
  errorCode = "U004";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}