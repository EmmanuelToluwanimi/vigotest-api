const Like = require("../model/like.model");

const likePost = async ({post_id, user_id}) => {
    try {
        const like = new Like({post_id, user_id});
        return await like.save();
    } catch (error) {
        throw error
    }
}

const unlikePost = async ({post_id, user_id}) => {
    try {
        await Like.delete(post_id, user_id)
    } catch (error) {
        throw error
    }
}

const findPostLikes = async (post_id) => {
    try {
        const posts = await Like.getByPostId(post_id)
        return posts
    } catch (error) {
        throw error
    }
}

const validateLike = async ({post_id, user_id}) => {
    try {
        const like = await Like.verify(post_id, user_id)
        return like
    } catch (error) {
        throw error
    }
}

module.exports = {
    likePost,
    unlikePost,
    findPostLikes,
    validateLike
}