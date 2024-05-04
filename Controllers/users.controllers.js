const asyncWrapper = require("../Middlewares/asyncWrapper");
const User = require("../models/User.Model");
const HttpServerText = require("../Utils/httpServerText");
const appError = require("../Utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const genrateJwt = require("../Utils/genrate.Jwt");
const getAllUsers = asyncWrapper(async (req, res) => {
  const { query } = req.query;

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  // get all users from database using User Model
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: HttpServerText.SUCSSES, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const err = appError.create(
      400,
      HttpServerText.ERROR,
      "User Already Exists"
    );
    return next(err);
  }

  const hashePassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashePassword,
    role,
    avatar: req.file.filename,
  });
  const token = await genrateJwt({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: HttpServerText.SUCSSES, data: { newUser } });
});

const logIn = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    const err = appError.create(
      400,
      HttpServerText.FAIL,
      "email and password are required"
    );
    return next(err);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const err = appError.create(400, HttpServerText.FAIL, "user not found");
    return next(err);
  }
  const matchedPassword = bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await genrateJwt({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res
      .status(200)
      .json({ status: HttpServerText.SUCSSES, data: { token } });
  } else {
    const err = appError.create(
      500,
      HttpServerText.ERROR,
      "Somhting Went Wrong"
    );
    return next(err);
  }
});

module.exports = {
  getAllUsers,
  logIn,
  register,
};
