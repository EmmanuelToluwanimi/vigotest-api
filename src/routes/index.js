const { ROUTES } = require("../utils/constants");
const authRouter = require("./auth");
// const userRouter = require("./user");
// const postRouter = require("./post");

const {HEALTHCHECK, AUTH, USER, POST} = ROUTES

/**
 * 
 * @param app app is an express function
 */ 
function routes(app) {
    app.get(HEALTHCHECK, (req, res)=> {res.send("OK")});
    app.use(AUTH, authRouter);
    // app.use(USER, userRouter);
    // app.use(POST, postRouter);
}

module.exports = routes;