const Post = require("../model/post.model");

const storePost = async (post) => {
    try {
        const newPost =  new Post(post);
        return await newPost.save();
    } catch (error) {
        throw error
    }
}

const getPosts = async () => {
    try {
        const posts = await Post.getAll();
        return posts;
    } catch (error) {
        throw error
    }
}

const findPostById = async (id) => {
    try {
        const post = await Post.getById(id);
        return post;
    } catch (error) {
        throw error
    }
}

const findPostByUserId = async (user_id) => {
    try {
        const post = await Post.getByUserId(user_id);
        return post;
    } catch (error) {
        throw error
    }
}

module.exports = {
    storePost,
    getPosts,
    findPostById,
    findPostByUserId,
}