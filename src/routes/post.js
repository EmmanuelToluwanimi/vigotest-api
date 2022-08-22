const { Router } = require("express");
const {
    createPostController,
    getAllPostsController,
    getAllUserPostsController,
    getSinglePostController,
} = require("../controller/post.controller");
const {
    likePostController,
    unLikePostController,
    getPostLikesController
} = require("../controller/like.controller");
const {
    createCommentController,
    getCommentController,
    getAllCommentsController,
} = require("../controller/comment.controller");


const { ROUTES } = require("../utils/constants");
const { decodeToken } = require("../middleware/user.middleware");
const {validatePostInput, validatePostQuery, uploadImage, validateCommentInput} = require("../middleware/post.middleware");

const router = Router();
const { INDEX, ID, USERPOST, LIKE, UNLIKE, COMMENT } = ROUTES;

router.get(INDEX, decodeToken, getAllPostsController);
router.post(INDEX, decodeToken, uploadImage.single('imgUrl'), validatePostInput, createPostController);
router.get(ID, decodeToken, validatePostQuery, getSinglePostController);
router.get(USERPOST, decodeToken, validatePostQuery, getAllUserPostsController);
router.post(LIKE, decodeToken, likePostController);
router.get(UNLIKE, decodeToken, unLikePostController);
router.get(LIKE, decodeToken, getPostLikesController);
router.post(COMMENT, decodeToken, validateCommentInput, createCommentController);
router.get(COMMENT, decodeToken, getAllCommentsController);



module.exports = router;


