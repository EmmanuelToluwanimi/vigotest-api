const { storeComment, fetchComments, findCommentById } = require("../repo/comment.repo");

const createComment = async (data) => {
    try {
        return await storeComment(data);
    } catch (error) {
        throw error
    }
}

const getComments = async () => {
    try {
        return await fetchComments();
    } catch (error) {
        throw error
    }
}

const getComment = async (id) => {
    try {
        return await findCommentById(id);
    } catch (error) {
        throw error
    }
}

module.exports = {
    createComment,
    getComments,
    getComment,
}