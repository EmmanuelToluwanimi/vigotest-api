const { ROUTES } = require("../utils/constants");
const authRouter = require("./auth");
// const userRouter = require("./user");
const postRouter = require("./post");
const userRouter = require("./user");
const systemRouter = require("./system");


const {HEALTHCHECK, AUTH, USER, POST, SYSTEM} = ROUTES;

/**
 * 
 * @param app app is an express function
 */ 
function routes(app) {
    app.get(HEALTHCHECK, (req, res)=> {res.send("OK")});
    app.use(AUTH, authRouter);
    app.use(POST, postRouter);
    app.use(USER, userRouter);
    app.use(SYSTEM, systemRouter);

}

module.exports = routes;