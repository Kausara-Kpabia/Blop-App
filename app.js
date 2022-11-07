const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { connectToMongoDB } = require("./database/db");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoute");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3030;

connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/blogs", blogRouter);
app.get("*", checkUser);

app.get("/createBlog", requireAuth, (req, res) => res.send("createBlog"));
app.get("/myBlogs", (req, res) => {
  res.send();
});

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/blogs", (req, res) => {
  // res.render("blogs", { users: "new blogs" });
});
// 404 route
app.use("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});
app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});
