const validateBody = (req, res, next) => {
  const user = req.body;

  if (!user) return errorMessage(res, 400, "You need send something");

  if (!user?.id) return errorMessage(res, 400, "User ID is required");
  if (typeof user.id !== "string") return errorMessage(res, 400, "User ID must be a string");

  if (!user?.name) return errorMessage(res, 400, "User name is required");
  if (typeof user.name !== "string") return errorMessage(res, 400, "User name must be a string");
  
  next();
};

const errorMessage = (res, statusCode, message) => {
  if (!res || !statusCode || !message) {
    throw new Error("Missing parameters for errorMessage function");
  }

  if (typeof statusCode !== "number" || typeof message !== "string") {
    throw new Error("Invalid parameters for errorMessage function");
  }

  return res.status(statusCode).json({ error: message });
}

module.exports = {
  validateBody,
};
