const express = require("express");
const mongoose = require("mongoose");
const coursesRouter = require("./Routes/Courses.routes");
const usersRouter = require("./Routes/users.routes");
const httpServerText = require("./Utils/httpServerText");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Url = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(Url).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpServerText.ERROR,
    message: "this resourse is not avilable!",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpServerText.ERROR,
    message: err.message,
    code: err.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
