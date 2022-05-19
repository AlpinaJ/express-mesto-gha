class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

module.exports = { ConflictError };
