const {
    likeUserPost,
    unLikeUserPost,
    getPostLikes
} = require("../service/like.service");
const { errorResponse, okResponse } = require("../utils/constants");


const likePostController = async (req, res)=> {
    try {
        const {id: post_id} = req.params 
        const {id: user_id} = req.user 
        const result = await likeUserPost({post_id, user_id});
        if(result?.message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode: result?.statusCode,
                message: result?.message
            })
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Successful request",
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        })
    }
}

const unLikePostController = async (req, res)=> {
    try {
        const {id: post_id} = req.params 
        const {id: user_id} = req.user 
        await unLikeUserPost({post_id, user_id});

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        })
    }
}

const getPostLikesController = async (req, res)=> {
    try {
        const {id} = req.params 
        const posts = await getPostLikes(id);

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
            data: {
                likesCount: posts.length
            }
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        })
    }
}

module.exports = {
    likePostController,
    unLikePostController,
    getPostLikesController
}