const { 
    storePost,
    getPosts,
    findPostById,
    findPostByUserId,
} = require("../repo/post.repo");
const { findUserById } = require("../repo/user.repo");



const createPost = async (post) => {
    try {
        await storePost(post);
    } catch (error) {
        throw error
    }
}

const getAllPosts = async () => {
    try {
        const posts = await getPosts();
        return {posts};
    } catch (error) {
        throw error
    }
}

const getAllUserPosts = async (user_id) => {
    try {
        const user = await findUserById(user_id);
        if(!user){
            return {
                statusCode: 404,
                message: "Oops, user is not available"
            }
        }
        
        const posts = await findPostByUserId(user_id);
        return {posts};
    } catch (error) {
        throw error
    }
}

const getSinglePost = async (id) => {
    try {
        const post = await findPostById(id);
        if(!post){
            return {
                statusCode: 404,
                message: "Oops, post is not available"
            }
        }

        return {post};
    } catch (error) {
        throw error
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getAllUserPosts,
    getSinglePost,
}
