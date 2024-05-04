class appError extends Error {
  constructor() {
    super();
  }
  create(statusCode, statusText, message) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

module.exports = new appError();
