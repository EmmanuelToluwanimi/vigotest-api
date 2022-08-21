const { findUserById } = require("../repo/user.repo");
const { errorResponse } = require("../utils/constants");
const { verifyJwt } = require("../utils/jwt.utils");

const decodeToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorResponse({
            res,
            status: "fail",
            statusCode: 400,
            message: "Please login or signup to continue",
        })
    }
   
    try {
        const accessToken = token.split(" ")[1];
        const decoded = verifyJwt(accessToken);
        // console.log(decoded);

        if (!decoded) {
            return errorResponse({
                res,
                statusCode: 400,
                status: "fail",
                message: "Can't process this request"
            });
        }

        const user = await findUserById(decoded?.id);
        if (!user) {
            return errorResponse({
                res,
                statusCode: 400,
                status: "fail",
                message: "Can't process this request"
            });
        }

        const { created_at, password, ...rest } = user;
        req.user = rest;

        next();
    } catch (error) {
        return errorResponse({
            res,
            status: "fail",
            message: "Please login or signup to continue",
        })
    }
}

module.exports = {
    decodeToken,
}