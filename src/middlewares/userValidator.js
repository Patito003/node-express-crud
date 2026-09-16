const { errorMessage } =  require("../helpers/responseHelper");

const validateBody = (req, res, next) => {
  const user = req.body;

  if (!user) return errorMessage(res, 400, "You need send something");

  if (!user?.id) return errorMessage(res, 400, "User ID is required");
  if (typeof user.id !== "string") return errorMessage(res, 400, "User ID must be a string");

  if (!user?.name) return errorMessage(res, 400, "User name is required");
  if (typeof user.name !== "string") return errorMessage(res, 400, "User name must be a string");
  
  next();
};

module.exports = {
  validateBody,
};
