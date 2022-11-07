const { Router } = require("express");
const authcontroller = require("../controllers/authcontroller");

const authRouter = Router();

authRouter.get("/signup", authcontroller.signup_get);
authRouter.post("/signup", authcontroller.signup_post); //create user
authRouter.get("/login", authcontroller.login_get);
authRouter.post("/login", authcontroller.login_post);
authRouter.post("/logout", authcontroller.logout_post);

module.exports = { authRouter };