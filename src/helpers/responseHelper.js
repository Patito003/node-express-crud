const errorMessage = (res, statusCode, message) => {
  if (!res || !statusCode || !message) {
    throw new Error("Missing parameters for errorMessage function");
  }

  if (typeof statusCode !== "number" || typeof message !== "string") {
    throw new Error("Invalid parameters for errorMessage function");
  }

  return res.status(statusCode).json({ error: message });
};

module.exports = {
  errorMessage,
};