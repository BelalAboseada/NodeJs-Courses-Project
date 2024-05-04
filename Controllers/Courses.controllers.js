const { validationResult } = require("express-validator");
const Course = require("../models/Courses.Model.js");
const HttpServerText = require("../Utils/httpServerText.js");
const asyncWrapper = require("../Middlewares/asyncWrapper.js");
const appError = require("../Utils/appError.js");

const getAllCourses =asyncWrapper( async (req, res) => {
  const { query } = req.query;

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  // get all courses from database using Course Model
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: HttpServerText.SUCSSES, data: { courses } });
});

const getCourseById = asyncWrapper(async (req, res,next) => {
  const course = await Course.findById(req.params.courseId, { __v: false });
  //   when we dont have course
  if (!course) {
   const err = appError.create(404, HttpServerText.FAIL, "Course Not Found");
   return next(err)
   
    }
    res.json({ status: HttpServerText.SUCSSES, data: { course } });
});

const UpdateCourse = asyncWrapper( async (req, res, next) => {
  const courseId = req.params.courseId;
  
    const UpdatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json({
      status: HttpServerText.SUCSSES,
      data: { UpdatedCourse },
    });
});

const AddCourse =asyncWrapper( async (req, res ,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   const err =appError.create(400, HttpServerText.ERROR, errors.array());
   next(err)
  }
  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: HttpServerText.SUCSSES, data: { newCourse } });
});

const DeleteCourse =asyncWrapper( async (req, res) => {
  await Course.findByIdAndDelete({ _id: req.params.courseId });

  res.status(200).json({ status: HttpServerText.SUCSSES, data: null });
});

module.exports = {
  getAllCourses,
  getCourseById,
  UpdateCourse,
  AddCourse,
  DeleteCourse,
};
