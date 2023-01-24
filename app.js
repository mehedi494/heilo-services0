const express = require("express");
const app = express();
const cors = require("cors");
const teacherRouter = require("./routes/v1/teacher.route");
const userRoute = require("./routes/v1/user.route");
const studentRouter = require("./routes/v1/student.route");
const adminRoute = require("./routes/v1/admin.route");
const sessionRoutes = require("./routes/v1/session.routes");
const review_rating = require("./routes/v1/review_rating.routes");
// midlldeware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Server Working Successfully!! 😎");
});

/**
 * USER 👇👇
 * login, register, get me..
 */
app.use("/api/v1/user", userRoute);
/*  */

/**TEACHER 👇👇
 * update,
 * sent witddraw request
 *  */
app.use("/api/v1/teacher", teacherRouter);
/*  */

/**STUDENT 👇👇
 * on deman Search
 * update
 * top-up
 * sent tuition request
 */
app.use("/api/v1/student", studentRouter);

/*  */

/**
 * ADMIN 👇👇
 * home Dashboard
 */
app.use("/api/v1/admin", adminRoute);

/**
 * session routes
 */
app.use("/api/v1/session", sessionRoutes);

/**
 * review ratings routes
 */
app.use("/api/v1/review-rating", review_rating);

module.exports = app;
