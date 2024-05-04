const express = require("express");

const CoursesController = require("../Controllers/Courses.controllers");
const { validationSchema } = require("../Middlewares/ValidationSchema");
const allwedTo = require("../Middlewares/allwedTo");
const userRoles = require("../Utils/userRoles");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

router
  .route("/")
  .get(CoursesController.getAllCourses)
  .post(
    verifyToken,
    allwedTo(userRoles.admin),
    validationSchema(),
    CoursesController.AddCourse
  );

router
  .route("/:courseId")
  .get(CoursesController.getCourseById)
  .patch(verifyToken, allwedTo(userRoles.admin), CoursesController.UpdateCourse)
  .delete(
    verifyToken,
    allwedTo(userRoles.admin),
    CoursesController.DeleteCourse
  );

module.exports = router;
