const { errorResponse, okResponse, generateUid } = require("../utils/constants");
const { signUpUser, loginUser } = require("../service/auth.service");


const registerUserController = async (req, res) => {
   
    try {
        const {message, statusCode, user, accessToken} = await signUpUser(req.body);
        // console.log(user)
        if(message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode,
                message
            })
        }

        if (accessToken) {
            res.setHeader("x-token", accessToken);
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "User registered successfully",
            data: {...user, accessToken}
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while registering user",
        })
    }
}

const LoginUserController = async(req, res) => {
   
    try {

        const {message, statusCode, user, accessToken} = await loginUser(req.body);
        if(message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode,
                message
            })
        }

        if (accessToken) {
            res.setHeader("x-token", accessToken);
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Login successfully",
            data: {...user, accessToken}
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while registering user",
        })
    }
}

module.exports = {
    registerUserController,
    LoginUserController
}