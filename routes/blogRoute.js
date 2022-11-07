const Router = require("express");
const blogcontroller = require("../controllers/blogcontroller");

const {
  updateBlogTest,
  updateBlogBodyTest,
  deleteBlogTest,
  createBlogTest,
  getMyBlogsTest,
} = require("../middlewares/blogMiddleware");

const blogRouter = Router();

//CREATE BLOG
blogRouter.post("/createblog", createBlogTest, blogcontroller.post_createblog);
//GET ALL BLOGS
blogRouter.get("/getblogs", blogcontroller.get_getblogs);
//GET ONLY USER BLOGS
blogRouter.get(
  "/getblogs/myblogs",
  getMyBlogsTest,
  blogcontroller.get_getmyblogs
);
//GET ONE BLOG
blogRouter.get("/getoneblog", blogcontroller.get_getOneblog);

//UPDATE BLOG STATE
blogRouter.put(
  "/updateblog/state",
  updateBlogTest,
  blogcontroller.put_updateblogstate
);
//UPDATE BLOG BODY
blogRouter.put(
  "/updateblog/body",
  updateBlogBodyTest,
  blogcontroller.put_updateblogbody
);
//DELETE BLOG
blogRouter.delete(
  "/deleteblog",
  deleteBlogTest,
  blogcontroller.delete_deleteblog
);

module.exports = blogRouter;
