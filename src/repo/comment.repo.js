const Comment = require("../model/comment.model");

const storeComment = async (data) => {
    try {
        const newComment =  new Comment(data);
        return await newComment.save();
    } catch (error) {
        throw error
    }
}

const fetchComments = async () => {
    try {
        const comments = await Comment.getAll();
        return comments;
    } catch (error) {
        throw error
    }
}

const findCommentById = async (id) => {
    try {
        const comment = await Comment.getById(id);
        return comment;
    } catch (error) {
        throw error
    }
}

const fetchCommentByPostId = async(id) => {
    try {
        const comment = await Comment.getByPostId(id);
        return comment;
    } catch (error) {
        throw error
    }
}

module.exports = {
    storeComment,
    fetchComments,
    findCommentById,
    fetchCommentByPostId
}
