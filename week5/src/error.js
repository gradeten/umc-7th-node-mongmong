export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class NoStoreError extends Error {
    errorCode = "U002";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class DuplicateMissionError extends Error {
    errorCode = "U003";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}