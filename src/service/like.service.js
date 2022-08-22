const { likePost, unlikePost, findPostLikes, validateLike } = require("../repo/like.repo");
const { findPostById } = require("../repo/post.repo");

const likeUserPost = async (data)=> {
    try{
        const post = await findPostById(data.post_id)
        if(!post){
            return {
                statusCode: 404,
                message: "Oops, post is not available"
            }
        }

        const liked = await validateLike(data);
        if(liked){
            return {
                statusCode: 400,
                message: "You have already liked this post"
            }
        }

        await likePost(data);
        return;
    } catch (error) {
        throw error
    }
}

const unLikeUserPost = async (data)=> {
    try{
        await unlikePost(data);
    } catch (error) {
        throw error
    }
}

const getPostLikes = async (data)=> {
    try{
        const posts = await findPostLikes(data);
        return posts
    } catch (error) {
        throw error
    }
}

module.exports = {
    likeUserPost,
    unLikeUserPost,
    getPostLikes
}