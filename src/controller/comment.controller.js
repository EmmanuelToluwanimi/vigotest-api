const { createComment, getComment, getComments } = require("../service/comment.service");

const createCommentController = async (req, res) => {
    try {
        const { post_id, user_id, comment } = req.body;
        const result = await createComment({ post_id, user_id, comment });
        if (result?.message) {
            return errorResponse({
                res,
                status: "fail",
                statusCode: result?.statusCode,
                message: result?.message,
            });
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Successful request",
        });
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        });
    }
}

const getCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getComment(id);
        if (result?.message) {
            return errorResponse({
                res,
                status: "fail",
                statusCode: result?.statusCode,
                message: result?.message,
            });
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
            data: result,
        });
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        });
    }
}

const getAllCommentsController = async (req, res) => {
    try {
        const result = await getComments();
        if (result?.message) {
            return errorResponse({
                res,
                status: "fail",
                statusCode: result?.statusCode,
                message: result?.message,
            });
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
            data: result,
        });
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        });
    }
}

module.exports = {
    createCommentController,
    getCommentController,
    getAllCommentsController,
}