const Jwt = require("jsonwebtoken");
const HttpServerText = require("../Utils/httpServerText");
const appError = require("../Utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.create(
      401,
      HttpServerText.ERROR,
      "Token is Required!"
    );
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
  } catch (err) {
    const error = appError.create(401, HttpServerText.ERROR, "invalid Token");
    return next(error);
  }

  next();
};

module.exports = verifyToken;
