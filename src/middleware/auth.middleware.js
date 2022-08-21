const {
    loginSchema,
    signUpSchema
} = require("../schema/user.schema");
const { errorResponse, formatJoiMessage } = require("../utils/constants");

const validateSignUpInput = (req, res, next)=>{

    const {error} = signUpSchema.validate(req.body);
    if (error?.message) {
        const message = formatJoiMessage(error.message);
        console.log(error?.message || error);
        return errorResponse({
            res,
            statusCode: 422,
            status: "fail",
            message
        })
    }
    
    next();
}

const validateLoginInput = (req, res, next)=>{

    const {error} = loginSchema.validate(req.body);
    if (error?.message) {
        const message = formatJoiMessage(error.message);
        console.log(error?.message || error);
        return errorResponse({
            res,
            statusCode: 422,
            status: "fail",
            message
        })
    }
    
    next();
}

module.exports = {
    validateSignUpInput,
    validateLoginInput
};