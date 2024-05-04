const appError = require("../Utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const err = appError.create(
        401,
        "You are not authorized to perform this action"
      );
      return next(err);
    }

    next();
  };
};
