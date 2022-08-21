const {
    createPost,
    getAllPosts,
    getAllUserPosts,
    getSinglePost,
} = require("../service/post.service");
const { errorResponse, okResponse } = require("../utils/constants");


const createPostController = async (req, res) => {
    try {
        const user_id = req.user.id;
        await createPost({...req.body, user_id});
        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Post created successfully",
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

const getAllPostsController = async (req, res) => {
    try {
        const {posts} = await getAllPosts();
        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Posts retrieved successfully",
            data: posts
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

const getAllUserPostsController = async (req, res) => {
    try {
        const {id}= req.params;
        const {posts, message, statusCode} = await getAllUserPosts(id);
        if(message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode,
                message
            })
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Posts retrieved successfully",
            data: posts
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

const getSinglePostController = async (req, res) => {
    try {
        const {id} = req.params;
        const {post, message, statusCode} = await getSinglePost(id);
        if(message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode,
                message
            })
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Post retrieved successfully",
            data: post
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
    createPostController,
    getAllPostsController,
    getAllUserPostsController,
    getSinglePostController,
}