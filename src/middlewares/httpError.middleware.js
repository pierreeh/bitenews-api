class HandleHttpError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

function handleHttpError(err, res) {
  const { statusCode, message } = err;

  res.status(statusCode).json({ status: "error", statusCode, message });
}

module.exports = { HandleHttpError, handleHttpError };
