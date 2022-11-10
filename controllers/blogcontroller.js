const blogModel = require("../models/blogs");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
// const decodedtoken = require("../middlewares/blogMiddleware");

const handleErrors = (err) => {
  let errors = { title: "", body: "", state: "" };

  // duplicate title error
  if (err.code === 11000) {
    errors.title = "this title is already used";
    return errors;
  }

  // validation errors
  if (err.message.includes("blogg validation failed")) {
        console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(val);
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
  // console.log(err);
};

//CREATE BLOG
module.exports.post_createblog = async (req, res) => {
  const tagsInput = req.body.tags.split(",");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.send("Failed!");
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      res.send(" another failed!");
    }
    console.log({ decoded: user });
    const email = user.email;
    const { title, author, description, body, state, timestamp, read_count } =
      req.body;
    const bodyCount = req.body.body.split("");
    const bdyCtPm = bodyCount.length / 200;
    const read_time = `${bdyCtPm} mins`;
    // const bdyCtPs = bdyCtPm*60
    const tags = tagsInput;
    const authorId = email;
    try {
      const blog = await blogModel.create({
        title,
        author,
        description,
        body,
        state,
        timestamp,
        tags,
        read_count,
        read_time,
        authorId,
      });
      console.log({ blog });

      res.send({ blog });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  });
};

//GET ALL BLOGS
module.exports.get_getblogs = async (req, res) => {
  const {query}  = req;

  const {
    title,
    tags,
    author,
    order = "asc",
    order_by = "title",
    page = 1,
    limit = 10,
  }  = query;
  
  try {
    const sortquery = {};
    const findquery = {};

    if (author) {
      findquery.author = author;
    }

    if (title) {
      findquery.title = title;
    }

    if (tags){
      findquery.tags = tags;
    }

  const sortAttributes = order_by.split(",");

  for (const attribute of sortAttributes){
    if (order == "asc" && order_by){
      sort[attribute] = 1;
    }

    if (order == "desc" && order_by){
      sort[attribute] = -1;
  }
 }

    const blogs = await blogModel
      .find(findquery)
      .sort(sortquery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await blogModel.countDocuments();

    res.send({
      totalPages: Math.ceil(count / limit),
      total_Blogs: count,
      currentPage: page,
      blogs,
    });
    // }
  } catch (err) {
    console.log(err);
  }
};
// //GET ONE BLOG
module.exports.get_getOneblog = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      throw new Error("Please enter a valid blog id!");
    }
    const blog = await blogModel.findById(id);

    // let readcount = 0;
    blog.read_count += 1;
    blog.save();
    res.send(blog);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

//SHOW ONLY USER BLOGS
module.exports.get_getmyblogs = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const email = req.body.email;
    const blogs = await blogModel
      .find({ authorId: email })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    blogModel.countDocuments({ authorId: email }, function (err, count) {
      if (err) console.log(err);
      let blogcount = 0;
      console.log(count);
      blogcount = count;
      res.send({
        totalPages: Math.ceil(blogcount / limit),
        total_Blogs: blogcount,
        currentPage: page,
        blogs,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

//UPDATE BLOG STATE WITH
module.exports.put_updateblogstate = async (req, res) => {
  const { blogId, state } = req.body;
  // console.log(blogId);
  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.send("Blog does not exist!");
    }
    blog.state = state;
    blog.save();
    res.send(blog);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
//UPDATE BLOG BODY WITH
module.exports.put_updateblogbody = async (req, res) => {
  const { blogId, body } = req.body;
  // console.log(blogId);
  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.send("Blog does not exist!");
    }
    blog.body = body;
    blog.save();
    res.send(blog);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
//DELETE BLOG
module.exports.delete_deleteblog = async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId);
  try {
    const blog = await blogModel.deleteOne({ _id: blogId });

    return res.json({ status: "Deleted!", blog });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
